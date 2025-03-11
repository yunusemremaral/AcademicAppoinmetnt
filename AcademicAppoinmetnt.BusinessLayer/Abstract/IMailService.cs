using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.BusinessLayer.Abstract
{
    public interface IMailService
    {
        Task SendConfirmationEmailAsync(string toEmail, int code);
        Task SendPasswordResetEmailAsync(string toEmail, string resetLink); // Yeni metot

    }
}
