using AcademicAppointment.EntityLayer.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.EntityLayer.Entities
{
    public class Appointment
    {
        public string AppointmentId { get; set; }
        public string StudentId { get; set; }
        public AppUser Student { get; set; }

        public string TeacherId { get; set; }
        public AppUser Teacher { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public string Subject { get; set; }

        public AppointmentStatus Status { get; set; } // Enum tipi
    }
}
