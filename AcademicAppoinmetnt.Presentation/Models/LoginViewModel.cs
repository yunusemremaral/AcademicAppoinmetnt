using System.ComponentModel.DataAnnotations;

namespace AcademicAppoinmetnt.Presentation.Models
{
    public class LoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Beni Hatýrla")]
        public bool RememberMe { get; set; }
    }

}
