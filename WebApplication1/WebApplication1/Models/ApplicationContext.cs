using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using WebApplication1.Models;
using System.Data.Entity;

namespace WebApplication1.Models
{
    public class ApplicationContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationContext() : base("IdentityDb"){}
        
        public static ApplicationContext Create()
        {
            return new ApplicationContext();
        }

        public DbSet<Survey> Surveys { get; set; }

        public DbSet<Vacancies> Vacancies { get; set; }

        public DbSet<Question> Questions { get; set; }

        

    }
}