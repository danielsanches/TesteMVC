using MVC.APIExterna.cce.Enum;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MVC.APIExterna.cce
{
    public class ContribuinteEnvelopeJson
    {
        public string InscricaoEstadual { get; set; }
        public string ContribuinteCNPJCPF { get; set; }
        public ETipoContribuinteEnvelopeJson TipoContribuinte { get; set; }
        public int? CodigoOPR { get; set; }
        public int? CodigoAgenfa { get; set; }
        public string NomeAgenfa { get; set; }
        public int? CodigoAgenfaMae { get; set; }
        public string CodigoCae { get; set; }
        public string CaeDescricao { get; set; }
        public string CodigoCNAE { get; set; }
        public string DescricaoCNAE { get; set; }
        public int? CodigoSituacao { get; set; }
        public string CodigoSituacaoGP { get; set; }
        public string DescricaoSituacao { get; set; }
        public ESituacaoCadastralEnvelopeJson SituacaoCadastral { get; set; }
        public DateTime DataSituacaoCadastral { get; set; }
        public DateTime DataInicioAtividade { get; set; }
        public DateTime DataInclusao { get; set; }
        public DateTime DataAtualizacao { get; set; }
        public int? EventoCodigo { get; set; }
        public string EventoDescricao { get; set; }
        public bool AtualizouProacap { get; set; }
        public bool InscricaoUnica { get; set; }
        public VistoriaEnvelopeJson Vistoria { get; set; }
        public string NomeDocumentosFiscais { get; set; }
        public bool? IncentivoFiscal { get; set; }
        public int? CodigoRegimePagamento { get; set; }
        public int? CodigoClassificacaoEstabelecimento { get; set; }
        public string DescricaoRegimePagamento { get; set; }
        public string DescricaoClassificacaoEstabelecimento { get; set; }
        public string CrcContador { get; set; }
        public string CpfCnpjContador { get; set; }
        public string NomeContador { get; set; }
        public string Telefone1Contador { get; set; }
        public string Telefone2Contador { get; set; }
        public string EmailContador { get; set; }
        public bool? ContribuinteICMS { get; set; }
        public int? CoordenadoriaCodigo { get; set; }
        public string CoordenadoriaDescricao { get; set; }
        public List<EstabelecimentoRuralEnvelopeJson> EstabelecimentoRural { get; set; }
        public PessoaEnvelopeJson Pessoa { get; set; }
        public List<QuadroSocietarioEnvelopeJson> QuadroSocietario { get; set; }
        public List<ContribuinteCnaeEnvelopeJson> ContribuinteCnaes { get; set; }
        public List<CondominioEnvelopeJson> Condominio { get; set; }

        public EstabelecimentoRuralEnvelopeJson ObterEstabelecimentoRural
        {
            get
            {
                var estabelecimentoComSede = EstabelecimentoRural?.FirstOrDefault(c => c.Sede);
                return estabelecimentoComSede ?? EstabelecimentoRural?.FirstOrDefault();
            }
        }

        public bool ContribuinteNulo()
        {
            return string.IsNullOrWhiteSpace(InscricaoEstadual);
        }


    }
}
