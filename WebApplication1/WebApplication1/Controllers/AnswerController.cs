using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class AnswerController : ApiController
    {
        private ApplicationContext db = new ApplicationContext();


        [HttpGet]
        public Answer CreateAnswer(int id)
        {
            var Answer = db.Answers.Create();
            var Question = db.Questions.Find(id);
            Answer.Text = "";
            Answer.Question = Question;
            db.Answers.Add(Answer);
            db.SaveChanges();
            return Answer;
        }
    }
}
