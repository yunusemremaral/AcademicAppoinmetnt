using AcademicAppoinmetnt.DataAccessLayer.Context;
using AcademicAppoinmetnt.DataAccessLayer.Repositories;
using AcademicAppointment.DataAccessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AcademicAppointment.DataAccessLayer.Repositories
{
    public class NotificationRepository : GenericRepository<Notification>, INotificationRepository
    {
        public NotificationRepository(IdentityContext context) : base(context) { }

        public async Task<List<Notification>> GetNotificationsByUserIdAsync(string userId)
        {
            return await _context.Set<Notification>()
                                 .Where(n => n.UserId == userId)
                                 .ToListAsync();
        }

        public async Task<List<Notification>> GetGlobalNotificationsAsync()
        {
            return await _context.Set<Notification>()
                                 .Where(n => n.IsGlobal == true)
                                 .ToListAsync();
        }
    }
}
