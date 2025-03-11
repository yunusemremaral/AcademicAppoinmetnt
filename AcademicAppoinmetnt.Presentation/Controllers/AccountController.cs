using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using AcademicAppointment.Presentation.Models;
using System.Threading.Tasks;
using MimeKit;
using MailKit.Net.Smtp;
using AcademicAppointment.EntityLayer.Identity;
using AcademicAppointment.BusinessLayer.Abstract;

namespace AcademicAppointment.Presentation.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IMailService _mailService;


        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            RoleManager<AppRole> roleManager,
            IMailService mailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _mailService = mailService;
        }

        [HttpGet]

        public async Task<IActionResult> Register()
        {
            return View();
        }
        // POST: Account/Register
        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                Random random = new Random();
                int code = random.Next(10000, 100000);

                // Aynı e-posta ile doğrulanmamış kullanıcıyı kontrol et
                var existingUser = await _userManager.FindByEmailAsync(model.Email);
                if (existingUser != null)
                {
                    if (!existingUser.EmailConfirmed)
                    {
                        // Doğrulanmamış kullanıcıyı sil
                        await _userManager.DeleteAsync(existingUser);
                    }
                    else
                    {
                        ModelState.AddModelError("", "Bu e-posta adresi zaten kullanılıyor.");
                        return View(model);
                    }
                }

                var user = new AppUser
                {
                    UserName = model.Email,
                    Email = model.Email,
                    SchoolNumber = model.SchoolNumber,
                    ConfirmCode = code
                };

                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    // Mail gönderme işlemi
                    await _mailService.SendConfirmationEmailAsync(user.Email, code);
                    TempData["Mail"] = user.Email;
                    return RedirectToAction("ConfirmMail", "Account");
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }

            return View(model);
        }

        [HttpGet]
        public IActionResult ConfirmMail(int id)
        {
            var value = TempData["Mail"];
            ViewBag.v = value;
            return View();
        }
        // POST: Account/ConfirmMail
        [HttpPost]
        public async Task<IActionResult> ConfirmMail(ConfirmMailViewModel confirmMailViewModel)
        {
            var user = await _userManager.FindByEmailAsync(confirmMailViewModel.Mail);
            if (user.ConfirmCode == confirmMailViewModel.ConfirmCode)
            {
                user.EmailConfirmed = true;
                await _userManager.UpdateAsync(user);
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        // GET: Account/Login
        public IActionResult Login()
        {
            return View();
        }

        // POST: Account/Login
        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, true);
                if (result.Succeeded)
                {
                    var user = await _userManager.FindByEmailAsync(model.Email);
                    if (user.EmailConfirmed)
                    {
                        return RedirectToAction("Profile", "Account");
                    }
                }

                ModelState.AddModelError("", "Geçersiz giriş denemesi.");
            }
            return View(model);
        }

        // POST: Account/Logout
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public async Task<IActionResult> Profile()
        {
            // Oturum açmış kullanıcıyı al
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return RedirectToAction("Login", "Account"); // Kullanıcı oturum açmamışsa login sayfasına yönlendir
            }

            // Kullanıcının e-posta adresini View'a gönder
            var model = new ProfileViewModel
            {
                Email = user.Email,
                SchoolNumber = user.SchoolNumber // Diğer bilgileri de ekleyebilirsiniz
            };

            return View(model);
        }

        

        [HttpGet]
        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Kullanıcı bulunamadı veya e-posta doğrulanmamış
                    return View("ForgotPasswordConfirmation");
                }

                // Şifre sıfırlama token'ı oluştur
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, token = token, email = user.Email }, protocol: HttpContext.Request.Scheme);

                // E-posta gönder
                await _mailService.SendPasswordResetEmailAsync(user.Email, callbackUrl);


                return View("ForgotPasswordConfirmation");
            }

            return View(model);
        }
        [HttpGet]
        public IActionResult ResetPassword(string token, string email)
        {
            if (token == null || email == null)
            {
                ModelState.AddModelError("", "Geçersiz şifre sıfırlama bağlantısı.");
            }

            var model = new ResetPasswordViewModel { Token = token, Email = email };
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    // Kullanıcı bulunamadığında hata mesajı ekleyelim
                    ModelState.AddModelError("", "E-posta adresiyle ilişkilendirilmiş bir kullanıcı bulunamadı.");
                    return View(model); // Hata mesajını döndürür
                }

                var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
                if (result.Succeeded)
                {
                    return RedirectToAction("ResetPasswordConfirmation");
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }

            return View(model);
        }

    }
}







