namespace NewsSystem.WebForms.Services
{
    using System.Data;
    using System.Linq;

    using NewsSystem.WebForms.Models;
    using Error_Handler_Control;

    public class ArticlesService : Service
    {

        public IQueryable GetMostPopular()
        {
            var articles = this.Data.Articles.All()
                                .OrderByDescending(m => m.Vote)
                                .Take(3);
            return articles;
        }


        public DataTable GetAll()
        {
            var articles = this.Data.Articles.All();

            return this.IQueryableToDataTable(articles);
        }

        public void Add(string title, string content, string currentUserId, int categoryId)
        {
            if (title == null || content == null)
            {
                ErrorSuccessNotifier.AddErrorMessage("Title, Content and Category are requiered!");
                return;
            }

            var createdArticles = new Article { Title = title, Content = content, UserId = currentUserId, CategoryId = categoryId };

            this.Data.Articles.Add(createdArticles);
            this.Data.SaveChanges();
        }
        public void UpdateArticle(string title, string content, int id, int categoryId)
        {
            if (title == null || content == null )
            {
                ErrorSuccessNotifier.AddErrorMessage("Title, Content and Category are requiered!");
                return;
            }
            var selectedArticle = this.Data.Articles.All().FirstOrDefault(c => c.Id == id);
            selectedArticle.Title = title;
            selectedArticle.Content = content;
            selectedArticle.CategoryId = categoryId;
            this.Data.SaveChanges();
        }

        public void Delete(int Id)
        {
            this.Data.Articles.Delete(new Article { Id = Id });
            this.Data.SaveChanges();
        }

        public override DataTable IQueryableToDataTable(IQueryable articles)
        {
            var dataTable = new DataTable();

            dataTable.Columns.Add("ID");
            dataTable.Columns.Add("DateCreated");
            dataTable.Columns.Add("CategoryName");
            dataTable.Columns.Add("CategoryId");
            dataTable.Columns.Add("Title");
            dataTable.Columns.Add("Content");
            dataTable.Columns.Add("Author");
            dataTable.Columns.Add("LikesCount");

            foreach (Article article in articles)
            {
                var row = dataTable.NewRow();

                row["ID"] = article.Id;
                row["DateCreated"] = article.DateCreated;
                row["CategoryName"] = article.Category.Name;
                row["CategoryId"] = article.Category.Id;
                row["Title"] = article.Title;
                row["Content"] = article.Content;
                row["Author"] = article.User.UserName;
                row["LikesCount"] = article.Likes.Count;

                dataTable.Rows.Add(row);
            }

            return dataTable;
        }

    }
}