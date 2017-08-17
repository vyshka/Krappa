using Microsoft.AspNet.Identity;
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
using PagedList;
using System.Configuration;
using System.Data.Entity.Validation;

namespace WebApplication1.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {

        private ApplicationUserManager UserManager
        {
            get
            {
                return HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }

        private ApplicationContext db = new ApplicationContext();

        public ActionResult EditSurvey(int id)
        {
            return View();
        }

        public ActionResult Stat(int id)
        {
            return View();
        }
        public ActionResult CreateSurvey()
        {
            var newSurvey = db.Surveys.Create();
            db.Surveys.Add(newSurvey);
            db.SaveChanges();
            return RedirectToAction("EditSurvey", new { id = newSurvey.Id });
        }


        public ActionResult SurveyList()
        {
            return View();
        }

        public ActionResult UsersList(string sortOrder, string currentFilter, string searchString, int? page)
        {
            ViewBag.CurrentSort = sortOrder;
            ViewBag.NameSortParm = sortOrder == "UserName" ? "userName_desc" : "UserName";
            ViewBag.EmailSortParm = sortOrder == "Email" ? "email_desc" : "Email";
            ViewBag.RegisterTimeSortParm = sortOrder == "RegisterTime" ? "registerTime_desc" : "RegisterTime";

            var list = UserManager.Users.ToList();
            ViewBag.TotalCount = list.Count;


            if (searchString != null)
            {
                page = 1;
            }
            else
            {
                searchString = currentFilter;
            }


            if (!String.IsNullOrEmpty(searchString))
            {
                list = list.Where(s => s.UserName.Contains(searchString)
                                    || s.Email.Contains(searchString)).ToList();
            }

            ViewBag.CurrentFilter = searchString;

            switch (sortOrder)
            {
                case ("UserName"):
                    {
                        list = list.OrderBy(s => s.UserName).ToList();
                        break;
                    }
                case ("userName_desc"):
                    {
                        list = list.OrderByDescending(s => s.UserName).ToList();
                        break;
                    }
                case ("Email"):
                    {
                        list = list.OrderBy(s => s.Email).ToList();
                        break;
                    }
                case ("email_desc"):
                    {
                        list = list.OrderByDescending(s => s.Email).ToList();
                        break;
                    }
                case ("RegisterTime"):
                    {
                        list = list.OrderBy(s => s.registerTime).ToList();
                        break;
                    }
                case ("registerTime_desc"):
                    {
                        list = list.OrderByDescending(s => s.registerTime).ToList();
                        break;
                    }
            }
            int pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["pageSize"].ToString());
            int pageNumber = (page ?? 1);
            return View(list.ToPagedList(pageNumber, pageSize));
        }

        public ActionResult SurveyTemplates()
        {
            return View();
        }

        public ActionResult GetUserById(string id)
        {
            var user = UserManager.FindById(id);
            UserViewModel model = new UserViewModel();
            model.Email = user.Email;
            model.Id = user.Id;
            model.userName = user.UserName;

            return PartialView(user);
        }

        public ActionResult VacancyList(string sortOrder, string currentFilter, string searchString, int? page)
        {
            ViewBag.CurrentSort = sortOrder;

            ViewBag.NameSortParm = sortOrder == "name" ? "name_desc" : "name";
            ViewBag.CitySortParm = sortOrder == "City" ? "City_desc" : "City";

            var list = db.Vacancies.ToList();

            ViewBag.TotalCount = list.Count;


            if (searchString != null)
            {
                page = 1;
            }
            else
            {
                searchString = currentFilter;
            }

            if (!String.IsNullOrEmpty(searchString))
            {
                list = list.Where(s => s.Name.Contains(searchString)
                                    || s.City.Contains(searchString)).ToList();
            }

            ViewBag.CurrentFilter = searchString;

            switch (sortOrder)
            {
                case ("name"):
                    {
                        list = list.OrderBy(s => s.Name).ToList();
                        break;
                    }
                case ("name_desc"):
                    {
                        list = list.OrderByDescending(s => s.Name).ToList();
                        break;
                    }
                case ("City"):
                    {
                        list = list.OrderBy(s => s.City).ToList();
                        break;
                    }
                case ("City_desc"):
                    {
                        list = list.OrderByDescending(s => s.City).ToList();
                        break;
                    }
            }

            int pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["pageSize"].ToString());
            int pageNumber = (page ?? 1);
            return View(list.ToPagedList(pageNumber, pageSize));
        }

        public ActionResult Index()
        {
            return View();
        }



        public ActionResult EditUser(AdminUserEditModel model)
        {
            ApplicationUser user = UserManager.FindById(model.Id);
            if (user != null)
            {
                user.Email = model.Email;
                user.UserName = model.userName;
                var resultUpdate = UserManager.Update(user);
                if (resultUpdate.Succeeded && model.password != null)
                {
                    UserManager.RemovePassword(user.Id);
                    UserManager.AddPassword(user.Id, model.password);
                }
                return View(user);
            }
            return null;
        }

        public ActionResult CreateUser()
        {
            var model = new AdminCreateUserModel
            {
                SelectedRoleId = "0"
            };
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser(AdminCreateUserModel model)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser user = new ApplicationUser { UserName = model.userName, Email = model.Email, registerTime = DateTime.Now };
                IdentityResult result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    if (model.SelectedRoleId == "0")
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



        public ActionResult CreateVacancy()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> CreateVacancy(Vacancies vacancy)
        {
            if(ModelState.IsValid)
            {
                var dbVacancy = db.Vacancies.Create();
                dbVacancy.Name = vacancy.Name;
                dbVacancy.Url = vacancy.Url;
                dbVacancy.City = vacancy.City;

                db.Vacancies.Add(dbVacancy);
                var result = await db.SaveChangesAsync();
            }
            return RedirectToAction("VacancyList");
        }

        public ActionResult EditVacancy(int Id)
        {
            var model = new Vacancies();
            model = db.Vacancies.Find(Id);
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> EditVacancy(Vacancies vacancy)
        {
            var original = await db.Vacancies.FindAsync(vacancy.Id);
            if (original != null)
            {
                original.Name = vacancy.Name;
                original.Url = vacancy.Url;
                original.City = vacancy.City;

                var resultupdate = await db.SaveChangesAsync();

                return RedirectToAction("VacancyList");
            }
            return View(vacancy);
        }


        public ActionResult DeleteVacancy(int id)
        {
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
