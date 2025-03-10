using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using AcademicAppointment.BusinessLayer.Abstract;
using AcademicAppointment.EntityLayer.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.BusinessLayer.Concrete
{
    public class AppUserService : GenericService<AppUser>, IAppUserService
    {
        public AppUserService(IAppUserRepository repository) : base(repository) { }
    }
}
