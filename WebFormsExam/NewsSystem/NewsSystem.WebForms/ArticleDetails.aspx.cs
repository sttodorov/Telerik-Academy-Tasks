namespace NewsSystem.WebForms.Account
{
    using Error_Handler_Control;
    using NewsSystem.WebForms.Models;
    using System;
    using System.Linq;

    using NewsSystem.WebForms.Services;

    using Microsoft.AspNet.Identity;

    public partial class ArticleDetails : BasePage.BasePage
    {
        public Article SelectedArticle;
        private string currentUserId;
        
        protected void Page_Load(object sender, EventArgs e)
        {
            this.currentUserId = User.Identity.GetUserId();
            int articleId = Convert.ToInt32(Request.Params["articleId"]);

            SelectedArticle = this.Data.Articles.All().FirstOrDefault(a => a.Id == articleId);
            if(SelectedArticle==null)
            {
                ErrorSuccessNotifier.AddErrorMessage("No such Article!");
                Response.Redirect("~/Default.aspx");
            }
            
        }


        protected void PositiveVoteBtn_Click(object sender, EventArgs e)
        {
            var articleFromDB = this.Data.Articles.All().FirstOrDefault(a => a.Id == SelectedArticle.Id);
            if (articleFromDB.Likes.Any(l => l.UserId == currentUserId))
            {
                ErrorSuccessNotifier.AddErrorMessage("You can vote only once!");
                Response.Redirect(Request.Url.AbsoluteUri);
            }

            var like = new Like { ArticleId = SelectedArticle.Id, UserId = this.currentUserId, Value = VoteType.Like };
            this.Data.Likes.Add(like);
            articleFromDB.Likes.Add(like);
            articleFromDB.Vote += 1;
            this.Data.SaveChanges();

        }

        protected void NegativeVoteBtn_Click(object sender, EventArgs e)
        {
            var articleFromDB = this.Data.Articles.All().FirstOrDefault(a => a.Id == SelectedArticle.Id);
            if (articleFromDB.Likes.Any(l => l.UserId == currentUserId))
            {
                ErrorSuccessNotifier.AddErrorMessage("You can vote only once!");
                Response.Redirect(Request.Url.AbsoluteUri);
            }

            var disLike = new Like { ArticleId = SelectedArticle.Id, UserId = this.currentUserId, Value = VoteType.Dislike };
            this.Data.Likes.Add(disLike);
            articleFromDB.Likes.Add(disLike);
            articleFromDB.Vote -= 1;
            this.Data.SaveChanges();
        }
    }
}