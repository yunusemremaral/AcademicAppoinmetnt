using AcademicAppointment.BusinessLayer.Abstract;
using MailKit.Net.Smtp;
using MimeKit;
using System.Threading.Tasks;

namespace AcademicAppointment.BusinessLayer.Concrete
{
    public class MailService : IMailService
    {
        private const string SenderEmail = "dolandiriciliklamucadeleet@gmail.com";
        private const string SenderPassword = "pddagdtfbczidkdq";
        private const string SmtpServer = "smtp.gmail.com";
        private const int SmtpPort = 587;

        public async Task SendConfirmationEmailAsync(string toEmail, int code)
        {
            await SendEmailAsync(toEmail, "Academic Appointment Onay Kodu",
                $"Kayıt işlemini gerçekleştirmek için onay kodunuz: {code}");
        }
        public async Task SendPasswordResetEmailAsync(string toEmail, string resetLink)
        {
            await SendEmailAsync(toEmail, "Şifre Sıfırlama İsteği",resetLink);
        }



        private async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            MimeMessage mimeMessage = new MimeMessage();
            mimeMessage.From.Add(new MailboxAddress("Academic Appointment Admin", SenderEmail));
            mimeMessage.To.Add(new MailboxAddress("User", toEmail));
            mimeMessage.Subject = subject;

            var bodyBuilder = new BodyBuilder { TextBody = body };
            mimeMessage.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                client.Connect(SmtpServer, SmtpPort, false);
                client.Authenticate(SenderEmail, SenderPassword);
                await client.SendAsync(mimeMessage);
                client.Disconnect(true);
            }
        }
    }
}
