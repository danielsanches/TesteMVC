using MVC.Model.Home;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace MVC.Controllers
{
    public class HomeController : Controller
    {
        public static List<DadosPessoaisModel> listaDados = new List<DadosPessoaisModel>();
        public HomeController() : base() { }

        public ActionResult Index()
        {
            return View(new DadosPessoaisModel { Itens = listaDados });
        }

        [HttpPost]
        public ActionResult Index(DadosPessoaisModel dadosPessoaisModel)
        {
            dadosPessoaisModel.Id = listaDados.Count + 1;
            listaDados.Add(dadosPessoaisModel);
            return View(new DadosPessoaisModel { Itens = listaDados });
        }

        [HttpPost]
        public ActionResult Remover(DadosPessoaisModel dadosPessoaisModel)
        {
            DadosPessoaisModel registro = listaDados.First(c => c.Id == dadosPessoaisModel.Id);
            listaDados.Remove(registro);

            return RedirectToAction("Index");
        }

        public ActionResult Editar(int id)
        {
            DadosPessoaisModel registro = listaDados.First(c => c.Id == id);

            return View(registro);
        }

        [HttpPost]
        public ActionResult Editar(DadosPessoaisModel dadosPessoaisModel)
        {
            DadosPessoaisModel registro = listaDados.First(c => c.Id == dadosPessoaisModel.Id);

            registro.Nome = dadosPessoaisModel.Nome;
            registro.Email = dadosPessoaisModel.Email;

            return RedirectToAction("Index");
        }
    }

}