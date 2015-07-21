namespace VerticalculoWebsite.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NoticiasProfileChange : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.NoticiasEntity", "data", c => c.DateTime(nullable: false));
            AlterColumn("dbo.NoticiasEntity", "CorpoNoticia", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.NoticiasEntity", "CorpoNoticia", c => c.String(nullable: false, maxLength: 100));
            DropColumn("dbo.NoticiasEntity", "data");
        }
    }
}
