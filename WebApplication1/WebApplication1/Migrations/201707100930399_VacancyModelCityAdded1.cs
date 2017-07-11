namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class VacancyModelCityAdded1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Vacancies", "City", c => c.String());
        }
        
        public override void Down()
        {
        }
    }
}
