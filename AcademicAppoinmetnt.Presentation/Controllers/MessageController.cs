using AcademicAppointment.BusinessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using AcademicAppointment.EntityLayer.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AcademicAppointment.Presentation.Controllers
{
    [Authorize] // Kullanıcı girişi gerektiriyor
    public class MessageController : Controller
    {
        private readonly IMessageService _messageService;
        private readonly UserManager<AppUser> _userManager;

        public MessageController(IMessageService messageService, UserManager<AppUser> userManager)
        {
            _messageService = messageService;
            _userManager = userManager;
        }

        public async Task<IActionResult> Inbox()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var messages = await _messageService.TFindAsync(m => m.ReceiverId == userId);
            return View(messages);
        }

        public async Task<IActionResult> Sent()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var messages = await _messageService.TFindAsync(m => m.SenderId == userId);
            return View(messages);
        }

        public async Task<IActionResult> SendMessage()
        {
            var users = await _userManager.Users.ToListAsync();
            if (users == null || !users.Any())
            {
                // Handle the case where no users are found
                ModelState.AddModelError("", "No users found.");
                return View();
            }
            ViewBag.Users = new SelectList(users, "Id", "Email");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(Message message)
        {
            var senderId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (senderId == null) return RedirectToAction("Login", "Account");

            message.SenderId = senderId;
            message.SentDate = DateTime.UtcNow;
            message.IsRead = false;

            await _messageService.TAddAsync(message);
            return RedirectToAction("Sent");
        }


        public async Task<IActionResult> Delete(int id)
        {
            var message = await _messageService.TGetIntByIdAsync(id);
            if (message == null) return NotFound();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (message.SenderId != userId && message.ReceiverId != userId)
                return Forbid();

            await _messageService.TDeleteAsync(message);
            return RedirectToAction("Inbox");
        }
    }

}
