﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class QuestionController : ApiController
    {

        private ApplicationContext db = new ApplicationContext();

        [HttpGet]
        public Question CreateQuestion(int id)
        {

            var Question = db.Questions.Create();
            var Survey = db.Surveys.Find(id);
            var QuestionType = db.QuestionTypes.Find(1);
            Question.Text = "";
            Question.Survey = Survey;
            Question.QuestionType = QuestionType;
            Survey.Questions.Add(Question);
            db.SaveChanges();

            return Question;
        }
    }
}
