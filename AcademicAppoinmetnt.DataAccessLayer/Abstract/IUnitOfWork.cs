using System;
using System.Threading.Tasks;

namespace AcademicAppoinmetnt.DataAccessLayer.Abstract
{
    public interface IUnitOfWork : IDisposable
    {
        IAppUserRepository Users { get; }
        IAppRoleRepository Roles { get; }
        Task<int> SaveChangesAsync();
    }
}
