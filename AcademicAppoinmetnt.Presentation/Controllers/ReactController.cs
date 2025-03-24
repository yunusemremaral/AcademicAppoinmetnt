using Microsoft.AspNetCore.Mvc;

namespace AcademicAppointment.Presentation.Controllers
{
    public class ReactController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }

}
