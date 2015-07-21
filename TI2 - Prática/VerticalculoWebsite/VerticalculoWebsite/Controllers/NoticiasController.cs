using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VerticalculoWebsite.Models;

namespace VerticalculoWebsite.Controllers
{
    public class NoticiasController : Controller
    {
        private NoticiasContext db = new NoticiasContext();

        //
        // GET: /Default1/

        public ActionResult ManageNoticias()
        {
            return View(db.NoticiasProfiles.ToList());
        }

        public ActionResult Noticias()
        {
            return View();
        }

        //
        // GET: /Default1/Details/5

        public ActionResult Details(int id = 0)
        {
            NoticiasEntity noticiasentity = db.NoticiasProfiles.Find(id);
            if (noticiasentity == null)
            {
                return HttpNotFound();
            }
            return View(noticiasentity);
        }

        //
        // GET: /Default1/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Default1/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(NoticiasEntity noticiasentity)
        {
            if (ModelState.IsValid)
            {
                db.NoticiasProfiles.Add(noticiasentity);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return RedirectToAction("ManageNoticias");
        }

        //
        // GET: /Default1/Edit/5

        public ActionResult Edit(int id = 0)
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
        public ActionResult Edit(NoticiasEntity noticiasentity)
        {
            if (ModelState.IsValid)
            {
                db.Entry(noticiasentity).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(noticiasentity);
        }

        //
        // GET: /Default1/Delete/5

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
        public ActionResult DeleteConfirmed(int id)
        {
            NoticiasEntity noticiasentity = db.NoticiasProfiles.Find(id);
            db.NoticiasProfiles.Remove(noticiasentity);
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