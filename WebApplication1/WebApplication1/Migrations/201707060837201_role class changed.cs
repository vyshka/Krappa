namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class roleclasschanged : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.AspNetRoles", "Description");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetRoles", "Description", c => c.String());
        }
    }
}
