using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using AcademicAppointment.BusinessLayer.Abstract;

namespace AcademicAppointment.Presentation.Services
{
    public class EmailVerificationCleanupService
    {
        private readonly IAppUserService _userRepository;
        private readonly ILogger<EmailVerificationCleanupService> _logger;

        public EmailVerificationCleanupService(IAppUserService userRepository, ILogger<EmailVerificationCleanupService> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        public void DeleteUnverifiedAccounts()
        {
            try
            {
                var users = _userRepository.TGetAllAsync().Result; // Tüm kullanıcıları alıyoruz (senkronize edilmiş şekilde)
                foreach (var user in users)
                {
                    if (!user.EmailConfirmed) // Eğer e-posta doğrulanmamışsa
                    {
                        _userRepository.TDeleteAsync(user); // Onaylanmamış hesapları siliyoruz
                        _logger.LogInformation($"User {user.SchoolNumber} with email {user.Email} has been deleted for unverified email.");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while cleaning up unverified accounts: {ex.Message}");
            }
        }


    }

}
