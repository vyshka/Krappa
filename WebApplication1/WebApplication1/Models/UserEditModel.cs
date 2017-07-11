using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class UserEditModel
    {

        [Required(ErrorMessage = "Поле Имя обязательно для заполнения")]
        [Display(Name = "Имя")]
        public string userName { get; set; }

        [Display(Name = "Старый пароль")]
        [DataType(DataType.Password)]
        public string oldPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Новый пароль")]
        [StringLength(100, ErrorMessage = "{0} должен быть как минимум {2} символов.", MinimumLength = 6)]
        public string newPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Подтверждение пароля")]
        [Compare("newPassword", ErrorMessage = "Новый пароль и подтверждение пароля не совпадают")]
        public string confrimPassword { get; set; }
    }
}