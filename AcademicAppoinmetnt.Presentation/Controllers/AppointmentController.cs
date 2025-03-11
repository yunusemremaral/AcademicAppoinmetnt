using AcademicAppointment.BusinessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using AcademicAppointment.EntityLayer.Identity;
using AcademicAppointment.Presentation.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace AcademicAppointment.Presentation.Controllers
{
    public class AppointmentController : Controller
    {
        private readonly IAppointmentService _appointmentService;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AppointmentController(
            IAppointmentService appointmentService,
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager)
        {
            _appointmentService = appointmentService;
            _userManager = userManager;
            _signInManager = signInManager;
        }



        // Randevuların listelendiği sayfa
        public async Task<IActionResult> Index()
        {
            var appointments = await _appointmentService.TGetAppointmentsWithDetailsAsync();

            // AppointmentViewModel2'ye dönüştürme
            var appointmentViewModels = appointments.Select(a => new AppointmentViewModel2
            {
                AppointmentId = a.AppointmentId.ToString(),
                StudentId = a.StudentId,
                TeacherId = a.TeacherId,
                StudentEmail = a.Student?.Email,  // Öğrenci e-posta bilgisi
                TeacherEmail = a.Teacher?.Email,  // Öğretmen e-posta bilgisi
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                Status = a.Status.ToString()
            }).ToList();

            return View(appointmentViewModels);
        }



        // Randevu detay sayfası
        public async Task<IActionResult> Details(string id)
        {
            var appointment = await _appointmentService.TGetByIdAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }
            return View(appointment);
        }

        // Yeni randevu ekleme sayfası
        [HttpGet]
        public async Task<IActionResult> Create()
        {
            // Akademisyen rolüne sahip kullanıcıları getir
            var teachers = await _userManager.GetUsersInRoleAsync("Akademisyen");

            // Akademisyenleri SelectList olarak ViewBag içine atalım
            ViewBag.Teachers = new SelectList(teachers, "Id", "UserName");

            // Giriş yapan kullanıcının bilgisini al
            var student = await _userManager.GetUserAsync(User);

            if (student == null)
            {
                return RedirectToAction("Login", "Account");
            }

            // StudentId'yi otomatik olarak atayarak yeni bir AppointmentViewModel nesnesi oluştur
            var model = new AppointmentViewModel
            {
                StudentId = student.Id
            };

            return View(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(AppointmentViewModel model)
        {
            if (ModelState.IsValid)
            {
                // **Oturum açmış kullanıcının ID'sini al (öğrenci)**
                var student = await _userManager.GetUserAsync(User);
                if (student == null)
                {
                    return RedirectToAction("Login", "Account");
                }

                // **Seçilen akademisyenin ID'sini al**
                var teacher = await _userManager.FindByIdAsync(model.TeacherId);
                if (teacher == null)
                {
                    ModelState.AddModelError("TeacherId", "Geçersiz akademisyen seçildi.");
                    return View(model);
                }

                // **Yeni randevu nesnesi oluştur**
                var appointment = new Appointment
                {
                    AppointmentId = Guid.NewGuid().ToString(),  // Burada GUID oluşturup string'e dönüştürüyoruz
                    StudentId = student.Id,
                    TeacherId = teacher.Id,
                    StartTime = model.StartTime,
                    EndTime = model.EndTime,
                    Subject = model.Subject,
                    Status = (int)AppointmentStatus.Pending // Varsayılan 'Bekleyen' olarak ayarlanıyor
                };

                // **Randevuyu veritabanına ekle**
                await _appointmentService.TAddAsync(appointment);
                return RedirectToAction(nameof(Index));
            }

            // **Hata olursa tekrar akademisyen listesini ViewBag'e ekleyelim**
            ViewBag.Teachers = new SelectList(await _userManager.GetUsersInRoleAsync("Akademisyen"), "Id", "UserName");

            return View(model);
        }





        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, Appointment appointment)
        {
            if (id != appointment.AppointmentId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                await _appointmentService.TUpdateAsync(appointment);
                return RedirectToAction(nameof(Index));
            }
            return View(appointment);
        }

        // Randevu silme işlemi
        public async Task<IActionResult> Delete(string id)
        {
            var appointment = await _appointmentService.TGetByIdAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            await _appointmentService.TDeleteAsync(appointment);
            return RedirectToAction(nameof(Index));
        }
    }

}
