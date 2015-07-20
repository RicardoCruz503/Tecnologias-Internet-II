using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VerticalculoWebsite.Models;

namespace VerticalculoWebsite.Classes
{
    public class EditUserViewObject
    {
        public string userActualRole { get; set; }
        public List<String> allOtherRoles { get; set; }
        public UserProfile userProfile;
        public EditUserViewObject(string userActualRole, List<String> allOtherRoles, UserProfile userProfile)
        {
            this.userActualRole = userActualRole;
            this.allOtherRoles = allOtherRoles;
            this.userProfile = userProfile;
        }
    }
}