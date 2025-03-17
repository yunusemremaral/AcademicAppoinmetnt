using AcademicAppointment.BusinessLayer.Abstract;
using AcademicAppointment.DataAccessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.BusinessLayer.Concrete
{
    public class RoomService : GenericService<Room>, IRoomService
    {
        public RoomService(IRoomRepository repository) : base(repository) { }

    }
}
