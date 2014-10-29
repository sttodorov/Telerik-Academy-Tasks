namespace NewsSystem.WebForms.Data
{
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using NewsSystem.WebForms.Models;

    public interface INewsSystemContext
    {
        IDbSet<Category> Categories { get; set; }

        IDbSet<Article> Articles { get; set; }

        IDbSet<Like> Likes { get; set; }

        IDbSet<T> SetEntity<T>() where T : class;

        DbEntityEntry<T> Entry<T>(T entity) where T : class;

        int SaveChanges();
    }
}
