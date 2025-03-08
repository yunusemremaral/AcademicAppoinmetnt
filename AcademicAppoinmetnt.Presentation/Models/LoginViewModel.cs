using System.ComponentModel.DataAnnotations;

namespace AcademicAppointment.Presentation.Models
{
    public class LoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Beni Hat�rla")]
        public bool RememberMe { get; set; }
    }

}
