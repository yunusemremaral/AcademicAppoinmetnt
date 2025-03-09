using AcademicAppointment.EntityLayer.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AcademicAppoinmetnt.DataAccessLayer.Abstract
{
    public interface IAppUserRepository : IGenericRepository<AppUser>
    {
        Task<AppUser> GetByEmailAsync(string email);
    }
}
