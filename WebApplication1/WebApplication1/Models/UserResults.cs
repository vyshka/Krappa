using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class UserResults
    {
        public ICollection<SurveyResult> Results { get; set; }

        public string UserName { get; set; }

        public UserResults()
        {
            this.Results = new List<SurveyResult>();
        }
    }

    public class SurveyResult
    {

        public int id { get; set; }
        public string SurveyName { get; set; }
        public string CompliteTime { get; set; }
    }

}