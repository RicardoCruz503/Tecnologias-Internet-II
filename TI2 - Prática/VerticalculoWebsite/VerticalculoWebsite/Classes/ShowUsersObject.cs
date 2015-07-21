using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VerticalculoWebsite.Models;

namespace VerticalculoWebsite.Classes
{
    public class ShowUsersObject
    {
        public UserProfile[] UserProfiles {get; set;}
        public string[] Roles { get; set; }
        private RolesContext rdb = new RolesContext();
        public ShowUsersObject(UserProfile[] UserProfiles, webpages_UsersInRoles[] roles)
        {
            this.UserProfiles = UserProfiles;
            List<String> list = new List<String>();
            foreach (webpages_UsersInRoles role in roles)
            {
                list.Add(rdb.webpages_Roles.Find(role.RoleId).RoleName);
            }
            Roles = list.ToArray();
        }
    }
}