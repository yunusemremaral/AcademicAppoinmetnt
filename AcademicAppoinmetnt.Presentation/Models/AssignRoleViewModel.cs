using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AcademicAppointment.Presentation.Models
{
    public class AssignRoleViewModel
    {
        public string UserId { get; set; }
        public List<Microsoft.AspNetCore.Mvc.Rendering.SelectListItem> Roles { get; set; }
        public string SelectedRole { get; set; }
    }
}
