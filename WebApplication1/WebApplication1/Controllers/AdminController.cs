﻿using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.Owin.Security;

namespace WebApplication1.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private ApplicationUserManager UserManager
        {
            get
            {
                return HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }



        public ActionResult UsersList(string sortOrder, string searchString)
        {
            ViewBag.NameSortParm = sortOrder == "UserName" ? "userName_desc" : "UserName";
            ViewBag.DateSortParm = sortOrder == "registerTime" ? "registerTime_desc" : "Date";
            ViewBag.RegisterTimeSortParm = sortOrder == "email" ? "email_desc" : "Email";

            var list = UserManager.Users;

            if (!String.IsNullOrEmpty(searchString))
            {
                list = list.Where(s => s.UserName.Contains(searchString)
                                    || s.Email.Contains(searchString));
            }

            switch (sortOrder)
            {
                case ("UserName"):
                    {
                        list = list.OrderBy(s => s.UserName);
                        break;
                    }
                case ("userName_desc"):
                    {
                        list = list.OrderByDescending(s => s.UserName);
                        break;
                    }
                case ("email"):
                    {
                        list = list.OrderBy(s => s.Email);
                        break;
                    }
                case ("email_desc"):
                    {
                        list = list.OrderByDescending(s => s.Email);
                        break;
                    }
                case ("registerTime"):
                    {
                        list = list.OrderBy(s => s.registerTime);
                        break;
                    }
                case ("registerTime_desc"):
                    {
                        list = list.OrderByDescending(s => s.registerTime);
                        break;
                    }
            }

            
            return View(list.ToList());
        }

        public ActionResult Index()
        {
            return View();
        }


        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await UserManager.FindByIdAsync(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            UserManager.Delete(user);
            return RedirectToAction("UsersList");
        }

        public async Task<ActionResult> EditUser(string Id)
        {
            ApplicationUser user = await UserManager.FindByIdAsync(Id);
            if (user != null)
            {
                AdminUserEditModel model = new AdminUserEditModel { userName = user.UserName, Email = user.Email, Id = user.Id };
                return View(model);
            }
            return View("UsersList");
        }

        [HttpPost]
        public async Task<ActionResult> EditUser(AdminUserEditModel model)
        {
            ApplicationUser user = await UserManager.FindByIdAsync(model.Id);
            if (user != null)
            {
                user.Email = model.Email;
                user.UserName = model.userName;
                var resultUpdate = await UserManager.UpdateAsync(user);
                if (resultUpdate.Succeeded && model.password != null)
                {
                    var resultRemovePassword = await UserManager.RemovePasswordAsync(user.Id);
                    var resultAddPassword = await UserManager.AddPasswordAsync(user.Id, model.password);
                }

                return RedirectToAction("UsersList");
            }
            return View();
        }

        public ActionResult CreateUser()
        {
            var model = new AdminCreateViewModel
            {
                SelectedRoleId = "0",
                Roles = new SelectList(new[]
                {
                    new SelectListItem { Value = "0", Text = "Администратор" },
                    new SelectListItem { Value = "1", Text = "Пользователь"}
                }, "Value", "Text"
                    )
            };
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser(AdminCreateViewModel model)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser user = new ApplicationUser { UserName = model.userName, Email = model.Email, registerTime = DateTime.Now };
                IdentityResult result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    if(model.SelectedRoleId == "0")
                    {
                        await UserManager.AddToRoleAsync(user.Id, "Admin");
                    }
                    else
                    {
                        await UserManager.AddToRoleAsync(user.Id, "User");
                    }
                    
                    return RedirectToAction("UsersList");
                }
                else
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }
            }
            return RedirectToAction("UsersList");
        }

        public ActionResult VacancyList()
        {
            var db = new MainDbContext();
            return View(db.Vacancies.ToList());
        }

        public ActionResult CreateVacancy()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> CreateVacancy(Vacancies vacancy)
        {
            if(ModelState.IsValid)
            {
                using (var db = new MainDbContext())
                {
                    var dbVacancy = db.Vacancies.Create();
                    dbVacancy.name = vacancy.name;
                    dbVacancy.vacancyUrl = vacancy.vacancyUrl;
                    dbVacancy.City = vacancy.City;

                    db.Vacancies.Add(dbVacancy);
                    var result = await db.SaveChangesAsync();
                }
            }
            return RedirectToAction("VacancyList");
        }

        public ActionResult EditVacancy(int Id)
        {
            using (var db = new MainDbContext())
            {
                var model = new Vacancies();
                model = db.Vacancies.Find(Id);
                return View(model);
            }
        }

        [HttpPost]
        public async Task<ActionResult> EditVacancy(Vacancies vacancy)
        {
            var db = new MainDbContext();
            var original = await db.Vacancies.FindAsync(vacancy.vacancyId);
            if (original != null)
            {
                original.name = vacancy.name;
                original.vacancyUrl = vacancy.vacancyUrl;
                original.City = vacancy.City;

                var resultupdate = await db.SaveChangesAsync();

                return RedirectToAction("VacancyList");
            }
            return View(vacancy);
        }


        public ActionResult DeleteVacancy(int id)
        {
            var db = new MainDbContext();
            var model = db.Vacancies.Find(id);
            if(model == null)
            {
                return HttpNotFound();
            }
            db.Vacancies.Remove(model);
            db.SaveChanges();
            return RedirectToAction("VacancyList");
        }
    }
}
