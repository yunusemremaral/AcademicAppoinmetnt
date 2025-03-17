using AcademicAppointment.BusinessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using AcademicAppointment.EntityLayer.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AcademicAppointment.Presentation.Controllers
{
    [Authorize] // Kullanıcı girişi gerektiriyor
    public class RoomController : Controller
    {
        private readonly IRoomService _roomService;
        private readonly UserManager<AppUser> _userManager;

        public RoomController(IRoomService roomService, UserManager<AppUser> userManager)
        {
            _roomService = roomService;
            _userManager = userManager;
        }

        public async Task<IActionResult> Index()
        {
            var rooms = await _roomService.TGetAllAsync();
            return View(rooms);
        }

        public async Task<IActionResult> Details(int id)
        {
            var room = await _roomService.TGetIntByIdAsync(id);
            if (room == null) return NotFound();
            return View(room);
        }

        [Authorize(Roles = "Teacher")] // Sadece öğretmenler oluşturabilir
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> Create(Room room)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            room.TeacherId = userId;
            await _roomService.TAddAsync(room);
            return RedirectToAction("Index");
        }

        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> Edit(int id)
        {
            var room = await _roomService.TGetIntByIdAsync(id);
            if (room == null) return NotFound();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (room.TeacherId != userId) return Forbid();

            return View(room);
        }

        [HttpPost]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> Edit(int id, Room updatedRoom)
        {
            var existingRoom = await _roomService.TGetIntByIdAsync(id);
            if (existingRoom == null) return NotFound();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (existingRoom.TeacherId != userId) return Forbid();

            existingRoom.RoomName = updatedRoom.RoomName;
            existingRoom.Images = updatedRoom.Images;
            existingRoom.LocationDescription = updatedRoom.LocationDescription;

            await _roomService.TUpdateAsync(existingRoom);
            return RedirectToAction("Index");
        }

        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> Delete(int id)
        {
            var room = await _roomService.TGetIntByIdAsync(id);
            if (room == null) return NotFound();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (room.TeacherId != userId) return Forbid();

            await _roomService.TDeleteAsync(room);
            return RedirectToAction("Index");
        }
    }

}
