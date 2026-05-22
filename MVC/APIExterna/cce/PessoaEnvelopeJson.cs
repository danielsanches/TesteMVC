using System;
using System.Collections.Generic;

namespace MVC.APIExterna.cce
{
    public class PessoaEnvelopeJson
    {
        public int CodigoPessoa { get; set; }
        public string TipoPessoa { get; set; }
        public string Cnpjcpf { get; set; }
        public string Nome { get; set; }
        public string NomeFantasia { get; set; }
        public bool EstabelecimentoMatriz { get; set; }
        public string CnpjMatriz { get; set; }
        public string CnpjSucessora { get; set; }
        public string Nire { get; set; }
        public int? CodigoNaturezaJuridica { get; set; }
        public string NaturezaJuridica { get; set; }
        public string OrgaoRegistro { get; set; }
        public string NumRegistroCartorioLei { get; set; }
        public string NumCnpjOrgaoRegistro { get; set; }
        public string AlvaraPrefeitura { get; set; }
        public string CodMonetarioCapital { get; set; }
        public double? ValorCapitalSocial { get; set; }
        public string Telefone1_Residencial { get; set; }
        public string Telefone2_Comercial { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string CaixaPostal { get; set; }
        public string CepCaixaPostal { get; set; }
        public string EstadoCivil { get; set; }
        public string NomeConjuge { get; set; }
        public string CpfConjuge { get; set; }
        public string NomeDocsFiscais { get; set; }
        public DateTime? DataInicioAtividade { get; set; }
        public DateTime? DataAtualizacaoImportacao { get; set; }
        public DateTime? DataTerminoAtividade { get; set; }
        public DateTime? DataEmissaoDocumento { get; set; }
        public DateTime? DataNascimento { get; set; }
        public string NumIdentidadePassaporte { get; set; }
        public string OrgaoEmissorDocumento { get; set; }
        public string UfOrgaoEmissor { get; set; }
        public string PorteEmpresa { get; set; }
        public string UsoImovel { get; set; }
        public int? CodTipoUnidade { get; set; }
        public string TipoUnidade { get; set; }
        public List<FormaAtuacaoEnvelopeJson> FormaAtuacao { get; set; }
        public string Pais { get; set; }
        public string CidadeNascimento { get; set; }
        public string OrigemDeImportacao { get; set; }
        public bool Estrangeira { get; set; }
        public bool Espolio { get; set; }
        public List<InventarianteEnvelopeJson> Inventariantes { get; set; }
        public PessoaEnderecoEnvelopeJson PessoaEndereco { get; set; }
    }
}
