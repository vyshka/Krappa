using System;
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

        public virtual ApplicationUser User { get; set; }

        public virtual Survey Survey { get; set; }

        public virtual ICollection<Answer> Answers { get; set; }

        public string CompleteTime { get; set; }

        public Result()
        {
            this.Answers = new List<Answer>();
        }



    }
}