namespace NewsSystem.WebForms.Data
{
    using NewsSystem.WebForms.Data.Repositories;
    using NewsSystem.WebForms.Models;

    public interface INewsSystemData
    {
        IGenericRepository<Category> Categories { get; }

        IGenericRepository<Article> Articles { get; }

        IGenericRepository<Like> Likes { get; }

        void SaveChanges();
    }
}
