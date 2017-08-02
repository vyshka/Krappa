using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;
using Westwind.Web.Mvc;
using System.Threading;
using System.Web.Script.Serialization;

namespace WebApplication1.Controllers
{
    public class UserController : Controller
    {
        private ApplicationUserManager UserManager
        {
            get
            {
                return HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }

        public string getAllUsers()
        {
            Thread.Sleep(1500);
            List<UsersList> list = new List<UsersList>();
            foreach(var element in UserManager.Users)
            {
                UsersList item = new UsersList(element);
                list.Add(item);
            }
            var jsonSerializer = new JavaScriptSerializer();
            var JSONlist = jsonSerializer.Serialize(list);
            return (JSONlist);
        }


        public JsonResult GetUserByid(string id)
        {
            var user = UserManager.FindById(id);

            string userHTML = ViewRenderer.RenderPartialView("Admin/GetUserById", user);
            return Json(userHTML);
        }

        [HttpPost()]
        public async void updateUser(AdminUserEditModel model)
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
            }
        }
    }
}
