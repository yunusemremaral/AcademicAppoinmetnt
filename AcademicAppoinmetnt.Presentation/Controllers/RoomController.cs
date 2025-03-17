using AcademicAppointment.BusinessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using AcademicAppointment.EntityLayer.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Security.Claims;

namespace AcademicAppointment.Presentation.Controllers
{
    [Authorize] // Sadece giriş yapmış kullanıcılar erişebilir
    public class RoomController : Controller
    {
        private readonly IRoomService _roomService;
        private readonly UserManager<AppUser> _userManager;

        public RoomController(IRoomService roomService, UserManager<AppUser> userManager)
        {
            _roomService = roomService;
            _userManager = userManager;
        }


        // Tüm Odaları Listeleme
        public async Task<IActionResult> Index()
        {
            var rooms = await _roomService.TGetAllAsync();
            return View(rooms);
        }

        // Öğretmenin Kendi Odalarını Listeleme
        public async Task<IActionResult> MyRooms()
        {
            var teacherId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (teacherId == null)
            {
                return RedirectToAction("Login", "Account");
            }

            var rooms = await _roomService.TFindAsync(r => r.TeacherId == teacherId);
            return View(rooms);
        }

        // Oda Ekleme - GET
        public async Task<IActionResult> Create()
        {
            var teachers = await _userManager.GetUsersInRoleAsync("Akademisyen");
            ViewBag.Users = teachers.Select(t => new SelectListItem
            {
                Value = t.Id,
                Text = t.Email
            }).ToList();

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Room room)
        {
            var teachers = await _userManager.GetUsersInRoleAsync("Akademisyen");
            ViewBag.Users = teachers.Select(t => new SelectListItem
            {
                Value = t.Id,
                Text = t.Email
            }).ToList();

            if (!ModelState.IsValid)
            {
                return View(room);
            }

            var teacher = await _userManager.FindByIdAsync(room.TeacherId);
            if (teacher == null)
            {
                ModelState.AddModelError("", "Seçilen öğretmen bulunamadı.");
                return View(room);
            }

            await _roomService.TAddAsync(room);
            return RedirectToAction("Index");
        }


        // Oda Güncelleme - GET
        public async Task<IActionResult> Edit(int id)
        {
            var room = await _roomService.TGetIntByIdAsync(id);
            if (room == null || room.TeacherId != User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                return Unauthorized();
            }

            return View(room);
        }

        // Oda Güncelleme - POST
        [HttpPost]
        public async Task<IActionResult> Edit(Room room)
        {
            if (!ModelState.IsValid)
            {
                return View(room);
            }

            var existingRoom = await _roomService.TGetIntByIdAsync(room.RoomId);
            if (existingRoom == null || existingRoom.TeacherId != User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                return Unauthorized();
            }

            await _roomService.TUpdateAsync(room);
            return RedirectToAction("Index");
        }

        // Oda Silme
        public async Task<IActionResult> Delete(int id)
        {
            var room = await _roomService.TGetIntByIdAsync(id);
            if (room == null || room.TeacherId != User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                return Unauthorized();
            }

            await _roomService.TDeleteAsync(room);
            return RedirectToAction("Index");
        }
    }

}
