using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Authorize(Roles ="Admin")]
    public class VacanciesController : ApiController
    {
        private MainDbContext db = new MainDbContext();

        [HttpGet]
        public IEnumerable<Vacancies> GetAllVacancies()
        {
            Thread.Sleep(1500);
            var temp = db.Vacancies.ToList();
            return (temp);
            
        }


        [HttpGet]
        public IEnumerable<Vacancies> GetAllVacanciesWithSearch(string searchString)
        {
            var list = db.Vacancies.ToList();
            if (!String.IsNullOrEmpty(searchString))
            {
                list = list.Where(s => s.name.Contains(searchString)
                                    || s.City.Contains(searchString)).ToList();
            }
            return (list);

        }

        [HttpDelete]
        public bool DeleteVacancy(int id)
        {
            Thread.Sleep(3000);
            var r = new Random();

            if (r.Next(10)%3 == 0)
            {
                var model = db.Vacancies.Find(id);
                if (model == null)
                {
                    return false;
                }
                db.Vacancies.Remove(model);
                db.SaveChanges();
                return true;
            } else
            {
                return false;
            }
        }

        public bool UpdateVacancy(Vacancies item)
        {
            var original = db.Vacancies.Find(item.vacancyId);
            if(original != null)
            {
                original.name = item.name;
                original.vacancyUrl = item.vacancyUrl;
                original.City = item.City;
                db.SaveChanges();
                return true;
            }
            return false;
        }

        [HttpPost()]
        public Vacancies CreateVacancy(Vacancies item)
        {
            if(ModelState.IsValid)
            {
                var dbVacancy = db.Vacancies.Create();
                dbVacancy.name = item.name;
                dbVacancy.vacancyUrl = item.vacancyUrl;
                dbVacancy.City = item.City;

                db.Vacancies.Add(dbVacancy);
                db.SaveChanges();
                return dbVacancy;
            }
            else
            {
                return null;
            }
            
        }

    }
}
