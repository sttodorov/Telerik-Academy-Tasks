namespace NewsSystem.WebForms.Services
{
    using System.Data;
    using System.Linq;

    using NewsSystem.WebForms.Models;
    using Error_Handler_Control;

    public class CategoryService : Service
    {
        public IQueryable GetAll()
        {
            var categories = this.Data.Categories.All();
            return categories;
        }

        public DataTable GetAllAsDataTable()
        {
            var categories = this.Data.Categories.All();

            return this.IQueryableToDataTable(categories);
        }

        public void Add(string name)
        {
            if (name == null)
            {
                ErrorSuccessNotifier.AddErrorMessage("Category name is required!");
                return;
            }
            var createdCategory = new Category { Name = name };

            this.Data.Categories.Add(createdCategory);
            this.Data.SaveChanges();
        }
        public void UpdateCategory(string name, int id)
        {
            if (name == null)
            {
                ErrorSuccessNotifier.AddErrorMessage("Category name is required!");
                return;
            }
            var selectedCategory = this.Data.Categories.All().FirstOrDefault(c => c.Id == id);
            selectedCategory.Name = name;
            this.Data.SaveChanges();
        }

        public void Delete(int Id)
        {
            this.Data.Categories.Delete(new Category { Id = Id });
            this.Data.SaveChanges();
        }

        public override DataTable IQueryableToDataTable(IQueryable caetgories)
        {
            var dataTable = new DataTable();

            dataTable.Columns.Add("ID");
            dataTable.Columns.Add("Name");

            foreach (Category caetgory in caetgories)
            {
                var row = dataTable.NewRow();

                row["ID"] = caetgory.Id;
                row["Name"] = caetgory.Name;

                dataTable.Rows.Add(row);
            }

            return dataTable;
        }

    }
}