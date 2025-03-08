using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using AcademicAppoinmetnt.EntityLayer.Identity;
using AcademicAppointment.Presentation.Models;
using System.Threading.Tasks;
using MimeKit;
using MailKit.Net.Smtp;

namespace AcademicAppointment.Presentation.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<AppRole> _roleManager;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            RoleManager<AppRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        // GET: Account/Register
        // GET: Account/Register
        public IActionResult Register()
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
                        // Eğer kullanıcı doğrulanmışsa, hata döndür
                        ModelState.AddModelError("", "Bu e-posta adresi zaten kullanılıyor.");
                        return View(model);
                    }
                }


                // Yeni kullanıcı oluşturuluyor
                var user = new AppUser
                {
                    UserName = model.Email,  // Email'i kullanıcı adı olarak kullanıyoruz
                    Email = model.Email,
                    SchoolNumber = model.SchoolNumber,
                    ConfirmCode = code

                };

                // Kullanıcıyı oluşturma işlemi
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    MimeMessage mimeMessage = new MimeMessage();
                    MailboxAddress mailboxAddressFrom = new MailboxAddress("Academic Appointment Admin", "dolandiriciliklamucadeleet@gmail.com");
                    MailboxAddress mailboxAddressTo = new MailboxAddress("User", user.Email);
                    mimeMessage.From.Add(mailboxAddressFrom);
                    mimeMessage.To.Add(mailboxAddressTo);

                    var bodybuilder = new BodyBuilder();
                    bodybuilder.TextBody = "Kayıt işlemini gerçekleştirmek için onay kodunuz :" + code;
                    mimeMessage.Body = bodybuilder.ToMessageBody();
                    mimeMessage.Subject = "Academic Appointment Onay Kodu";

                    SmtpClient client = new SmtpClient();
                    client.Connect("smtp.gmail.com", 587, false);
                    client.Authenticate("dolandiriciliklamucadeleet", "pddagdtfbczidkdq");
                    client.Send(mimeMessage);
                    client.Disconnect(true);

                    TempData["Mail"] = user.Email;

                    // Başarılıysa ana sayfaya yönlendiriyoruz
                    return RedirectToAction("ConfirmMail", "Account");
                }

                // Hata varsa ModelState'e ekliyoruz
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }

            // Eğer model geçerli değilse veya işlem başarısız olduysa tekrar formu gösteriyoruz
            return View(model);
        }

        [HttpGet]
        public IActionResult ConfirmMail(int id)
        {
            var value = TempData["Mail"];
            ViewBag.v = value;
            return View();
        }

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

        [HttpGet]
        public IActionResult Profile()
        {
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
                var result = await _signInManager.PasswordSignInAsync(
                    model.Email, model.Password, false, true);

                if (result.Succeeded)
                {
                    var user =await _userManager.FindByEmailAsync(model.Email);
                    if (user.EmailConfirmed == true)
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

        // GET: Account/CreateRole
        public IActionResult CreateRole()
        {
            return View();
        }

        // POST: Account/CreateRole
        [HttpPost]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            if (!string.IsNullOrEmpty(roleName))
            {
                var roleExists = await _roleManager.RoleExistsAsync(roleName);
                if (!roleExists)
                {
                    var role = new AppRole { Name = roleName };
                    var result = await _roleManager.CreateAsync(role);
                    if (result.Succeeded)
                    {
                        return RedirectToAction("Index", "Home");
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Bu rol zaten mevcut.");
                }
            }
            return View();
        }

        // GET: Account/AssignRole
        public IActionResult AssignRole()
        {
            return View();
        }

        // POST: Account/AssignRole
        [HttpPost]
        public async Task<IActionResult> AssignRole(string email, string roleName)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                ModelState.AddModelError("", "Kullanıcı bulunamadı.");
                return View();
            }

            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                ModelState.AddModelError("", "Böyle bir rol bulunamadı.");
                return View();
            }

            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (result.Succeeded)
            {
                return RedirectToAction("Index", "Home");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }

            return View();
        }
    }
}
