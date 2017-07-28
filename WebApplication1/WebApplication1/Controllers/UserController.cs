
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

using Westwind.Web.Mvc;


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
