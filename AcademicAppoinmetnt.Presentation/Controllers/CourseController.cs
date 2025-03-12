using AcademicAppointment.BusinessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using AcademicAppointment.EntityLayer.Identity;
using AcademicAppointment.Presentation.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Threading.Tasks;

namespace AcademicAppointment.Presentation.Controllers
{
    public class CourseController : Controller
    {
        private readonly ICourseService _courseService;
        private readonly UserManager<AppUser> _userManager;

        public CourseController(ICourseService courseService, UserManager<AppUser> userManager)
        {
            _courseService = courseService;
            _userManager = userManager;
        }

        // Tüm dersleri listeleme
        public async Task<IActionResult> Index()
        {
            var courses = await _courseService.TGetAllAsync();
            return View(courses);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var instructors = await _userManager.GetUsersInRoleAsync("Akademisyen"); // Akademisyen rolündeki kullanıcıları alıyoruz

            if (instructors == null)
            {
                // Eğer akademisyen bulunamazsa hata mesajı döndürebilirsiniz
                return NotFound("No instructors found.");
            }

            // ViewBag ile instructors listesini gönderiyoruz
            ViewBag.Instructors = instructors.Select(u => new SelectListItem
            {
                Value = u.Id, // Akademisyenin ID'si
                Text = u.UserName // Akademisyenin ismi
            }).ToList();

            return View();
        }

        // Yeni dersi kaydetme
        [HttpPost]
        public async Task<IActionResult> Create(CourserCreateViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var course = new Course
                {
                    Name = viewModel.Name,
                    InstructorId = viewModel.InstructorId // Seçilen akademisyen ID'si
                };

                await _courseService.TAddAsync(course); // Ders kaydetme
                return RedirectToAction("Index");
            }
            return View(viewModel);
        }
    

        // Ders düzenleme formu
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var course = await _courseService.TGetIntByIdAsync(id);
            if (course == null)
            {
                return NotFound();
            }
            return View(course);
        }

        // Ders düzenleme işlemi
        [HttpPost]
        public async Task<IActionResult> Edit(Course course)
        {
            if (ModelState.IsValid)
            {
                await _courseService.TUpdateAsync(course);
                return RedirectToAction("Index");
            }
            return View(course);
        }

        // Ders silme onay sayfası
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var course = await _courseService.TGetIntByIdAsync(id);
            if (course == null)
            {
                return NotFound();
            }
            return View(course);
        }

        // Ders silme işlemi
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var course = await _courseService.TGetIntByIdAsync(id);
            if (course != null)
            {
                await _courseService.TDeleteAsync(course);
            }
            return RedirectToAction("Index");
        }
    }
}
