namespace AcademicAppointment.Presentation.Models
{
    public class NotificationViewModel
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsRead { get; set; }
        public bool IsGlobal { get; set; }

    }
}
