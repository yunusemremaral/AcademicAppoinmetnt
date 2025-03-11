using AcademicAppointment.EntityLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.BusinessLayer.Abstract
{
    public interface IAppointmentService : IGenericService<Appointment>
    {
        Task<IEnumerable<Appointment>> GetAppointmentsByStudentIdAsync(string studentId);
        Task<IEnumerable<Appointment>> GetAppointmentsByTeacherIdAsync(string teacherId);
        Task<IEnumerable<Appointment>> GetAppointmentsBetweenStudentAndTeacherAsync(string studentId, string teacherId);
    }

}
