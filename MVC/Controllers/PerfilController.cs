using MVC.Model.Perfil;
using System;
using System.Configuration;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using System.Web.UI.WebControls;


namespace MVC.Controllers
{
    public class PerfilController : BaseController
    {
        public ActionResult Index()
        {
            var view = new PerfilViewModel();
            view.ValidarTrocaPerfil(PodeTrocarPerfil(UsuarioLogado.GrupoID));

            return View(view);
        }

        [HttpPost]
        public ActionResult Index(PerfilViewModel view)
        {
            if (GuardarUsuarioComPermissao())
            {
                ConfigurationManager.AppSettings["TXT"] = view.LoginIcms;

                if (EhProducao())
                    System.Web.HttpContext.Current.Session["PODEACESSARSISTEMA"] = false;
            }

            return RedirectToAction("Index", "Home");
        }

        public ActionResult Sair()
        {
            Session.RemoveAll();
            return RedirectToAction("SessaoEncerrada");
        }

        private bool GuardarUsuarioComPermissao()
        {
            bool temPermissao = false;

            if (PodeTrocarPerfil(UsuarioLogado.GrupoID))
            {
                var perfil = new PerfilViewModel(UsuarioLogado.GrupoID);
                perfil.Usuario = UsuarioLogado.LoginAD;
                perfil.GrupoId = UsuarioLogado.GrupoID;
                string txt = perfil.BuscarUsuario(UsuarioLogado.UnidadeID);

                Session["TEMPERMISSAONOPERFIL"] = new object[]
                {
                    true,
                    UsuarioLogado.LoginAD,
                    UsuarioLogado.GrupoID,
                    txt
                };

                temPermissao = true;
            }

            return temPermissao;
        }
    }
}