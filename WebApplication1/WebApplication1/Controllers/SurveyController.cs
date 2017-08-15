using System.Collections.Generic;
using System.Linq;
using WebApplication1.Models;
using System.Web.Http;
using System.Data.Entity;
using System.Threading;

namespace WebApplication1.Controllers
{
    
    public class SurveyController : ApiController
    {
        private ApplicationContext db = new ApplicationContext();
        

        public bool DeleteSurvey(int id)
        {
            var survey = db.Surveys.Find(id);
            if(survey == null)
            {
                return false;
            }
            db.Questions.RemoveRange(db.Questions.Where(x => x.Survey.Id == survey.Id));
            db.Surveys.Remove(survey);
            db.SaveChanges();
            return true;
        }

        public IEnumerable<Survey> GetAllSurveys()
        {
            Thread.Sleep(1500);
            var Qlist = db.Surveys.ToList();
            var Alist = Qlist.SelectMany(p => p.Questions).ToList();

            
            return Qlist;
        }

        public Survey GetSurveyById(int id)
        {
            var survey = db.Surveys.Find(id);
            return survey;
        }

        public int CreateSurvey(Survey model)
        {
            if(ModelState.IsValid)
            {
                var Survey = db.Surveys.Create();
                Survey.name = model.name;
                Survey.Questions = model.Questions;
                db.Surveys.Add(Survey);
                db.SaveChanges();
                return Survey.Id;
            }
            else
            {
                return 0;
            }
        }

        [HttpPost]
        public bool UpdateSurvey(Survey model)
        {

            var original = db.Surveys
                                .Include(x => x.Questions)
                                .Single(c => c.Id == model.Id);


            if (original != null)
            {
                db.Entry(original).CurrentValues.SetValues(model);
                

                foreach(var dbQuestion in original.Questions.ToList())
                {
                    if(!model.Questions.Any(s => s.Id == dbQuestion.Id))
                    {
                        db.Questions.Remove(dbQuestion);
                    }
                }


                foreach(var question in model.Questions)
                {
                    var dbQuestion = original.Questions.SingleOrDefault(q => q.Id == question.Id);
                    if(dbQuestion != null)
                    {
                        db.Entry(dbQuestion).CurrentValues.SetValues(question);
                    }
                    else
                    {
                        original.Questions.Add(question);
                    }
                }
                db.SaveChanges();
                return true;
            }
            return false;
        }

        



    }
}
