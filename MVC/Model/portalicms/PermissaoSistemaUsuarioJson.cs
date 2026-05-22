using System;

namespace MVC.Model.PortalICMS
{
    [Serializable]
    public class PermissaoSistemaUsuarioJson
    {
        public string nome { get; set; }
        public string login { get; set; }
        public long unidadeID { get; set; }
        public string nomeUnidade { get; set; }
        public string nomeGrupo { get; set; }
        public long grupoID { get; set; }
        public long sistemaID { get; set; }
        public string nomeSistema { get; set; }
        public string[] permissoes { get; set; }
        public ArvoreMenu[] arvoreMenu { get; set; }        
        public string matricula { get; set; }
        public string email { get; set; }
        public string cpf { get; set; }        
    }

    public class ArvoreMenu
    {
        public string nome { get; set;}
        public string url { get; set;}
        public long menuID { get; set;}
        public ArvoreMenu[] arvoreDeMenu { get; set;}
    }
}
