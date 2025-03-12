using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AcademicAppointment.EntityLayer.Identity;
using AcademicAppointment.EntityLayer.Entities;

namespace AcademicAppoinmetnt.DataAccessLayer.Context
{
    public class IdentityContext : IdentityDbContext<AppUser, AppRole, string>
    {
        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
        {
        }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Course> Courses { get; set; } 

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Ders ve Öğretmen arasındaki ilişki
            builder.Entity<Course>()
                .HasOne(c => c.Instructor)
                .WithMany() 
                .HasForeignKey(c => c.InstructorId)
                .OnDelete(DeleteBehavior.Restrict); // Öğretmen silinirse dersi silme
        }


    }
}
