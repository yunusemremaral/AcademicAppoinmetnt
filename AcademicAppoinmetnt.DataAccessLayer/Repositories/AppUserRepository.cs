using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using AcademicAppoinmetnt.DataAccessLayer.Context;
using AcademicAppoinmetnt.EntityLayer.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace AcademicAppoinmetnt.DataAccessLayer.Repositories
{
    public class AppUserRepository : GenericRepository<AppUser>, IAppUserRepository
    {
        public AppUserRepository(IdentityContext context) : base(context) { }

        public async Task<AppUser> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
