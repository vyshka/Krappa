using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;

namespace WebApplication1.Models
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime registerTime { get; set; }

        public ApplicationUser()
        {

        }
    }
}