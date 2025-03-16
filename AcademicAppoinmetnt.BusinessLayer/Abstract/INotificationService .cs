using AcademicAppointment.EntityLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.BusinessLayer.Abstract
{
    public interface INotificationService : IGenericService<Notification>
    {
        Task<List<Notification>> GetNotificationsByUserIdAsync(string userId); // Kullanıcıya özel bildirimler
        Task MarkAsReadAsync(int notificationId); // Bildirim okundu olarak işaretleme

        Task<List<Notification>> GetGlobalNotificationsAsync(); // Global bildirimler
    }

}
