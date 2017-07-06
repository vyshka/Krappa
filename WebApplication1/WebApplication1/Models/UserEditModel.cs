using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class UserEditModel
    {
        [Display(Name = "Имя")]
        public string userName { get; set; }

        [Display(Name = "Старый пароль")]
        [DataType(DataType.Password)]
        public string oldPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Новый пароль")]
        public string newPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Подтверждение пароля")]
        [Compare("NewPassword", ErrorMessage = "Новый пароль и подтверждение пароля не совпадают")]
        public string confrimPassword { get; set; }
    }
}