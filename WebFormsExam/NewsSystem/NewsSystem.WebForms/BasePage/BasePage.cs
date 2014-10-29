

namespace NewsSystem.WebForms.BasePage
{
    using System;
    using System.Linq;
    using System.Web.UI;

    using NewsSystem.WebForms.Data;

    public class BasePage : Page
    {
        private INewsSystemData data;

        public BasePage()
        {
            this.Data = new NewsSystemData();
        }

        protected INewsSystemData Data 
        { 
            get 
            {
                return this.data;
            } 
            private set 
            { 
                this.data = value;
            } 
        }
    }
}