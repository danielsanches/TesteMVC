using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC.Model.Home
{
    public class DadosPessoaisModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public List<DadosPessoaisModel> Itens { get; set; } = new List<DadosPessoaisModel>();
    }
}
