using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using VerticalculoWebsite.Classes;
using VerticalculoWebsite.Filters;
using VerticalculoWebsite.Models;
using WebMatrix.WebData;

namespace VerticalculoWebsite.Controllers
{
    [InitializeSimpleMembership]
    public class ManagementController : Controller
    {
        private UsersContext db = new UsersContext();

        //
        // GET: /Management/

        public ActionResult ManageUsers()
        {
            return View(db.UserProfiles.ToList());
        }

        //
        // GET: /Management/Details/5

        public ActionResult Details(int id = 0)
        {
            UserProfile userprofile = db.UserProfiles.Find(id);
            if (userprofile == null)
            {
                return HttpNotFound();
            }
            return View(userprofile);
        }

        //
        // GET: /Management/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Management/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(UserProfile userprofile)
        {
            if (ModelState.IsValid)
            {
                db.UserProfiles.Add(userprofile);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(userprofile);
        }

        //
        // GET: /Management/Edit/5

        public ActionResult Edit(int id = 0)
        {
            UserProfile userprofile = db.UserProfiles.Find(id);
            //webpages_Roles allOtherRoles = db.Roles.ToList();
            string role = Roles.GetRolesForUser(userprofile.UserName)[0];
            List<String> list = Roles.GetAllRoles().ToList();
            list.Remove(role);

            if (userprofile == null)
            {
                return HttpNotFound();
            }

            
            return View(new EditUserViewObject(role, list, userprofile));
        }

        //
        // POST: /Management/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(UserProfile userprofile)
        {
            if (ModelState.IsValid)
            {
                db.Entry(userprofile).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(userprofile);
        }

        //
        // GET: /Management/Delete/5

        public ActionResult Delete(int id = 0)
        {
            UserProfile userprofile = db.UserProfiles.Find(id);
            if (userprofile == null)
            {
                return HttpNotFound();
            }
            return View(userprofile);
        }

        //
        // POST: /Management/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            UserProfile userprofile = db.UserProfiles.Find(id);
            db.UserProfiles.Remove(userprofile);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}