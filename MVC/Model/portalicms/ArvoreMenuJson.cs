using System;
using System.Collections.Generic;

namespace MVC.Model.PortalICMS
{
    [Serializable]
    public class ArvoreMenuJon
    {
        public int MenuId { get; set; }
        public string Nome { get; set; }
        public string Url { get; set; }

        public List<ArvoreMenuJon> ArvoreDeMenu { get; set; }
    }
}