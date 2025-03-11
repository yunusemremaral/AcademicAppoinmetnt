namespace AcademicAppointment.Presentation.Models
{
    public class AppointmentViewModel
    {
        public string StudentId { get; set; }  // Öğrenci ID'sini de ekliyoruz
        public string TeacherId { get; set; } // Akademisyen seçimi için
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Subject { get; set; }


    }
}
