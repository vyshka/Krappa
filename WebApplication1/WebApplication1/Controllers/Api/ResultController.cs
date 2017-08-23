using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using System.Web;

namespace WebApplication1.Controllers
{
    public class ResultController : ApiController
    {
        ApplicationContext db = new ApplicationContext();
        private ApplicationUserManager UserManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }

        public Result GetResultById(int id)
        {
            var result = db.Results.Where(r => r.Id == id).ToList()[0];
            return result;
        }



        public List<ReturnResultsList> GetResultsCount()
        {
            var ResultsCount =
                db.Results
                    .GroupBy(r => r.Survey.Id)
                    .Select(g => new ReturnResultsList
                    {
                        SurveyId = g.Key,
                        Count = g.Select(r => r.Survey).Count()
                    });
            var ret = ResultsCount.ToList();

            return ret;
        }

        public class ReturnResultsList
        {
            public int SurveyId { get; set; }
            public int Count { get; set; }
        }

        public UserResults GetResultsByUserId(string Id)
        {
            var User = UserManager.FindById(Id);
            var results = db.Results.Where(r => r.User == User).ToList();
            var user = UserManager.FindById(Id);

            var Result = new UserResults();
            Result.UserName = user.UserName;

            List<SurveyResult> ResultsList = new List<SurveyResult>();
            
            foreach(var result in results)
            {
                var survey = db.Surveys.Find(result.Survey.Id);
                SurveyResult r = new SurveyResult
                {
                    CompleteTime = result.CompleteTime,
                    SurveyName = survey.Name,
                    id = result.Id
                };
                ResultsList.Add(r);
            }
            Result.Results = ResultsList;

            return Result;
        }

        public void SaveResult([FromBody] ResultModel model)
        {
            var result = db.Results.Create();
            var userId = User.Identity.GetUserId();
            var user = UserManager.FindById(userId);
            var survey = db.Surveys.Find(model.surveyId);

            result.Survey = survey;
            result.User = user;
            result.CompleteTime = DateTime.Now.ToString();

            foreach(var answerResult in model.AnswersQuestions)
            {
                var dbAnswer = db.Answers.Create();
                var question = db.Questions.Find(answerResult.questionId);
                dbAnswer.Question = question;
                dbAnswer.Result = result;
                dbAnswer.AnswerText = answerResult.Text;

                db.SaveChanges();
                result.Answers.Add(dbAnswer);
            }
            db.Results.Add(result);
            db.SaveChanges();
        }
    }
}
