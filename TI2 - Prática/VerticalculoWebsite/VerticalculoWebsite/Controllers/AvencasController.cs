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
    public class AvencasController : Controller
    {
        private AvencasConnection adb = new AvencasConnection();
        private RolesContext rdb = new RolesContext();
        private UsersContext udb = new UsersContext();
        //
        // GET: /Avencas/

        public ActionResult ManageAvencas()
        {
            var avencasentity = adb.AvencasEntity.Include(a => a.Cliente).Include(a => a.Contabilista);
            return View(avencasentity.ToList());
        }

        //
        // GET: /Avencas/Details/5

        public ActionResult Details(int id = 0)
        {
            AvencasEntity avencasentity = adb.AvencasEntity.Find(id);
            if (avencasentity == null)
            {
                return HttpNotFound();
            }
            return View(avencasentity);
        }

        //
        // GET: /Avencas/Create

        public ActionResult Create()
        {
            int roleContab = rdb.webpages_Roles.First(r => r.RoleName.Equals("Contabilista")).RoleId;
            int roleCliente = rdb.webpages_Roles.First(r => r.RoleName.Equals("Cliente")).RoleId;

            int[] contabIdArray = rdb.webpages_UsersInRoles.Where(r => r.RoleId.Equals(roleContab)).Select(r => r.UserId).ToArray();
            int[] clienteIdArray = rdb.webpages_UsersInRoles.Where(r => r.RoleId.Equals(roleCliente)).Select(r => r.UserId).ToArray();

            List<UserProfile> clientes = udb.UserProfiles.Where(u => clienteIdArray.Contains(u.UserId)).ToList();
            List<UserProfile> contabs = udb.UserProfiles.Where(u => contabIdArray.Contains(u.UserId)).ToList();

            ViewBag.ClienteId = new SelectList(clientes, "UserId", "UserName");
            ViewBag.ContabilistaId = new SelectList(contabs, "UserId", "UserName");
            return View();
        }

        //
        // POST: /Avencas/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(AvencasEntity avencasentity)
        {
            if (ModelState.IsValid)
            {
                adb.AvencasEntity.Add(avencasentity);
                adb.SaveChanges();
                return RedirectToAction("ManageAvencas");
            }

            ViewBag.ClienteId = new SelectList(adb.UserProfile, "UserId", "UserName", avencasentity.ClienteId);
            ViewBag.ContabilistaId = new SelectList(adb.UserProfile, "UserId", "UserName", avencasentity.ContabilistaId);
            return View(avencasentity);
        }

        //
        // GET: /Avencas/Edit/5

        public ActionResult Edit(int id = 0)
        {
            AvencasEntity avencasentity = adb.AvencasEntity.Find(id);
            if (avencasentity == null)
            {
                return HttpNotFound();
            }
            ViewBag.ClienteId = new SelectList(adb.UserProfile, "UserId", "UserName", avencasentity.ClienteId);
            ViewBag.ContabilistaId = new SelectList(adb.UserProfile, "UserId", "UserName", avencasentity.ContabilistaId);
            return View(avencasentity);
        }

        //
        // POST: /Avencas/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(AvencasEntity avencasentity)
        {
            if (ModelState.IsValid)
            {
                adb.Entry(avencasentity).State = EntityState.Modified;
                adb.SaveChanges();
                return RedirectToAction("ManageAvencas");
            }
            ViewBag.ClienteId = new SelectList(adb.UserProfile, "UserId", "UserName", avencasentity.ClienteId);
            ViewBag.ContabilistaId = new SelectList(adb.UserProfile, "UserId", "UserName", avencasentity.ContabilistaId);
            return View(avencasentity);
        }

        //
        // GET: /Avencas/Delete/5

        public ActionResult Delete(int id = 0)
        {
            AvencasEntity avencasentity = adb.AvencasEntity.Find(id);
            if (avencasentity == null)
            {
                return HttpNotFound();
            }
            return View(avencasentity);
        }

        //
        // POST: /Avencas/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            AvencasEntity avencasentity = adb.AvencasEntity.Find(id);
            adb.AvencasEntity.Remove(avencasentity);
            adb.SaveChanges();
            return RedirectToAction("ManageAvencas");
        }

        protected override void Dispose(bool disposing)
        {
            adb.Dispose();
            base.Dispose(disposing);
        }
    }
}