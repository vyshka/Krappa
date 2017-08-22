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
            var results = db.Results.Where(r => r.User == Id).ToList();
            var user = UserManager.FindById(Id);

            var Result = new UserResults();
            Result.UserName = user.UserName;

            List<SurveyResult> ResultsList = new List<SurveyResult>();
            
            foreach(var result in results)
            {
                var survey = db.Surveys.Find(result.Survey.Id);
                SurveyResult r = new SurveyResult
                {
                    CompliteTime = result.CompliteTime,
                    SurveyName = survey.name,
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
            var user = User.Identity.GetUserId();
            var survey = db.Surveys.Find(model.surveyId);

            result.Survey = survey;
            result.User = user;
            result.CompliteTime = DateTime.Now.ToString();

            foreach(var answerResult in model.AnswersQuestions)
            {
                var dbAnswerResult = db.AnswerQuestionResults.Create();
                var answer = db.Answers.Find(answerResult.answerId);
                var question = db.Questions.Find(answerResult.questionId);
                dbAnswerResult.Answer = answer;
                dbAnswerResult.Question = question;
                db.AnswerQuestionResults.Add(dbAnswerResult);
                db.SaveChanges();
                result.AnswerQuestionResult.Add(dbAnswerResult);
            }
            db.Results.Add(result);
            db.SaveChanges();
        }
    }
}
