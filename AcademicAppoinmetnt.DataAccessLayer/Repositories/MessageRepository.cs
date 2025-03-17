using AcademicAppoinmetnt.DataAccessLayer.Context;
using AcademicAppoinmetnt.DataAccessLayer.Repositories;
using AcademicAppointment.DataAccessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.DataAccessLayer.Repositories
{
    public class MessageRepository : GenericRepository<Message>, IMessageRepository
    {
        public MessageRepository(IdentityContext context) : base(context) { }

    }
}
