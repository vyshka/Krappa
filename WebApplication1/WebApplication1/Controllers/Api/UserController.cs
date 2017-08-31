using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;
using Microsoft.AspNet.Identity.Owin;
using System.Web.Http;
using System.IO;
using System.Web.Routing;

namespace WebApplication1.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserController : ApiController
    {

        private ApplicationUserManager UserManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }

        private ApplicationContext db = new ApplicationContext();


        [Route("users/{id}")]
        [HttpGet]
        public string getUserById(string id)
        {
            var user = UserManager.FindById(id);
            string renderedHTML = RenderViewToString("Admin", "EditUser", user);
            return renderedHTML;
        }



        [Route("users")]
        [HttpGet]
        public IEnumerable<UsersList> getAllUsers()
        {
            List<UsersList> list = new List<UsersList>();
            foreach (var element in UserManager.Users)
            {
                UsersList item = new UsersList(element);
                item.SurveyCount = GetSurveyCount(item.Id);
                list.Add(item);

            }
            return list;
        }


        private int GetSurveyCount(string Id)
        {
            var User = UserManager.FindById(Id);
            var count = db.Results.Where(r => r.User.Id == User.Id).Count();
            return count;
        }

        [Route("users")]
        [HttpPost]
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


        [Route("users/{id}")]
        [HttpDelete]
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



        //?
        [Route("users/{id}")]
        [HttpPost]
        public bool updateUser([FromBody]AdminUserEditModel model, [FromUri]string id)
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
                var fakeControllerContext = new System.Web.Mvc.ControllerContext(new HttpContextWrapper(new HttpContext(new HttpRequest(null, "http://google.com", null), new HttpResponse(null))), routeData, new FakeController());
                var razorViewEngine = new System.Web.Mvc.RazorViewEngine();
                var razorViewResult = razorViewEngine.FindView(fakeControllerContext, viewName, "", false);

                var viewContext = new System.Web.Mvc.ViewContext(
                    fakeControllerContext, 
                    razorViewResult.View, 
                    new System.Web.Mvc.ViewDataDictionary(viewData), 
                    new System.Web.Mvc.TempDataDictionary(), writer);
                razorViewResult.View.Render(viewContext, writer);
                return writer.ToString();
            }
        }

    }

    public class FakeController : System.Web.Mvc.ControllerBase { protected override void ExecuteCore() { } }
}
