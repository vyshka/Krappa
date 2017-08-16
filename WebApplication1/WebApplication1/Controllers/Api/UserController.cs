using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;
using System.Threading;
using System.Web.Script.Serialization;
using System.Web.Http;
using System.IO;
using System.Web.Routing;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    [System.Web.Mvc.Authorize(Roles = "Admin")]
    public class UserController : ApiController
    {

        private ApplicationUserManager UserManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }

        public UsersList getUserById(string id)
        {
            UsersList user = new UsersList(UserManager.FindById(id));
            string renderedHTML = RenderViewToString("Admin", "EditUser", user);
            return user;
        }

        public IEnumerable<UsersList> getAllUsers()
        {
            Thread.Sleep(1500);
            List<UsersList> list = new List<UsersList>();
            foreach (var element in UserManager.Users)
            {
                UsersList item = new UsersList(element);
                list.Add(item);
            }
            return list;
        }

        public UsersList CreateUser(AdminCreateUserModel model)
        {
            ApplicationUser user = new ApplicationUser { UserName = model.userName, Email = model.Email, registerTime = DateTime.Now };
            var IdentityResult =  UserManager.Create(user, model.Password);
            UsersList userReturn = new UsersList(user);
            if(IdentityResult.Succeeded)
            {
                if (model.SelectedRoleId == "0")
                {
                    UserManager.AddToRole(user.Id, "Admin");
                }
                else
                {
                    UserManager.AddToRole(user.Id, "User");
                }
                return userReturn;
            }
            else
            {
                return null;
            }
            
        }

        public ApplicationUser DeleteUser(string id)
        {
            var user = UserManager.FindById(id);
            if (user == null)
            {
                return null;
            }
            UserManager.Delete(user);
            return user;
        }

        public bool updateUser(AdminUserEditModel model)
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
                return true;
            }
            return false;
        }

        private static string RenderViewToString(string controllerName, string viewName, object viewData)
        {
            using (var writer = new StringWriter())
            {
                var routeData = new RouteData();
                routeData.Values.Add("controller", controllerName);
                var fakeControllerContext = new ControllerContext(new HttpContextWrapper(new HttpContext(new HttpRequest(null, "http://google.com", null), new HttpResponse(null))), routeData, new FakeController());
                var razorViewEngine = new RazorViewEngine();
                var razorViewResult = razorViewEngine.FindView(fakeControllerContext, viewName, "", false);

                var viewContext = new ViewContext(fakeControllerContext, razorViewResult.View, new ViewDataDictionary(viewData), new TempDataDictionary(), writer);
                razorViewResult.View.Render(viewContext, writer);
                return writer.ToString();
            }
        }

    }

    public class FakeController : ControllerBase { protected override void ExecuteCore() { } }
}
