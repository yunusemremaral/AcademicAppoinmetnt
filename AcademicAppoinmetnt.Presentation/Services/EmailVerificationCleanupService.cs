using AcademicAppoinmetnt.DataAccessLayer.Abstract;

namespace AcademicAppointment.Presentation.Services
{
    public class EmailVerificationCleanupService
    {
        private readonly IAppUserRepository _userRepository;
        private readonly ILogger<EmailVerificationCleanupService> _logger;

        public EmailVerificationCleanupService(IAppUserRepository userRepository, ILogger<EmailVerificationCleanupService> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        public void DeleteUnverifiedAccounts()
        {
            try
            {
                var users = _userRepository.GetAllAsync().Result; // Tüm kullanıcıları alıyoruz (senkronize edilmiş şekilde)
                foreach (var user in users)
                {
                    if (!user.EmailConfirmed) // Eğer e-posta doğrulanmamışsa
                    {
                        _userRepository.Delete(user); // Onaylanmamış hesapları siliyoruz
                        _userRepository.SaveChangesAsync();
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
