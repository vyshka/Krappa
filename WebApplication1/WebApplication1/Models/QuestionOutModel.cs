using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class QuestionOutModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public ICollection<string> Answers { get; set; }

        public QuestionOutModel(Question question)
        {
            this.Text = question.Text;
            this.Id = question.Id;
            var AnswersList = question.Answers.Split(',');
            this.Answers = new List<string>();
            foreach(var answer in AnswersList)
            {
                this.Answers.Add(answer);
            }
        }

    }
}