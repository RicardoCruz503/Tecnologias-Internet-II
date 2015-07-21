using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Drawing;
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

        public DbSet<NoticiasEntity> NoticiasProfiles { get; set; }
    }

    [Table("NoticiasEntity")]
    public class NoticiasEntity
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int NoticiaId { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "A {0} tem de ter pelo menos {2} caracteres.", MinimumLength = 6)]
        public string Titulo { get; set; }
        [Required]
        [StringLength(5000, ErrorMessage = "A {0} tem de ter pelo menos {2} caracteres.", MinimumLength = 50)]
        public string CorpoNoticia { get; set; }
    }
}