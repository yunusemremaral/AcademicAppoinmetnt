﻿using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using AcademicAppoinmetnt.DataAccessLayer.Context;
using AcademicAppointment.EntityLayer.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace AcademicAppoinmetnt.DataAccessLayer.Repositories
{
    public class AppRoleRepository : GenericRepository<AppRole>, IAppRoleRepository
    {
        public AppRoleRepository(IdentityContext context) : base(context) { }

        
    }
}
