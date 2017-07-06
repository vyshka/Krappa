using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    
    public class AdminController : Controller
    {
        private ApplicationUserManager UserManager
        {
            get
            {
                return HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }


        public ActionResult Index()
        {
            var list = UserManager.Users;
            return View(list.ToList());
        }


        public async Task<ActionResult> Delete(string id)
        {
            var user = await UserManager.FindByIdAsync(id);
            if(user == null)
            {
                return HttpNotFound();
            }
            UserManager.Delete(user);
            return View("Index");
        }

        public async Task<ActionResult> Edit(string Id)
        {
            ApplicationUser user = await UserManager.FindByIdAsync(Id);
            var roleId = await UserManager.GetRolesAsync(Id);
            if (user != null)
            {
                AdminEditModel model = new AdminEditModel { userName = user.UserName, Email = user.Email};
                return View(model);
            }
            return View();
        }
    }
}