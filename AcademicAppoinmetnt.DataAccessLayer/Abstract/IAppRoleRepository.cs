using AcademicAppoinmetnt.EntityLayer.Identity;
using System.Threading.Tasks;

namespace AcademicAppoinmetnt.DataAccessLayer.Abstract
{
    public interface IAppRoleRepository : IGenericRepository<AppRole>
    {
        Task<AppRole> GetByNameAsync(string roleName);
    }
}
