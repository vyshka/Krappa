using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class AdminEditModel
    {
        public string userName { get; set; }

        public string Email { get; set; }

        public string password { get; set; }

        public int roleId { get; set; }
    }
}