using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Authorize(Roles = "Admin")]
    public class OptionController : ApiController
    {
        private ApplicationContext db = new ApplicationContext();

        [Route("question/{id}/option")]
        [HttpPost]
        public Option CreateOption(int id)
        {
            var Option = db.Options.Create();
            var Question = db.Questions.Find(id);
            Option.Text = "";
            Option.Question = Question;
            db.Options.Add(Option);
            db.SaveChanges();
            return Option;
        }
    }
}
