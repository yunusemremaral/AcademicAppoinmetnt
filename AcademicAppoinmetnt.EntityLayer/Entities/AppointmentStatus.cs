using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.EntityLayer.Entities
{
    public enum AppointmentStatus
    {
        Pending = 0,    // Bekleyen
        Approved = 1,   // Onaylı
        Rejected = 2    // Red
    }
}
