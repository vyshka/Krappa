using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.IO;
using WebApplication1.Models;
using System.Net.Http.Headers;

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
        public Vacancies GetVacancyById(int id)
        {
            var vacancy = db.Vacancies.Find(id);
            return vacancy;
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
        public Vacancies DeleteVacancy(int id)
        {
            //Thread.Sleep(3000);
            //var r = new Random();
            //if (r.Next(10) % 3 == 0)
            //{  }


            var model = db.Vacancies.Find(id);
            if (model == null)
            {
                return null;
            }
            db.Vacancies.Remove(model);
            db.SaveChanges();
            return model;
        }

        [HttpPost]
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


        [HttpPost]
        public int CreateVacancy(Vacancies item)
        {
            if(ModelState.IsValid)
            {
                var dbVacancy = db.Vacancies.Create();
                dbVacancy.name = item.name;
                dbVacancy.vacancyUrl = item.vacancyUrl;
                dbVacancy.City = item.City;

                db.Vacancies.Add(dbVacancy);
                db.SaveChanges();
                return dbVacancy.vacancyId;
            }
            else
            {
                return 0;
            }
            
        }

    }
}
