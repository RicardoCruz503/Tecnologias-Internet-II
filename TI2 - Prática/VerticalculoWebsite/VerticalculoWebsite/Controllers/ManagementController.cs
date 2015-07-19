using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using VerticalculoWebsite.Models;
using WebMatrix.WebData;

namespace VerticalculoWebsite.Controllers
{
    public class ManagementController : Controller
    {
        //
        // GET: /Management/
        
        public ActionResult ManageUsers()
        {
            
            SelectList listRoles = new SelectList(Roles.GetAllRoles(), "Select a Role");
            DbContext db = new DbContext("DefaultConnection");
            string[] listUsernames = db.Database.SqlQuery<String>("SELECT UserName FROM UserProfile").ToArray();
            int[] listUserids = db.Database.SqlQuery<Int32>("SELECT UserId FROM UserProfile").ToArray();
            ViewBag.Usernames = listUsernames;
            ViewBag.Userids = listUserids;
            ViewBag.Roles = listRoles;


            return View();
        }

        public ActionResult SetRoleForUser(string userList, string roleList)
        {
            var currentRole = Roles.GetRolesForUser(userList);
            Roles.RemoveUserFromRoles(userList, currentRole);
            Roles.AddUserToRole(userList, roleList);
            Debug.WriteLine(Roles.GetRolesForUser(userList)[0]);
            return View();
        }

        public ActionResult Delete(string username)
        {
            if (WebSecurity.IsCurrentUser(username))
            {
                WebSecurity.Logout();
            }
            Roles.RemoveUserFromRole(username, Roles.GetRolesForUser(username)[0]);
            ((SimpleMembershipProvider)Membership.Provider).DeleteAccount(username); // deletes record from webpages_Membership table
            ((SimpleMembershipProvider)Membership.Provider).DeleteUser(username, true); // deletes record from UserProfile table
            return View("~/Views/Home/Index.cshtml");
        }

    }
}
