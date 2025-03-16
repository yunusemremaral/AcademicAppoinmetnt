using AcademicAppointment.EntityLayer.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.EntityLayer.Entities
{
    public class Notification
    {
        public int NotificationId { get; set; }  // Bildirimin benzersiz ID'si
        public string? UserId { get; set; }  // Kullanıcı ID'si, sadece kişisel bildirimler için
        public string? Title { get; set; }  // Kullanıcı ID'si, sadece kişisel bildirimler için
        public string? Message { get; set; }  // Bildirimin içeriği
        public bool IsRead { get; set; }  // Bildirim okundu mu? (false olarak varsayılabilir)
        public DateTime CreatedAt { get; set; }  // Bildirimin oluşturulma tarihi
        public DateTime? ReadAt { get; set; }  // Bildirim okunduysa, okunduğu tarih
        public bool IsGlobal { get; set; }  // Eğer 'true' ise, bu bildirim tüm kullanıcılara gider
        public virtual AppUser? User { get; set; }  // Kullanıcıyla ilişkilendirme (nullable, çünkü global bildirimlerde kullanıcı olmayabilir)

    }
}
