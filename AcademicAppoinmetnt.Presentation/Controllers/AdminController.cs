using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using Microsoft.AspNetCore.Mvc;
using AcademicAppointment.EntityLayer.Identity;
using Microsoft.AspNetCore.Identity;
using AcademicAppointment.Presentation.Models;

namespace AcademicAppointment.Presentation.Controllers
{
    public class AdminController : Controller
    {
        private readonly IAppUserRepository _appUserRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdminController(IAppUserRepository appUserRepository, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _appUserRepository = appUserRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        // Kullanıcı listesi, yalnızca mail adresleri gösterilecek
        public async Task<IActionResult> UserList()
        {
            var users = await _appUserRepository.GetAllAsync();
            var userEmails = users.Select(u => u.Email).ToList(); // Yalnızca mail adreslerini alıyoruz
            return View(userEmails);
        }

        // Kullanıcıyı silme işlemi
        [HttpPost]
        public async Task<IActionResult> DeleteUser(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                await _userManager.DeleteAsync(user);
                // Kullanıcı başarıyla silindi
            }
            return RedirectToAction("UserList");
        }

        // Kullanıcı düzenleme işlemi
        [HttpGet]
        public async Task<IActionResult> EditUser(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return View(user);  // Kullanıcıyı düzenlemeye yönlendiren view
            }
            return RedirectToAction("UserList");
        }

        // Kullanıcı düzenleme işlemini kaydetme
        [HttpPost]
        public async Task<IActionResult> EditUser(AppUser model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByIdAsync(model.Id);
                if (user != null)
                {
                    user.Email = model.Email;
                    user.UserName = model.UserName;
                    // Diğer özellikler burada güncellenebilir

                    var result = await _userManager.UpdateAsync(user);
                    if (result.Succeeded)
                    {
                        return RedirectToAction("UserList");
                    }
                }
            }
            return View(model);
        }

        // Kullanıcıya rollerin listelendiği formu gösterme
        [HttpGet]
        public async Task<IActionResult> AssignRole(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return RedirectToAction("UserList");
            }

            // Rollerimizi burada tanımlıyoruz
            var roles = new List<string> { "Admin", "Academician", "Student" };

            // Rolleri SelectListItem formatına çeviriyoruz
            var model = new AssignRoleViewModel
            {
                UserId = user.Id,
                Roles = roles.Select(role => new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem
                {
                    Value = role,
                    Text = role
                }).ToList()
            };

            return View(model);
        }


        // Kullanıcıya rol atama işlemi
        [HttpPost]
        public async Task<IActionResult> AssignRole(AssignRoleViewModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user != null)
            {
                var currentRoles = await _userManager.GetRolesAsync(user);

                // Kullanıcının önceki rollerini silip yeni rolü ekliyoruz
                var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
                if (!removeResult.Succeeded)
                {
                    // Hata durumunda kullanıcıyı bilgilendirebiliriz
                    return View(model);
                }

                var addResult = await _userManager.AddToRoleAsync(user, model.SelectedRole);
                if (addResult.Succeeded)
                {
                    return RedirectToAction("UserList");
                }
            }

            return View(model);
        }

    }
}
