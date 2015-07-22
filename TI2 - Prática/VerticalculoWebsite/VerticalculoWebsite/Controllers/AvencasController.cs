using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VerticalculoWebsite.Models;
using WebMatrix.WebData;

namespace VerticalculoWebsite.Controllers
{
    [Authorize]
    public class AvencasController : Controller
    {
        private AvencasConnection adb = new AvencasConnection();
        private RolesContext rdb = new RolesContext();
        private UsersContext udb = new UsersContext();
        //
        // GET: /Avencas/
        [Authorize(Roles="Administrador, Contabilista")]
        public ActionResult ManageAvencas()
        {
            var avencasentity = adb.AvencasEntity.Include(a => a.Cliente).Include(a => a.Contabilista);
            return View(avencasentity.ToList());
        }

        [Authorize(Roles="Cliente")]
        public ActionResult CheckAvencas()
        {
            var avencasentity = adb.AvencasEntity.Where(a => a.ClienteId.Equals(WebSecurity.CurrentUserId)).Include(a => a.Cliente).Include(a => a.Contabilista);
            return View(avencasentity.ToList());
        }

        [Authorize(Roles = "Cliente")]
        public ActionResult AskPayment(int id=0)
        {
            AvencasEntity avenca =  adb.AvencasEntity.Find(id);
            avenca.AvisoPagamento = true;
            adb.SaveChanges();
            return RedirectToAction("CheckAvencas");
        }


        //
        // GET: /Avencas/Create
        [Authorize(Roles="Administrador, Contabilista")]
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
        [Authorize(Roles = "Administrador, Contabilista")]
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
        [Authorize(Roles = "Administrador, Contabilista")]
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
        [Authorize(Roles = "Administrador, Contabilista")]
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
        [Authorize(Roles = "Administrador, Contabilista")]
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
        [Authorize(Roles = "Administrador, Contabilista")]
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