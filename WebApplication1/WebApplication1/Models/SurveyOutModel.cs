using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class SurveyOutModel
    {
        public int Id { get; set; }

        public string name { get; set; }

        public ICollection<QuestionOutModel> Questions { get; set; }

        public SurveyOutModel(Survey item)
        {
            this.Id = item.Id;
            this.name = item.name;
            this.Questions = new List<QuestionOutModel>();
            foreach(var question in item.Questions)
            {
                Questions.Add(new QuestionOutModel(question));
            }
        }
    }
}