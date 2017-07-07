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


        public ActionResult usersList()
        {
            var list = UserManager.Users;
            return View(list.ToList());
        }

        public ActionResult Index()
        {
            return View();
        }


        public async Task<ActionResult> userDelete(string id)
        {
            var user = await UserManager.FindByIdAsync(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            UserManager.Delete(user);
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> userEdit(string Id)
        {
            ApplicationUser user = await UserManager.FindByIdAsync(Id);
            if (user != null)
            {
                AdminEditModel model = new AdminEditModel { userName = user.UserName, Email = user.Email, Id = user.Id };
                return View(model);
            }
            return View("Index");
        }

        [HttpPost]
        public async Task<ActionResult> userEdit(AdminEditModel model)
        {
            ApplicationUser user = await UserManager.FindByIdAsync(model.Id);
            if (user != null)
            {
                user.Email = model.Email;
                user.UserName = model.userName;
                var resultUpdate = await UserManager.UpdateAsync(user);
                if (resultUpdate.Succeeded && model.password != null)
                {
                    UserManager.RemovePassword(user.Id);
                    UserManager.AddPassword(user.Id, model.password);
                }

                return RedirectToAction("Index");
            }
            return View();
        }

        public ActionResult userCreate()
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
        public async Task<ActionResult> userCreate(AdminCreateViewModel model)
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
                    
                    return RedirectToAction("Index");
                }
                else
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }
            }
            return RedirectToAction("Index");
        }
    }
}
