using AcademicAppointment.EntityLayer.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.EntityLayer.Entities
{
    public class Course
    {
        public int CourseId { get; set; }
        public string Name { get; set; }

        public string InstructorId { get; set; } // Foreign Key
        public AppUser Instructor { get; set; } // Navigation Property
    }

}
