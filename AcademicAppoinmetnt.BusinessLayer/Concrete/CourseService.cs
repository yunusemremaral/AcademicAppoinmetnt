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
    public class CourseService : GenericService<Course>, ICourseService
    {
        public CourseService(ICourseRepository repository) : base(repository) { }

    }
}
