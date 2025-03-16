using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.DataAccessLayer.Abstract
{
    public interface INotificationRepository : IGenericRepository<Notification>
    {
        Task<List<Notification>> GetNotificationsByUserIdAsync(string userId); // Kullanıcıya özel bildirimleri almak için
        Task<List<Notification>> GetGlobalNotificationsAsync(); // Tüm kullanıcılara gidecek bildirimleri almak için
    }

}
