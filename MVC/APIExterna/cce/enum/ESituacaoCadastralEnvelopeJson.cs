using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;

namespace MVC.APIExterna.cce.Enum
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum ESituacaoCadastralEnvelopeJson
    {
        Habilitado,
        NaoHabilitado
    }
}
