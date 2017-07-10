using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Vacancies
    {
        [Key]
        public int vacancyId { get; set; }

        [Display(Name = "Название")]
        public string name { get; set; }

        [Display(Name = "Город")]
        public string City { get; set; }

        [Display(Name = "Ссылка")]
        public string vacancyUrl { get; set; }
    }
}