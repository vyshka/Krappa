using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace WebApplication1.Models
{
    public class Question
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Text { get; set; }

        public virtual ICollection<Option> Options { get; set; }

        public virtual Survey Survey { get; set; }

        public int Order { get; set; }

        public virtual QuestionType QuestionType { get; set; }

        public Question()
        {
            this.Options = new List<Option>();
        }

    }
}