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
    [AllowAnonymous]
    public class HomeController : Controller
    {

        private MainDbContext db = new MainDbContext();

        // GET: Home
        public ActionResult Index()
        {
            return RedirectToAction("AboutCompany");
        }

        public ActionResult AboutCompany()
        {
            return View(db.Vacancies.ToList());
        }

        public ActionResult VacancyList()
        {
            return PartialView(db.Vacancies.ToList());
        }
    }
}