using System.Collections.Generic;

namespace MVC.APIExterna.cce
{
    public class ProdutorEnvelopeJson
    {
        public string InscricaoEstadual { get; set; }
        public string Cnpjcpf { get; set; }
        public string Nome { get; set; }
        public string NomeFantasia { get; set; }
        public int Situacao { get; set; }
        public string SituacaoDescricao { get; set; }
        public EstabelecimentoRuralEnvelopeJson EstabelecimentoRural { get; set; }
        public List<CondominioEnvelopeJson> Condominio { get; set; }
    }
}
