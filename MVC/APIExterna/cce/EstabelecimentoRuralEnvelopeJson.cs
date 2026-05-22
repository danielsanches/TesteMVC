using System;

namespace MVC.APIExterna.cce
{
    public class EstabelecimentoRuralEnvelopeJson
    {
        public int? EstabelecimentoId { get; set; }
        public string NumeroCar { get; set; }
        public int? PropriedadeId { get; set; }
        public string CnpjCpfProprietario { get; set; }
        public string NomeProprietario { get; set; }
        public string NomePropriedade { get; set; }
        public string MunicipioPropriedadeCodigoModuloFiscal { get; set; }
        public string MunicipioPropriedadeCodigoIBGE { get; set; }
        public string MunicipioPropriedade { get; set; }
        public string MunicipioUfPropriedade { get; set; }
        public int CodigoCondicaoProdutor { get; set; }
        public string CondicaoProdutor { get; set; }
        public bool Sede { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string LocalizacaoSede { get; set; }
        public string Localizacao { get; set; }
        public DateTime? DataInicioContrato { get; set; }
        public DateTime? DataFimContrato { get; set; }
        public double AreaDisponivel { get; set; }
        public double AreaTotal { get; set; }
        public double AreaUtilizada { get; set; }
        public DateTime? DataAgregacao { get; set; }
        public string InscricaoAgregada { get; set; }
    }
}
