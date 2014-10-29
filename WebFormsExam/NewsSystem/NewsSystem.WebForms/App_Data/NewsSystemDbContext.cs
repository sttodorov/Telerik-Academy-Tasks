using Microsoft.AspNet.Identity.EntityFramework;
using NewsSystem.WebForms.Data.Migrations;
using NewsSystem.WebForms.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsSystem.WebForms.Data
{
    public class NewsSystemDbContext : IdentityDbContext<ApplicationUser>, INewsSystemContext
    {
        public NewsSystemDbContext()
            : base("NewsSystemConnectionString", throwIfV1Schema: false)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<NewsSystemDbContext, Configuration>());
        }

        public IDbSet<Category> Categories { get; set; }

        public IDbSet<Article> Articles { get; set; }

        public IDbSet<Like> Likes { get; set; }

        public IDbSet<T> SetEntity<T>() where T : class
        {
            return base.Set<T>();
        }

        //public int SaveChanges()
        //{
        //    return base.SaveChanges();
        //}

        public static NewsSystemDbContext Create()
        {
            return new NewsSystemDbContext();
        }
    }
}
