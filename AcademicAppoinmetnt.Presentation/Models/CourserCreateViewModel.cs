using Microsoft.AspNetCore.Mvc.Rendering;

namespace AcademicAppointment.Presentation.Models
{
    public class CourserCreateViewModel
    {
        public string Name { get; set; }
        public string InstructorId { get; set; }

        public List<SelectListItem> Instructors { get; set; } // Akademisyenler listesi
    }
}
