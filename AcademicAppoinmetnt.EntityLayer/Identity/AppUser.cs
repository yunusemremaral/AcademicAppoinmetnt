using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.EntityLayer.Identity
{
    public class AppUser : IdentityUser
    {
        public string SchoolNumber { get; set; }  
        public int? ConfirmCode { get; set; }  
    }
}
