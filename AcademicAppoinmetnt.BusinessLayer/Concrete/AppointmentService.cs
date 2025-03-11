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
    public class AppointmentService : GenericService<Appointment>, IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;

        public AppointmentService(IAppointmentRepository appointmentRepository)
            : base(appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }

        // Öğrencinin randevularını almak
        public async Task<IEnumerable<Appointment>> TGetAppointmentsByStudentIdAsync(string studentId)
        {
            return await _appointmentRepository.GetAppointmentsByStudentIdAsync(studentId);
        }

        // Öğretmenin randevularını almak
        public async Task<IEnumerable<Appointment>> TGetAppointmentsByTeacherIdAsync(string teacherId)
        {
            return await _appointmentRepository.GetAppointmentsByTeacherIdAsync(teacherId);
        }

        // Öğrenci ve öğretmen arasındaki randevuları almak
        public async Task<IEnumerable<Appointment>> TGetAppointmentsBetweenStudentAndTeacherAsync(string studentId, string teacherId)
        {
            return await _appointmentRepository.GetAppointmentsBetweenStudentAndTeacherAsync(studentId, teacherId);
        }

        public async Task<IEnumerable<Appointment>> TGetAppointmentsWithDetailsAsync()
        {
            return await _appointmentRepository.GetAppointmentsWithDetailsAsync();
        }
    }
}
