using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.AspNet.Identity;
namespace NewsSystem.WebForms.Account
{
    public partial class Articles1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.ArticlesDataList.InsertParameters.Clear();
            this.ArticlesDataList.InsertParameters.Add("currentUserId", this.User.Identity.GetUserId());
        }
    }
}