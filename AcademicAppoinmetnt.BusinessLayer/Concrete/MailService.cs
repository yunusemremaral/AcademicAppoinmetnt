using AcademicAppointment.BusinessLayer.Abstract;
using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.BusinessLayer.Concrete
{
    public class MailService : IMailService
    {
        public async Task SendConfirmationEmailAsync(string toEmail, int code)
        {
            MimeMessage mimeMessage = new MimeMessage();
            var mailboxAddressFrom = new MailboxAddress("Academic Appointment Admin", "dolandiriciliklamucadeleet@gmail.com");
            var mailboxAddressTo = new MailboxAddress("User", toEmail);
            mimeMessage.From.Add(mailboxAddressFrom);
            mimeMessage.To.Add(mailboxAddressTo);

            var bodyBuilder = new BodyBuilder
            {
                TextBody = $"Kayıt işlemini gerçekleştirmek için onay kodunuz: {code}"
            };
            mimeMessage.Body = bodyBuilder.ToMessageBody();
            mimeMessage.Subject = "Academic Appointment Onay Kodu";

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);
                client.Authenticate("dolandiriciliklamucadeleet", "pddagdtfbczidkdq");
                await client.SendAsync(mimeMessage);
                client.Disconnect(true);
            }
        }
    }
}
