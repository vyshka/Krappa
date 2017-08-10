using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Question
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Text { get; set; }
        public string Answers { get; set; }

        public virtual Survey Survey { get; set; }

        public Question(QuestionOutModel model)
        {
            string ans="";
            foreach(var answer in model.Answers)
            {
                ans += "," + answer;
            }
        }

    }
}