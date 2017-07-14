﻿using Microsoft.AspNet.Identity.EntityFramework;
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
        // GET: Home
        public ActionResult Index()
        {
            return RedirectToAction("AboutCompany");
        }

        public ActionResult AboutCompany()
        {
            var db = new MainDbContext();
            return View(db.Vacancies.ToList());
        }

        public ActionResult VacancyList()
        {
            var db = new MainDbContext();
            return PartialView(db.Vacancies.ToList());
        }

        public ActionResult AboutUs()
        {
            return PartialView();
        }

        public ActionResult Advans()
        {
            return View();
        }
    }
}