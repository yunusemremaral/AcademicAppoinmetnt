using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using AcademicAppointment.EntityLayer.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.DataAccessLayer.Abstract
{
    public interface IAppointmentRepository : IGenericRepository<Appointment>
    {
        Task<IEnumerable<Appointment>> GetAppointmentsByStudentIdAsync(string studentId);
        Task<IEnumerable<Appointment>> GetAppointmentsByTeacherIdAsync(string teacherId);
        Task<IEnumerable<Appointment>> GetAppointmentsBetweenStudentAndTeacherAsync(string studentId, string teacherId);

        Task<IEnumerable<Appointment>> GetAppointmentsWithDetailsAsync();


    }
}
