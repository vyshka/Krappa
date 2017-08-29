using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class ResultModel
    {
        public int Id { get; set; }
        public int surveyId { get; set; }

        public QuestionAnswer[] AnswersQuestions { get; set; }
        
    }

    public class QuestionAnswer
    {
        public int questionId { get; set; }

        public string Text { get; set; }
    }

}