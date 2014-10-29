namespace NewsSystem.WebForms.Services
{
    using System.Data;
    using System.Linq;
    using NewsSystem.WebForms.Data;

    public abstract class Service
    {
        protected INewsSystemData Data { get; set; }

        public Service()
            : this(new NewsSystemData())
        {
        }

        public Service(INewsSystemData data)
        {
            this.Data = data;
        }

        public abstract DataTable IQueryableToDataTable(IQueryable dbData);
    }
}