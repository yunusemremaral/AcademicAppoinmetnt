using AcademicAppointment.EntityLayer.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.EntityLayer.Entities
{
    public class Room   
    {
        public int RoomId { get; set; }
        public string RoomName { get; set; }

        public string TeacherId { get; set; }
        public AppUser Teacher { get; set; }

        public string Images { get; set; } // JSON formatında tutulabilir
        public string LocationDescription { get; set; }

    }
}
