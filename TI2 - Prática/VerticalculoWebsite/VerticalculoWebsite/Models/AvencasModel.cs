using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace VerticalculoWebsite.Models
{
    public class AvencasContext : DbContext
    {
        public AvencasContext() : base("DefaultConnection"){

        }

        public DbSet<AvencasEntity> AvencaProfiles { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
    }

    [Table("AvencasEntity")]
    public class AvencasEntity
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int AvencaId { get; set; }

        [ForeignKey("userprofileClient")]
        public int? ClientId { get; set; }

        [ForeignKey("userprofileContab")]
        public int? ContabId { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "A {0} tem de ter pelo menos {2} caracteres.", MinimumLength = 10)]
        public string Descricao { get; set; }

        [Required]
        public float Valor { get; set; }

        [Required]
        public DateTime DataAvenca { get; set; }

        [DefaultValue("Por Pagar")]
        public string EstadoPagamento { get; set; }

        public DateTime DataPagamento { get; set; }

        [DefaultValue(false)]
        public bool AvisoPagamento { get; set; }

        public virtual UserProfile userprofileClient { get; set; }
        public virtual UserProfile userprofileContab { get; set; }
    }
}