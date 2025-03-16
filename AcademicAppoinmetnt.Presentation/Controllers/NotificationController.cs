using AcademicAppointment.BusinessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using AcademicAppointment.EntityLayer.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AcademicAppointment.Presentation.Controllers
{
    public class NotificationController : Controller
    {
        private readonly INotificationService _notificationService;
        private readonly UserManager<AppUser> _userManager;

        public NotificationController(INotificationService notificationService, UserManager<AppUser> userManager)
        {
            _notificationService = notificationService;
            _userManager = userManager;
        }

        // Kullanıcıya özel bildirimleri görüntüleme
        public async Task<IActionResult> UserNotifications()
        {
            var userId = _userManager.GetUserId(User);  // Identity ile giriş yapan kullanıcının ID'sini alıyoruz
            if (userId == null)
            {
                return Unauthorized(); // Kullanıcı ID'si alınamazsa, yetkisiz erişim
            }

            var notifications = await _notificationService.GetNotificationsByUserIdAsync(userId);
            if (notifications == null || notifications.Count == 0)
            {
                ViewBag.Message = "No notifications found.";
                return View();
            }
            return View(notifications);
        }

        // Global bildirimleri görüntüleme
        public async Task<IActionResult> GlobalNotifications()
        {
            var notifications = await _notificationService.GetGlobalNotificationsAsync();
            if (notifications == null || notifications.Count == 0)
            {
                ViewBag.Message = "No global notifications found.";
                return View();
            }
            return View(notifications);
        }

        // Bildirimi okundu olarak işaretleme
        public async Task<IActionResult> MarkAsRead(int notificationId)
        {
            await _notificationService.MarkAsReadAsync(notificationId);
            return RedirectToAction("UserNotifications");  // Bildirim okundu olarak işaretlendikten sonra tekrar listeye döneriz
        }

        // Yeni bildirim oluşturma
        public IActionResult CreateNotification()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateNotification(Notification notification)
        {
            if (ModelState.IsValid)
            {
                var userId = _userManager.GetUserId(User);  // Giriş yapan kullanıcının ID'si alınır
                if (userId != null)
                {
                    notification.UserId = userId; // Yeni bildirime kullanıcı ID'si atanır
                    await _notificationService.TAddAsync(notification);
                    return RedirectToAction("UserNotifications");  // Başarıyla oluşturulduğunda kullanıcının bildirim listesine yönlendirir
                }
                return Unauthorized(); // Kullanıcı ID'si alınamazsa, yetkisiz erişim
            }
            return View(notification); // Geçersiz model durumunda formu yeniden göster
        }
    }


}
