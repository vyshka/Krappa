using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    
    public class HomeController : Controller
    {

        private ApplicationContext db = new ApplicationContext();

        [AllowAnonymous]
        public ActionResult Index()
        {
            return RedirectToAction("AboutCompany");
        }

        [AllowAnonymous]
        public ActionResult AboutCompany()
        {
            return View(db.Vacancies.ToList());
        }


        [AllowAnonymous]
        public ActionResult VacancyList()
        {
            return PartialView(db.Vacancies.ToList());
        }

        [Authorize]
        public ActionResult CompliteSurvey()
        {
            return View();
        }


        [Authorize]
        public ActionResult Survey(int id)
        {
            return View();
        }
    }
}