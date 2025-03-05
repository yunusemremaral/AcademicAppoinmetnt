using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using AcademicAppoinmetnt.DataAccessLayer.Context;
using System;
using System.Threading.Tasks;

namespace AcademicAppoinmetnt.DataAccessLayer.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IdentityContext _context;
        public IAppUserRepository Users { get; }
        public IAppRoleRepository Roles { get; }

        public UnitOfWork(IdentityContext context, IAppUserRepository userRepository, IAppRoleRepository roleRepository)
        {
            _context = context;
            Users = userRepository;
            Roles = roleRepository;
        }

        public async Task<int> SaveChangesAsync() => await _context.SaveChangesAsync();

        public void Dispose() => _context.Dispose();
    }
}
