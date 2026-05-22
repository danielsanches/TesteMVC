using MVC.Model.PortalICMS;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC.Controllers
{
    public class BaseController : Controller
    {
        protected string DiretorioVirtual => this.HttpContext.Request.ApplicationPath != "/" ? this.HttpContext.Request.ApplicationPath : string.Empty;

        protected UsuarioJson UsuarioLogado
        {
            get { return System.Web.HttpContext.Current.Session == null ? null : (UsuarioJson)System.Web.HttpContext.Current.Session["USUARIOLOGADO"]; }
            set { System.Web.HttpContext.Current.Session["USUARIOLOGADO"] = value; }
        }

        /// <summary>
        /// Valida por grupoId quem pode trocar o perfil.
        /// </summary>
        /// <param name="grupoId"></param>
        /// <returns></returns>
        public bool PodeTrocarPerfil(int grupoId)
        {
            //Esse grupo pode trocar de perfil?
                
            return true;
        }

        protected bool EhProducao()
        {
            return ConfigurationManager.AppSettings["APPAMBIENTE"] == "Producao";
        }

        protected override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (UsuarioLogado != null)
                MontarMenuPrincipalIF();
        }

        private void SessaoUsuarioExibir()
        {
            System.Web.HttpContext.Current.Session["SESSIONUSUARIO"] = new string[]
            {
                UsuarioLogado.Nome,
                UsuarioLogado.LoginAD,
                UsuarioLogado.Nome.Split(' ').GetValue(0).ToString(),
                UsuarioLogado.NomeUnidade,
                UsuarioLogado.NomeEstrutura,
                UsuarioLogado.NomeGrupo
            };
        }

        public void MontarMenuPrincipalIF()
        {
            TempData["MENUPRINCIPAL"] = this.MontarMenuBootStrap();
            TempData["USUARIOPRINCIPAL"] = new string[] { UsuarioLogado.Nome, UsuarioLogado.Nome.Split(' ')[0], UsuarioLogado.Matricula, UsuarioLogado.NomeEstrutura };

            SessaoUsuarioExibir();
            MenuICMS();
        }

        private void MenuICMS()
        {
            var menu = TempData["MENUPRINCIPAL"].ToString().Substring(123);

            TempData["MENUPRINCIPAL"] = menu.Replace("nav", "nav navbar-nav").Replace("<a role=\"menuitem\" href=\"#\">", "<a class=\"menu\" tabindex=\" - 1\" href=\"#\">").Replace("<a role=\"menuitem\" href=\" /", "<a tabindex=\" - 1\" href=\"/");
        }

        private string MontarMenuBootStrap()
        {
            var menu = new System.Text.StringBuilder();
            menu.Append("<script type=\"text/javascript\">jQuery(document).ready(function () {jQuery('.js-activated').dropdownHover(true);});</script>");
            menu.Append("<ul class=\"nav\">");

            var sistema = Convert.ToInt32(ConfigurationManager.AppSettings["CODIGODOSISTEMA"]);

            var arvoreMenu = UsuarioLogado.ArvoreMenu;

            foreach (var item in arvoreMenu)
            {
                if (item.ArvoreDeMenu.Count > 0 && item.Nome != "Incentivos")
                {
                    var menuItensOrdenados = item.ArvoreDeMenu.OrderBy(i => i.Nome).ToList();

                    menu.Append("<li class=\"dropdown\">");
                    menu.Append(" <a href=\"#\" class=\"dropdown-toggle js-activated\" rule=\"button\" data-toggle=\"dropdown\">" + item.Nome + " <b class=\"caret\"></b></a> ");

                    MontaMenuRecursivoBootStrap(ref menu, menuItensOrdenados);

                    menu.Append("</li>");
                }
            }

            menu.Append("</ul>");

            return menu.ToString();
        }

        private void MontaMenuRecursivoBootStrap(ref System.Text.StringBuilder sb, IReadOnlyCollection<ArvoreMenuJon> listaNos)
        {
            sb.Append("<ul class=\"dropdown-menu\" role=\"menu\">");

            listaNos = listaNos.Where(n => !n.Nome.ToLower().StartsWith("grid")).ToList(); // Por convenção todas as permissões de Grid no ICMS Transparente devem começar desta forma

            foreach (var item in listaNos)
            {
                if (!String.IsNullOrWhiteSpace(item.Url))
                {
                    sb.Append("<li role=\"presentation\"><a role=\"menuitem\" href=\"" + DiretorioVirtual + item.Url + "\"> " + item.Nome + "</a></li>");
                }
                else
                {
                    var arvoreDeMenu = item.ArvoreDeMenu.ToList();
                    arvoreDeMenu = arvoreDeMenu.Where(n => !n.Nome.StartsWith("GRID")).ToList(); // Por convenção todas as permissões de Grid no ICMS Transparente devem começar desta forma

                    if (arvoreDeMenu.Count > 0)
                    {
                        sb.Append("<li role=\"presentation\" class=\"dropdown-submenu\"><a role=\"menuitem\" href=\"#\">" + item.Nome + "</a>");

                        MontaMenuRecursivoBootStrap(ref sb, arvoreDeMenu);

                        sb.Append("</li>");
                    }
                }
            }

            sb.Append("</ul>");
        }


        protected void ObterAutenticacao(string hash256)
        {
            if (Session["TEMPERMISSAONOPERFIL"] == null)
                LimpandoDadosDaSessao();

            string txtComPermissao = ValidarPermissaoParaAlterarPerfil();

            if (!string.IsNullOrEmpty(hash256) && string.IsNullOrEmpty(txtComPermissao))
                AutenticarICMSTransp(hash256, string.Empty);
            else if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["TXT"]))
                AutenticarICMSTransp(string.Empty, ConfigurationManager.AppSettings["TXT"]);
            else if (!string.IsNullOrWhiteSpace(txtComPermissao))
                AutenticarICMSTransp(string.Empty, txtComPermissao);
        }

        public void AutenticarICMSTransp(string hash256, string txt)
        {
            var portalIcms = new AutenticacaoPortalICMS();
            portalIcms.TXT = txt;
            portalIcms.Hash256 = hash256;

            UsuarioLogado = portalIcms.ObterUsuarioPermissao();
        }

        private string ValidarPermissaoParaAlterarPerfil()
        {
            string txtSelecionada = string.Empty;

            object[] objetoPermissao = (object[])System.Web.HttpContext.Current.Session["TEMPERMISSAONOPERFIL"] ?? null;
            if (objetoPermissao != null && objetoPermissao.Any())
            {
                bool temPermissao = (bool)objetoPermissao[0];
                if (temPermissao)
                {
                    txtSelecionada = objetoPermissao[3].ToString();
                }
            }

            return txtSelecionada;
        }

        private void LimpandoDadosDaSessao()
        {
            UsuarioLogado = null;
            TempData["MENUPRINCIPAL"] = null;
            TempData["USUARIOPRINCIPAL"] = null;
            Session.RemoveAll();
        }
    }

}