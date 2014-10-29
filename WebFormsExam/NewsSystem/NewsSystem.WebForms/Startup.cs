using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(NewsSystem.WebForms.Startup))]
namespace NewsSystem.WebForms
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
