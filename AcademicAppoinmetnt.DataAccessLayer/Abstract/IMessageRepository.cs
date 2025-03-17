using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.DataAccessLayer.Abstract
{
    public interface IMessageRepository : IGenericRepository<Message>
    {
    }
}
