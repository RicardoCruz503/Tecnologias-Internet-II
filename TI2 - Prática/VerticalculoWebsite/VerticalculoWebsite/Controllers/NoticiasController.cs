using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VerticalculoWebsite.Classes;
using VerticalculoWebsite.Models;

namespace VerticalculoWebsite.Controllers
{
    [Authorize]
    public class NoticiasController : Controller
    {
        private NoticiasContext db = new NoticiasContext();

        //
        // GET: /Default1/
        [Authorize(Roles = "Administrador")]
        public ActionResult ManageNoticias()
        {
            return View(db.NoticiasProfiles.ToList());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrador")]
        public ActionResult ManageNoticias(string searchName)
        {
            return View(db.NoticiasProfiles.Where(n => n.Titulo.Contains(searchName)).ToList());
        }

        public ActionResult Noticias(int index=1)
        {
            ViewBag.Index = index;
            return View(db.NoticiasProfiles.ToArray().Reverse().ToArray()[index-1]);
        }

        

        //
        // GET: /Default1/Create
        [Authorize(Roles = "Administrador")]
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Default1/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrador")]
        public ActionResult Create(NoticiasEntity noticiasentity, DateTime data)
        {
            if (ModelState.IsValid)
            {
                noticiasentity.data = data;
                noticiasentity.CorpoNoticia = noticiasentity.CorpoNoticia.Replace("*b*", "<b>").Replace("*/b*", "</b>").Replace("*u*", "<u>").Replace("*/u*", "</u>").Replace("*p*", "<p>").Replace("*/p*", "</p>");
                db.NoticiasProfiles.Add(noticiasentity);
                db.SaveChanges();
                return RedirectToAction("ManageNoticias");
            }

            return RedirectToAction("ManageNoticias");
        }

        //
        // GET: /Default1/Edit/5

        [Authorize(Roles = "Administrador")]
        public ActionResult Edit(int id = 1)
        {
            NoticiasEntity noticiasentity = db.NoticiasProfiles.Find(id);
            if (noticiasentity == null)
            {
                return HttpNotFound();
            }
            return View(noticiasentity);
        }

        //
        // POST: /Default1/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrador")]
        public ActionResult Edit(NoticiasEntity noticiasentity)
        {
            if (ModelState.IsValid)
            {
                db.Entry(noticiasentity).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("ManageNoticias");
            }
            return View(noticiasentity);
        }

        //
        // GET: /Default1/Delete/5
        [Authorize(Roles = "Administrador")]
        public ActionResult Delete(int id = 0)
        {
            NoticiasEntity noticiasentity = db.NoticiasProfiles.Find(id);
            if (noticiasentity == null)
            {
                return HttpNotFound();
            }
            return View(noticiasentity);
        }

        //
        // POST: /Default1/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrador")]
        public ActionResult DeleteConfirmed(int id)
        {
            NoticiasEntity noticiasentity = db.NoticiasProfiles.Find(id);
            db.NoticiasProfiles.Remove(noticiasentity);
            db.SaveChanges();
            return RedirectToAction("ManageNoticias");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}