using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class ResultModel
    {
        public int surveyId { get; set; }

        public AnswerQuestion[] AnswersQuestions { get; set; }
        
    }

    public class AnswerQuestion
    {
        public int questionId { get; set; }

        public int answerId { get; set; }
    }

}