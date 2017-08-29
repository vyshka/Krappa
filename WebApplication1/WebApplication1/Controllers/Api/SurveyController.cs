using System.Collections.Generic;
using System.Linq;
using WebApplication1.Models;
using System.Web.Http;
using System.Data.Entity;
using System.Threading;
using System;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class SurveyController : ApiController
    {
        private ApplicationContext db = new ApplicationContext();

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public bool DeleteSurvey(int id)
        {
            //var survey = db.Surveys.Include(s => s.Questions);
            var survey = db.Surveys.Find(id);
            if (survey == null)
            {
                return false;
            }

            var questionsTodelete = db.Questions.Where(q => q.Survey.Id == survey.Id);
            foreach (var question in questionsTodelete)
            {
                db.Options.RemoveRange(db.Options.Where(o => o.Question.Id == question.Id));

            }
            

            var resultsToDelete = db.Results.Where(r => r.Survey.Id == survey.Id);

            foreach (var result in resultsToDelete)
            {
                db.Answers.RemoveRange(db.Answers.Where(a => a.Result.Id == result.Id));
            }


            db.Questions.RemoveRange(questionsTodelete);
            db.Results.RemoveRange(resultsToDelete);



            db.Surveys.Remove(survey);
            db.SaveChanges();
            return true;
        }



        public IEnumerable<Survey> GetAllSurveys()
        {
            var Qlist = db.Surveys.ToList();
            var Alist = Qlist.SelectMany(p => p.Questions).ToList();
            return Qlist;
        }


        public Survey GetSurveyById(int id)
        {
            var survey = db.Surveys.Find(id);

            return survey;
        }


        [Authorize(Roles = "Admin")]
        public int CreateSurvey(Survey model)
        {
            if (ModelState.IsValid)
            {
                var Survey = db.Surveys.Create();
                Survey.Name = model.Name;
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


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public bool UpdateSurvey(Survey model) //if answer[index].id == null answer.Question = ...
        {

            var original = db.Surveys
                                .Include(x => x.Questions)
                                .Single(c => c.Id == model.Id);

            if (original != null)
            {
                db.Entry(original).CurrentValues.SetValues(model);
                var modelOptions = new List<Option>();
                var originalOptions = new List<Option>();


                foreach (var originalQuestion in original.Questions.ToList())   //list of questions from db
                {
                    foreach (var originalOption in originalQuestion.Options.ToList())
                    {
                        originalOptions.Add(originalOption);
                    }

                }

                foreach (var modelQuestion in model.Questions.ToList())     //list of questions from input model
                {

                    foreach (var modelOption in modelQuestion.Options.ToList())
                    {
                        modelOptions.Add(modelOption);
                    }

                }

                foreach (var dbQuestion in original.Questions.ToList())     //remove options, qeustions that doesnot exist
                {

                    foreach (var dbOption in dbQuestion.Options.ToList())
                    {
                        if (!modelOptions.Any(a => a.Id == dbOption.Id))
                        {
                            db.Options.Remove(dbOption);
                        }
                    }

                    if (!model.Questions.Any(s => s.Id == dbQuestion.Id))
                    {
                        db.Questions.Remove(dbQuestion);
                    }
                }



                foreach (var question in model.Questions)        //update questions, options if they are already exist or add if not
                {

                    var dbQuestion = original.Questions.SingleOrDefault(q => q.Id == question.Id);
                    if (dbQuestion != null)
                    {
                        var dbQuestionType = db.QuestionTypes.Where(qt => qt.Type == question.QuestionType.Type).ToList()[0];
                        dbQuestion.QuestionType = dbQuestionType;
                        db.Entry(dbQuestion).CurrentValues.SetValues(question);
                    }
                    else
                    {
                        original.Questions.Add(question);
                    }



                    foreach (var option in question.Options)
                    {
                        var dbAnswers = originalOptions.SingleOrDefault(a => a.Id == option.Id);

                        if (dbAnswers != null)
                        {
                            db.Entry(dbAnswers).CurrentValues.SetValues(option);
                        }
                        else
                        {
                            option.Question = question;
                            db.Options.Add(option);
                        }

                    }
                }

                original.UpdateTime = DateTime.Now.ToString();
                db.SaveChanges();
                return true;
            }
            return false;
        }



        [Authorize(Roles = "Admin")]
        [HttpGet]
        public SurveyStat GetSurveyStat(string id)
        {
            int Id = Convert.ToInt32(id);
            SurveyStat stat = new SurveyStat();
            var Survey = db.Surveys.Find(Id);
            stat.Name = Survey.Name;
            var questions = db.Questions.Where(q => q.Survey.Id == Id).ToList();
            foreach (var question in questions)
            {
                QuestionStat qStat = new QuestionStat();
                qStat.Text = question.Text;
                var answers = db.Answers.Where(a => a.Question.Id == question.Id).Select(a => a.AnswerText).Distinct().ToList();
                foreach (var answer in answers)
                {
                    var qaCount = db.Answers.Where(a => a.Question.Id == question.Id).Count();
                    var count = db.Answers.Where(a => a.AnswerText == answer).Count();
                    var percent = Convert.ToDouble(count) / Convert.ToDouble(qaCount) * 100;
                    string answerText = "";
                    if (question.QuestionType.Type == "options")
                    {
                        var answersIdArr = answer.Split(';');
                        List<string> answerList = new List<string>();
                        foreach(var answerId in answersIdArr)
                        {
                            var intAnswerId = Convert.ToInt16(answerId);
                            var item = db.Options.Where(o => o.Id == intAnswerId).Select(o => o.Text).ToList()[0];
                            answerList.Add(item); 
                        }
                        answerText = string.Join(", ", answerList.ToArray());

                    }
                    else
                    {
                        answerText = answer;
                    }

                    OptionStat oStat = new OptionStat
                    {
                        Percent = percent,
                        Count = count,
                        Text = answerText
                    };
                    qStat.AnswersStat.Add(oStat);

                }
                stat.QuestionStat.Add(qStat);
            }
            return stat;
        }

    }

}
