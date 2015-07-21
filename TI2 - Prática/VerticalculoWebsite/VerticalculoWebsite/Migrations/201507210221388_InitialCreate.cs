namespace VerticalculoWebsite.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.NoticiasEntity",
                c => new
                    {
                        NoticiaId = c.Int(nullable: false, identity: true),
                        Titulo = c.String(nullable: false, maxLength: 100),
                        CorpoNoticia = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.NoticiaId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.NoticiasEntity");
        }
    }
}
