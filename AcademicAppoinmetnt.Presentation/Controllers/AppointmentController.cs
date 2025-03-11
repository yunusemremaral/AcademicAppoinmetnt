using AcademicAppointment.BusinessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AcademicAppointment.Presentation.Controllers
{
    public class AppointmentController : Controller
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        // Randevuların listelendiği sayfa
        public async Task<IActionResult> Index()
        {
            var appointments = await _appointmentService.TGetAllAsync();
            return View(appointments);
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
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Appointment appointment)
        {
            if (ModelState.IsValid)
            {
                await _appointmentService.TAddAsync(appointment);
                return RedirectToAction(nameof(Index));
            }
            return View(appointment);
        }

        // Randevu düzenleme sayfası
        public async Task<IActionResult> Edit(string id)
        {
            var appointment = await _appointmentService.TGetByIdAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }
            return View(appointment);
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
