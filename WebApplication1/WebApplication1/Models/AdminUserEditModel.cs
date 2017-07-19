using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class AdminUserEditModel
    {
        [Required(ErrorMessage = "Поле Имя обязательно для заполнения")]
        [Display(Name = "Имя")]
        public string userName { get; set; }

        [Required(ErrorMessage = "Поле Email обязательно для заполнения")]
        [Display(Name = "Email")]
        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                           @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                           @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
                           ErrorMessage = "Неверный форма Email")]
        public string Email { get; set; }

        [StringLength(100, ErrorMessage = "{0} должен быть как минимум {2} символов.", MinimumLength = 6)]
        [Display(Name = "Пароль")]
        [DataType(DataType.Password)]
        public string password { get; set; }

        public string Id { get; set; }
    }
}