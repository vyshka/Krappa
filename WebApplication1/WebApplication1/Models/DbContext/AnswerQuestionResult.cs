using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web;

namespace WebApplication1.Models
{
    public class AnswerQuestionResult
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public virtual Result Result { get; set; }

        public virtual Question Question { get; set; }

        public virtual Answer Answer { get; set; }


    }
}