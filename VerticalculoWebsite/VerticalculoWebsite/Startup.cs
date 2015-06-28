using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VerticalculoWebsite.Startup))]
namespace VerticalculoWebsite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
