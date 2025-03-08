using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AcademicAppointment.Presentation.Models
{
    public class AssignRoleViewModel
    {
        [Required]
        public string UserId { get; set; } // Kullanıcının seçileceği ID

        [Required]
        public string RoleId { get; set; } // Atanacak rolün ID'si

        public List<SelectListItem> Users { get; set; } // Dropdown için kullanıcı listesi
        public List<SelectListItem> Roles { get; set; } // Dropdown için rol listesi
    }
}
