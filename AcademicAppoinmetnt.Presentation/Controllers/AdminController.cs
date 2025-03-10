using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using AcademicAppointment.EntityLayer.Identity;
using AcademicAppointment.Presentation.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class AdminController : Controller
{
    private readonly IAppUserRepository _appUserRepository;
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<AppRole> _roleManager;

    public AdminController(IAppUserRepository appUserRepository, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        _appUserRepository = appUserRepository;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    // Kullanıcı listesi
    public async Task<IActionResult> UserList()
    {
        var users = await _appUserRepository.GetAllAsync();
        var userList = users.Select(u => new AppUserViewModel
        {
            Email = u.Email,
            SchoolNumber = u.SchoolNumber
        }).ToList();

        return View(userList);
    }

    // Kullanıcıyı silme
    [HttpPost]
    public async Task<IActionResult> DeleteUser(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user != null)
        {
            await _userManager.DeleteAsync(user);
        }
        return RedirectToAction("UserList");
    }

    // Kullanıcı düzenleme
    [HttpGet]
    public async Task<IActionResult> EditUser(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user != null)
        {
            return View(user);
        }
        return RedirectToAction("UserList");
    }

    // Kullanıcı düzenleme kaydetme
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
                user.SchoolNumber = model.SchoolNumber; // SchoolNumber'ı güncelliyoruz

                var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return RedirectToAction("UserList");
                }
            }
        }
        return View(model);
    }

    // Kullanıcıya rol atama
    [HttpGet]
    public async Task<IActionResult> AssignRole(string email)
    {
        
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return RedirectToAction("UserList");
        }
        ViewBag.email = user.Email;

        // Mevcut rolleri RoleManager ile alıyoruz
        var roles = await _roleManager.Roles.Select(role => new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem
        {
            Value = role.Name,  // Rolün adı
            Text = role.Name    // Rolün adı
        }).ToListAsync();

        var model = new AssignRoleViewModel
        {
            UserId = user.Id,
            Roles = roles
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
            // Kullanıcının mevcut rollerini alıyoruz
            var currentRoles = await _userManager.GetRolesAsync(user);

            // Eski rollerden çıkarıyoruz
            var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeResult.Succeeded)
            {
                return View(model);  // Bir hata oluşursa view'da gösterecek
            }

            // Seçilen rolü alıyoruz ve kullanıcıya atıyoruz
            var selectedRole = await _roleManager.FindByNameAsync(model.SelectedRole);
            if (selectedRole != null)
            {
                var addResult = await _userManager.AddToRoleAsync(user, selectedRole.Name);
                if (addResult.Succeeded)
                {
                    return RedirectToAction("UserList");
                }
            }
        }

        return View(model);  // Başarısızsa view'ı döndürüyoruz
    }


    

}
