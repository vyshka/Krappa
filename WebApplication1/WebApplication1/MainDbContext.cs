using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using WebApplication1.Models;

namespace WebApplication1
{
    public class MainDbContext : DbContext
    {
        public MainDbContext () : base("IdentityDb")
        {
        }
        public DbSet<Vacancies> Vacancies { get; set; }
    }
}