using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using AcademicAppointment.EntityLayer.Identity;
using Microsoft.EntityFrameworkCore; // AppRole ve diğer model sınıflarınızı burada ekleyin

public class RoleController : Controller
{
    private readonly RoleManager<AppRole> _roleManager;

    public RoleController(RoleManager<AppRole> roleManager)
    {
        _roleManager = roleManager;
    }

    // Rol Listeleme
    public async Task<IActionResult> RoleList()
    {
        var roles = await _roleManager.Roles.ToListAsync(); // Veritabanından rollerin alınması
        return View(roles);
    }

    // Rol Oluşturma (GET)
    [HttpGet]
    public IActionResult CreateRole()
    {
        return View();
    }

    // Rol Oluşturma (POST)
    [HttpPost]
    public async Task<IActionResult> CreateRole(string roleName)
    {
        if (string.IsNullOrEmpty(roleName))
        {
            ModelState.AddModelError("", "Rol adı boş olamaz.");
            return View();
        }

        var existingRole = await _roleManager.FindByNameAsync(roleName);
        if (existingRole != null)
        {
            ModelState.AddModelError("", "Bu rol zaten mevcut.");
            return View();
        }

        var role = new AppRole { Name = roleName };
        var result = await _roleManager.CreateAsync(role);

        if (result.Succeeded)
        {
            return RedirectToAction("RoleList");
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError("", error.Description);
        }

        return View();
    }

    // Rol Güncelleme (GET)
    [HttpGet]
    public async Task<IActionResult> EditRole(string roleId)
    {
        if (string.IsNullOrEmpty(roleId))
        {
            return NotFound(); // ID yoksa, role bulunamadı hatası döndür.
        }

        var role = await _roleManager.FindByIdAsync(roleId);
        if (role == null)
        {
            return NotFound(); // Role bulunamadıysa, hata döndür.
        }

        return View(role);
    }


    // Rol Güncelleme (POST)
    [HttpPost]
    public async Task<IActionResult> EditRole(AppRole role)
    {
        if (ModelState.IsValid)
        {
            var existingRole = await _roleManager.FindByIdAsync(role.Id);
            if (existingRole == null)
            {
                return NotFound();
            }

            existingRole.Name = role.Name;
            var result = await _roleManager.UpdateAsync(existingRole);

            if (result.Succeeded)
            {
                return RedirectToAction("RoleList");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
        }
        return View(role);
    }

    // Rol Silme
    public async Task<IActionResult> DeleteRole(string roleId)
    {
        var role = await _roleManager.FindByIdAsync(roleId);
        if (role == null)
        {
            return NotFound();
        }

        var result = await _roleManager.DeleteAsync(role);

        if (result.Succeeded)
        {
            return RedirectToAction("RoleList");
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError("", error.Description);
        }

        return RedirectToAction("RoleList");
    }
}
