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
            var list = db.Database.SqlQuery<String>("SELECT UserName FROM UserProfile");
            ViewBag.Users = list;
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

    }
}
