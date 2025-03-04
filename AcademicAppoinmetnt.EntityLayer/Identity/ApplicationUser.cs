using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppoinmetnt.EntityLayer.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string SchoolNumber { get; set; }  
    }
}
