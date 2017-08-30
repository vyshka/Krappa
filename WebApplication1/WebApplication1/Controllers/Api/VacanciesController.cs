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
        private ApplicationContext db = new ApplicationContext();


        [Route("vacancies")]
        [HttpGet]
        public IEnumerable<Vacancies> GetAllVacancies()
        {
            Thread.Sleep(1500);
            var temp = db.Vacancies.ToList();
            return (temp);
            
        }


        [Route("vacancies/{id}")]
        [HttpGet]
        public Vacancies GetVacancyById(int id)
        {
            var vacancy = db.Vacancies.Find(id);
            return vacancy;
        }


        [Route("vacancies/{id}")]
        [HttpDelete]
        public Vacancies DeleteVacancy(int id)
        {
            var model = db.Vacancies.Find(id);
            if (model == null)
            {
                return null;
            }
            db.Vacancies.Remove(model);
            db.SaveChanges();
            return model;
        }


        [Route("vacancies")]
        [HttpPut]
        public bool UpdateVacancy(Vacancies item)
        {
            var original = db.Vacancies.Find(item.Id);
            if(original != null)
            {
                original.Name = item.Name;
                original.Url = item.Url;
                original.City = item.City;
                db.SaveChanges();
                return true;
            }
            return false;
        }

        [Route("vacancies")]
        [HttpPost]
        public int CreateVacancy(Vacancies item)
        {
            if(ModelState.IsValid)
            {
                var dbVacancy = db.Vacancies.Create();
                dbVacancy.Name = item.Name;
                dbVacancy.Url = item.Url;
                dbVacancy.City = item.City;

                db.Vacancies.Add(dbVacancy);
                db.SaveChanges();
                return dbVacancy.Id;
            }
            else
            {
                return 0;
            }
            
        }

    }
}
