using AcademicAppointment.EntityLayer.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.EntityLayer.Entities
{
    public class Message
    {
        public int MessageId { get; set; }

        public string SenderId { get; set; }
        public AppUser Sender { get; set; }

        public string ReceiverId { get; set; }
        public AppUser Receiver { get; set; }
        public string MessageTitle { get; set; }

        public string MessageText { get; set; }
        public DateTime SentDate { get; set; }
        public bool IsRead { get; set; } = false;

    }
}
