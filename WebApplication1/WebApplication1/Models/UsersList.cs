using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class UsersList
    {
        public string Id { get; set; }

        public string userName { get; set; }

        public string Email { get; set; }

        public string registerTime { get; set; }

        public UsersList(ApplicationUser user)
        {
            this.Id = user.Id;
            this.userName = user.UserName;
            this.Email = user.Email;
            this.registerTime = user.registerTime.ToString();
        }
    }
}