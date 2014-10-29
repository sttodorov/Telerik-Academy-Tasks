namespace NewsSystem.WebForms.Models
{
    public class Like
    {
        public int Id { get; set; }

        public VoteType Value { get; set; }

        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }

        public int ArticleId { get; set; }

        public virtual Article Article { get; set; }

    }
}
