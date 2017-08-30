using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.IO;
using System.Web.Http;
using WebApplication1.Models;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using System.Web;
using System.Net.Http.Headers;

namespace WebApplication1.Controllers
{

    [Authorize(Roles = "Admin")]
    public class ResultController : ApiController
    {
        private ApplicationContext db = new ApplicationContext();
        private ApplicationUserManager UserManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }

        

        [Route("results/{id}")]
        [HttpGet]
        public Result GetResultById(int id)
        {
            var result = db.Results.Where(r => r.Id == id).ToList()[0];
            return result;
        }


        [Route("results/users/{id}")]
        [HttpGet]
        public UserResults GetResultsByUserId(string id)
        {
            var User = db.Users.Find(id);
            var results = db.Results.Where(r => r.User.Id == User.Id).ToList();
            var user = UserManager.FindById(id);
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



        [Route("downloadfile/{id}/{filename}/")]
        [HttpGet]
        public HttpResponseMessage DownloadFile(int id, string filename )
        {
            var root = System.Web.HttpContext.Current.Server.MapPath("~/Files/");
            var path = root + id.ToString() + '/' + filename;

            var stream = new FileStream(path, FileMode.Open);

            HttpResponseMessage response = new HttpResponseMessage();
            
            response.Content = new StreamContent(stream);

            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = filename;

            return response;


        }

        [Route("uploadfile/{id}")]
        [HttpPost]
        public string UploadFile(int id)
        {

            var httpPostedFile = HttpContext.Current.Request.Files["file"];
            var root = System.Web.HttpContext.Current.Server.MapPath("~/Files/");
            root += id.ToString();
            Directory.CreateDirectory(root);
            var path = root + '/' + httpPostedFile.FileName;
            httpPostedFile.SaveAs(path);

            return httpPostedFile.FileName;

        }

        [Route("results")]
        [HttpPost]
        public int CreateResult()
        {
            var result = db.Results.Create();
            var userId = User.Identity.GetUserId();
            var user = db.Users.Find(userId);
            result.User = user;
            db.Results.Add(result);
            db.SaveChanges();
            return result.Id;

        }



        [Route("results")]
        [HttpPut]
        public void SaveResult([FromBody] ResultModel model)
        {

            var result = db.Results.Find(model.Id);
            var userId = User.Identity.GetUserId();
            var user = db.Users.Find(userId);
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
                db.Answers.Add(dbAnswer);
                result.Answers.Add(dbAnswer);
            }
            db.SaveChanges();
        }

    }
}
