using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace VerticalculoWebsite.Models
{
    public class NoticiasContext : DbContext
    {
        public NoticiasContext()
            : base("DefaultConnection")
        {
        }

        public DbSet<NoticiasModel> UserProfiles { get; set; }
    }

    public class NoticiasModel
    {

    }
}