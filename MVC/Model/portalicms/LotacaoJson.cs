using System;
using System.Collections.Generic;

namespace MVC.Model.PortalICMS
{
    [Serializable]
    public class LotacaoJson
    {
        public int EstruturaOrganizacionalID { get; set; }
        public string Nome { get; set; }
        public string Bairro { get; set; }
        public string CEP { get; set; }
        public string Cidade { get; set; }
        public string Logradouro { get; set; }
        public int RegistroEstruturaID { get; set; }
        public string SiglaEstrutura { get; set; }
        public string CodigoHierarquia { get; set; }
        public List<string> SubEstruturasOrganizacionais { get; set; }
    }
}