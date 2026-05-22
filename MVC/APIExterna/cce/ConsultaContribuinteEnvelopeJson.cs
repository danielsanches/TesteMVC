using System.Collections.Generic;

namespace MVC.APIExterna.cce
{
    public class ConsultaContribuinteEnvelopeJson
    {
        public ConsultaContribuinteEnvelopeJson()
        {
            Data = new List<DataJson>();
            Messages = new List<Mensagens>();
        }

        public List<DataJson> Data { get; set; }
        public List<Mensagens> Messages { get; set; }
    }
}
