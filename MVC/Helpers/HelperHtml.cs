using System.Web.Mvc;

namespace Helpers
{
    public static class HelperHtml
    {
        public static MvcHtmlString CustomActionLink(this HtmlHelper helper, string descricao, string action, string controller, string classCss)
        {
            return new MvcHtmlString($"<a href='/{controller}/{action}'><i class='{classCss}'></i> {descricao}</a>");
        }

    }
}