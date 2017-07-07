using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace WebApplication1.Models
{
    public class VacancyContext : DbContext
    {
        public VacancyContext() : base ("VacancyDb")
        {

        }
        public DbSet<Vacancy> vacancies { get; set;}

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}