using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class SurveyStat
    {
        public List<QuestionStat> QuestionStat { get; set; }
        
        public string Name { get; set; }

        public SurveyStat()
        {
            this.QuestionStat = new List<QuestionStat>();
        }

    }

    public class QuestionStat
    {
        public string Text { get; set; }
        public List<AnswerStat> AnswersStat { get; set; }
        public QuestionStat()
        {
            this.AnswersStat = new List<AnswerStat>();
        }
    }

    public class AnswerStat
    {
        public string Text { get; set; }
        public int Count { get; set; }
    }

}