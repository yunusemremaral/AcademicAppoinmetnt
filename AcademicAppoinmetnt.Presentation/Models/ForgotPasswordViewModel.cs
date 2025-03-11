using System.ComponentModel.DataAnnotations;

namespace AcademicAppointment.Presentation.Models
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
