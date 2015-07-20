using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
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
    [Authorize(Roles="Administrador")]
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
                return RedirectToAction("ManageUsers");
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
            UserProfile userprofile = db.UserProfiles.Find(id); //cri-o um userprofile atraves da buscar na bd pelo id fornecido
            RolesContext rdb = new RolesContext(); //crio uma variavel que vai representar outra bd
            webpages_UsersInRoles userinroles = rdb.webpages_UsersInRoles.FirstOrDefault(r => r.UserId.Equals(id)); //Diz respeito a tabela 
            //dos UserRoles ou seja aquela que faz a ligação entre os users e os roles
            //aqui crio uma relação que ira dizer respeito ao primeiro caso que ela encontrar que corresponde a
            //r => r.UserId.Equals(Id) isto é a expressao que vai procurar na bd UsersInRoles por um caso cujo UserID seja igual ao Id
            //fornecido
            rdb.webpages_UsersInRoles.Remove(userinroles); //removo da tabela UsersInRoles o tal caso
            rdb.SaveChanges(); //guardo as alterações
            db.UserProfiles.Remove(userprofile); //removo o userprofile da tabela UserProfiles
            db.SaveChanges(); //guardo alterações
            return RedirectToAction("ManageUsers"); //fim
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}