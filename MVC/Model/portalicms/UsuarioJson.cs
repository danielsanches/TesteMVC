using System;
using System.Collections.Generic;

namespace MVC.Model.PortalICMS
{

    [Serializable]
    public class UsuarioJson
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Matricula { get; set; }
        public int GeoEstruturaLotacaoID { get; set; }
        public int GeoEstruturaLogadoID { get; set; }
        public string NomeEstrutura { get; set; }
        public string CodigoHierarquia { get; set; }
        public int GrupoID { get; set; }
        public string LoginAD { get; set; }
        public string NomeDominio { get; set; }
        public string Email { get; set; }
        public string TelefoneResidencial { get; set; }
        public string TelefoneCelular { get; set; }
        public string TelefoneComercial { get; set; }
        public string CPF { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Endereco { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public List<ArvoreMenuJon> ArvoreMenu { get; set; }
        public List<LotacaoJson> Lotacao { get; set; }
        public int UnidadeID { get; set; }
        public string NomeUnidade { get; set; }
        public string NomeGrupo { get; set; }
        public string IP { get; set; }
        public List<string> Permissoes { get; set; }
    }
}