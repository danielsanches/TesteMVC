using Newtonsoft.Json;
using System;
using System.Linq;
using System.Configuration;

namespace MVC.Model.Perfil
{
    [Serializable]
    public class PerfilViewModel
    {
        public PerfilViewModel() { }

        public PerfilViewModel(int grupoId)
        {
            GrupoIdLogado = grupoId;
        }

        private int produtor = int.Parse(ConfigurationManager.AppSettings["GrupoProdutor"]);
        private int gerencialHom = 967;
        private const int usuariosExternos = 191;

        public int GrupoIdLogado { get; private set; }

        public string LoginIcms { get; set; }

        public string IeProdutor { get; set; }

        public bool PodeTrocarPerfil { get; private set; }

        public string Usuario { get; set; }

        public int GrupoId { get; set; }

        public void ValidarTrocaPerfil(bool podeTrocar)
        {
            PodeTrocarPerfil = podeTrocar;
        }

        /// <summary>
        /// Coloque aqui todos os perfis que podem acessar o sistema, para cada perfil, coloque o login do usuário e o grupoId.
        /// </summary>
        /// <param name="unidade"></param>
        /// <returns></returns>
        public string BuscarUsuario(int unidade = usuariosExternos)
        {
            var perfisSefaz = new[] { gerencialHom };
            string usuario = string.Empty;

            if (GrupoId == produtor)
                usuario = IeProdutor;
            else if (perfisSefaz.Contains(GrupoId))
                usuario = Usuario;

            //if (GrupoId == grupoTal)
            //    usuario = usuarioTal;

            var jUsuario = JsonConvert.SerializeObject(new
            {
                LOGIN = usuario,
                SISTEMACODIGO = ConfigurationManager.AppSettings["CODIGODOSISTEMA"],
                GRUPOCODIGO = GrupoId,
                UNIDADECODIGO = unidade
            });

            return jUsuario;
        }
    }
}