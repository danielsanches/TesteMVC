using System.Configuration;
using System.Web.Mvc;

namespace MVC.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController() : base() { }

        public ActionResult Index()
        {
            string id = Request.QueryString["id"]?.ToString();
            ObterAutenticacao(id);

            return RedirectToAction("BemVindo");
        }


        public ActionResult BemVindo()
        {
            return View();
        }

        public ActionResult Sair()
        {
            if (Session["TEMPERMISSAONOPERFIL"] != null)
                return ValidarSaida();

            Session.RemoveAll();
            return RedirectToAction("SessaoEncerrada");
        }

        private ActionResult ValidarSaida()
        {
            var objeto = (object[])Session["TEMPERMISSAONOPERFIL"];

            bool temPermissao = (bool)objeto[0];
            string usuario = (string)objeto[1];
            int grupo = (int)objeto[2];
            string txt = (string)objeto[3];

            bool sessaoDifereDoLogado = usuario != UsuarioLogado.LoginAD;

            if (temPermissao && sessaoDifereDoLogado)
            {
                if (PodeTrocarPerfil(grupo) || !EhProducao())
                {
                    ConfigurationManager.AppSettings["TXT"] = txt;
                    Session["TEMPERMISSAONOPERFIL"] = null;
                    return RedirectToAction("Index", "Home");
                }
            }

            Session.RemoveAll();
            return RedirectToAction("SessaoEncerrada");
        }
    }
}