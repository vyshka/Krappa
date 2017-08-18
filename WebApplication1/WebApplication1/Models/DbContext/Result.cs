﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Result
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public virtual string User { get; set; }

        public virtual Survey Survey { get; set; }

        public virtual ICollection<AnswerQuestionResult> AnswerQuestionResult { get; set; }

        public string CompliteTime { get; set; }

        public Result()
        {
            this.AnswerQuestionResult = new List<AnswerQuestionResult>();
        }



    }
}