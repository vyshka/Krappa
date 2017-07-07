using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Vacancies
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int vacancyId { get; set; }
        public string name { get; set; }
        public string vacancyUrl { get; set; }
    }
}