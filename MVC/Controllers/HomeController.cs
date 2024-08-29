using MVC.Model.Home;
using System.Collections.Generic;
using System.Web.Mvc;

namespace MVC.Controllers
{
    public class HomeController : Controller
    {
        public static List<DadosPessoaisModel> listaDados = new List<DadosPessoaisModel>();
        public HomeController() : base() { }

        public ActionResult Index()
        {
            return View(new DadosPessoaisModel());
        }

        [HttpPost]
        public ActionResult Index(DadosPessoaisModel dadosPessoaisModel)
        {
            dadosPessoaisModel.Id = listaDados.Count + 1;
            listaDados.Add(dadosPessoaisModel);
            return View(new DadosPessoaisModel { Itens = listaDados });
        }
        [HttpPost]
        public ActionResult Remover()
        {
            return View(new DadosPessoaisModel());
        }
    }

}