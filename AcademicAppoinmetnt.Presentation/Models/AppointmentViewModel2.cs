namespace AcademicAppointment.Presentation.Models
{
    public class AppointmentViewModel2
    {
        public string AppointmentId { get; set; }
        public string StudentId { get; set; }
        public string TeacherId { get; set; }
        public string StudentEmail { get; set; }
        public string TeacherEmail { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Status { get; set; }

    }
}