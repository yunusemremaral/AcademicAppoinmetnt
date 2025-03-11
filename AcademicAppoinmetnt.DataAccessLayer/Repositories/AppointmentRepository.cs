using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using AcademicAppoinmetnt.DataAccessLayer.Context;
using AcademicAppointment.DataAccessLayer.Abstract;
using AcademicAppointment.EntityLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AcademicAppoinmetnt.DataAccessLayer.Repositories
{
    public class AppointmentRepository : GenericRepository<Appointment>, IAppointmentRepository
    {
        public AppointmentRepository(IdentityContext context) : base(context) { }

        // Appointment için özel sorgular buraya eklenebilir
        public async Task<IEnumerable<Appointment>> GetAppointmentsByStudentIdAsync(string studentId)
        {
            return await _context.Set<Appointment>()
                .Where(a => a.StudentId == studentId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByTeacherIdAsync(string teacherId)
        {
            return await _context.Set<Appointment>()
                .Where(a => a.TeacherId == teacherId)
                .ToListAsync();
        }

        // Eğer öğrenci ve öğretmen arasındaki randevuları almak istiyorsak
        public async Task<IEnumerable<Appointment>> GetAppointmentsBetweenStudentAndTeacherAsync(string studentId, string teacherId)
        {
            return await _context.Set<Appointment>()
                .Where(a => a.StudentId == studentId && a.TeacherId == teacherId)
                .ToListAsync();
        }
        public async Task<IEnumerable<Appointment>> GetAppointmentsWithDetailsAsync()
        {
            return await _context.Set<Appointment>()
                .Include(a => a.Student)  // Öğrenci bilgilerini dahil et
                .Include(a => a.Teacher)  // Öğretmen bilgilerini dahil et
                .ToListAsync();
        }
    }
}
