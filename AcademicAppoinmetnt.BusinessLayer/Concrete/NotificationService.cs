using AcademicAppointment.BusinessLayer.Abstract;
using AcademicAppointment.DataAccessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AcademicAppointment.BusinessLayer.Concrete
{
    public class NotificationService : GenericService<Notification>, INotificationService
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationService(INotificationRepository notificationRepository) : base(notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        // Kullanıcıya özel bildirimleri alma
        public async Task<List<Notification>> GetNotificationsByUserIdAsync(string userId)
        {
            return await _notificationRepository.GetNotificationsByUserIdAsync(userId);
        }

        // Global bildirimleri alma
        public async Task<List<Notification>> GetGlobalNotificationsAsync()
        {
            return await _notificationRepository.GetGlobalNotificationsAsync();
        }

        // Bildirim okundu olarak işaretleme
        public async Task MarkAsReadAsync(int notificationId)
        {
            var notification = await _notificationRepository.GetByIdAsync(notificationId.ToString());
            if (notification != null)
            {
                notification.IsRead = true;   // Bildirimi okundu olarak işaretle
                notification.ReadAt = DateTime.Now;  // Okundu tarihi
                await _notificationRepository.UpdateAsync(notification); // Generic Update metodunu kullanıyoruz
            }
        }

       
    }
}
