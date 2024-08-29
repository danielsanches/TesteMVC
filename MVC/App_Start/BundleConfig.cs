using System.Web.Optimization;

namespace MVC
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-2.1.4.js",
                      "~/Scripts/Loading/jquery.blockUI.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.validate.min.js",
                "~/Scripts/jquery.validate.unobtrusive.js",
                "~/Scripts/jquery.validate.unobtrusive.bootstrap.min.js",
                "~/Scripts/SGI/Validation/AddFormValidationError.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrapSwitch").Include(
                      "~/Scripts/bootstrap-switch.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/SGI.css",
                      "~/Content/jQuery.sgiMenu.css"));

            //Awesome
            bundles.Add(new StyleBundle("~/Content/css/awesome").Include("~/Content/font-awesome/font-awesome.css"));
            //Awesome Animation
            bundles.Add(new StyleBundle("~/Content/css/awesomeAnimation").Include("~/Content/font-awesome-animation/font-awesome-animation.min.css"));

            bundles.Add(new StyleBundle("~/Content/css/bootstrapSwitch").Include(
                      "~/Content/bootstrap-switch.css",
                      "~/Content/bootstrap-datepicker.css"));

            bundles.Add(new StyleBundle("~/Content/DataTables").Include(
                "~/Content/jquery.dataTables.min.css",
                "~/Content/dataTables.bootstrap.min.css",
                "~/Content/responsive.bootstrap.min.css",
                "~/Content/responsive.dataTables.min.css",
                "~/Content/select.bootstrap.min.css",
                "~/Content/select.dataTables.min.css"
                ));

            bundles.Add(new StyleBundle("~/Content/css/select2").Include("~/Content/select2/select2.css"));
            bundles.Add(new StyleBundle("~/Content/css/select2Bootstrap").Include("~/Content/select2/select2-bootstrap.css"));

            bundles.Add(new ScriptBundle("~/bundles/DataTables").Include(
                "~/Scripts/dataTables/jquery.dataTables.min.js",
                "~/Scripts/dataTables/dataTables.bootstrap.min.js",
                "~/Scripts/dataTables/dataTables.responsive.min.js",
                "~/Scripts/dataTables/dataTables.select.min.js",
                "~/Scripts/dataTables/dataTables.configuration.js",
                "~/Scripts/dataTables/dataTables.dataptbr.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/select2-js").Include(
                "~/Scripts/Select2/select2.js",
                "~/Scripts/select2-4.0.3/pt-BR.js"));

            bundles.Add(new ScriptBundle("~/bundles/inputmask").Include(
                      "~/Scripts/jquery.maskedinput.min.js"
                      ));

            bundles.Add(new StyleBundle("~/Content/sgi").Include(
                      "~/Content/sgi/default.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/sgi").Include(
                      "~/Scripts/SGI/Util/Funcoes.js"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/datepicker").Include(
                      "~/Scripts/datepicker/bootstrap-datepicker.js",
                      "~/Scripts/datepicker/bootstrap-datepicker.pt-BR.js"
                      ));

            //Stepwizard
            bundles.Add(new StyleBundle("~/Content/css/stepwizard").Include("~/Content/stepwizard/stepwizard.css"));

            bundles.Add(new StyleBundle("~/Content/css/floating-button").Include("~/Content/floating-button/floating-button.css"));
        }
    }
}
