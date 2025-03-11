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
        Task<IEnumerable<Appointment>> TGetAppointmentsByStudentIdAsync(string studentId);
        Task<IEnumerable<Appointment>> TGetAppointmentsByTeacherIdAsync(string teacherId);
        Task<IEnumerable<Appointment>> TGetAppointmentsBetweenStudentAndTeacherAsync(string studentId, string teacherId);

        Task<IEnumerable<Appointment>> TGetAppointmentsWithDetailsAsync();

    }

}
