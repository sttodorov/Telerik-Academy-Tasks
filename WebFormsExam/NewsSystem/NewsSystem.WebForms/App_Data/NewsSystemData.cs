using NewsSystem.WebForms.Data.Repositories;
using System;
using System.Collections.Generic;
using NewsSystem.WebForms.Models;

namespace NewsSystem.WebForms.Data
{
    public class NewsSystemData: INewsSystemData
    {
        private INewsSystemContext context;

        private IDictionary<Type, object> repositories;

        public NewsSystemData()
            :this(new NewsSystemDbContext())
        {

        }

        public NewsSystemData(INewsSystemContext context)
        {
            this.context = context;
            this.repositories = new Dictionary<Type, object>();
        }

        public IGenericRepository<ApplicationUser> Users
        {
            get
            {
                return this.GetRepository<ApplicationUser>();
            }
        }

        public IGenericRepository<Category> Categories
        {
            get
            {
                return this.GetRepository<Category>();
            }
        }

        public IGenericRepository<Article> Articles
        {
            get
            {
                return this.GetRepository<Article>();
            }
        }

        public IGenericRepository<Like> Likes
        {
            get
            {
                return this.GetRepository<Like>();
            }
        }

        public void SaveChanges()
        {
            this.context.SaveChanges();
        }

        private IGenericRepository<T> GetRepository<T>() where T : class
        {
            var typeOfModel = typeof(T);
            if (!this.repositories.ContainsKey(typeOfModel))
            {
                var type = typeof(GenericRepository<T>);

                this.repositories.Add(typeOfModel, Activator.CreateInstance(type, this.context));
            }

            return (IGenericRepository<T>)this.repositories[typeOfModel];
        }
    }
}
