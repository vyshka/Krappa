using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace WebApplication1.Models
{
    public class SurveyView
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
        public int ResultCount { get; set; }
        public string UpdateTime { get; set; }

        public SurveyView(Survey model, int count)
        {
            this.Id = model.Id;
            this.Name = model.Name;
            this.Questions = model.Questions;
            this.UpdateTime = model.UpdateTime;
            this.ResultCount = count;
        }

    }
}