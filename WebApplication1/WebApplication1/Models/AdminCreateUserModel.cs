using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Models
{
    public class AdminCreateUserModel
    {
        //[Required(ErrorMessage = "Поле Email обязательно для заполнения")]
        //[Display(Name = "Email")]
        //[RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
        //                   @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
        //                   @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
        //                   ErrorMessage = "Неверный форма Email")]
        public string Email { get; set; }

        //[Required(ErrorMessage = "Поле Имя обязательно для заполнения")]
        //[Display(Name = "Имя")]
        public string userName { get; set; }

        //[Required(ErrorMessage = "Поле Пароль обязательно для заполнения")]
        //[Display(Name = "Пароль")]
        //[DataType(DataType.Password)]
        public string Password { get; set; }

        public string SelectedRoleId { get; set; }


    }
}