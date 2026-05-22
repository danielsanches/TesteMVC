using System;

namespace MVC.APIExterna.cce
{
    public class QuadroSocietarioEnvelopeJson
    {
        public string Nome { get; set; }
        public string Cnpjcpf { get; set; }
        public string NomeConjuge { get; set; }
        public string CpfConjuge { get; set; }
        public string EstadoCivil { get; set; }
        public int? CodigoQualificacao { get; set; }
        public string Qualificacao { get; set; }
        public string TipoUsoFirma { get; set; }
        public string TipoPessoa { get; set; }
        public string CnpjcpfRepresentante { get; set; }
        public int? CodigoQualificacaoRepresentante { get; set; }
        public string QualificacaoRepresentante { get; set; }
        public bool Responsavel { get; set; }
        public DateTime DataEntrada { get; set; }
        public DateTime? DataSaida { get; set; }
        public string Telefone1_Residencial { get; set; }
        public string Telefone2_Comercial { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public PessoaEnderecoEnvelopeJson PessoaEndereco { get; set; }
    }
}
