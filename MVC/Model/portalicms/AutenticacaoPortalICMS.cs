using Dapper;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using MVC.APIExterna.cce;
using MVC.Model.portalicms;

namespace MVC.Model.PortalICMS
{
    public class AutenticacaoPortalICMS 
    {
        private string _urlHash;
        private string _urlUsuario;
        private string _urlDadoTemporario;
        private RestClient _client;
        protected string _token;

        public string Hash256;
        public string TXT;
        public string _urlApiAuthentication;
        public string _codigoSistema;

        public UsuarioJson UsuarioPerfil { get; set; }
        private bool trocarPerfil { get; set; } = false;
        private bool jsonCompleto { get; set; } = false;


        public AutenticacaoPortalICMS() 
        {
            _urlHash = ConfigurationManager.AppSettings["URL_HASH"];
            _urlUsuario = ConfigurationManager.AppSettings["URL_USUARIO"];
            _urlDadoTemporario = ConfigurationManager.AppSettings["URL_DADOTEMPORARIO"];
            _urlApiAuthentication = ConfigurationManager.AppSettings["URL_APIAUTHENTICATION"];
            _codigoSistema = ConfigurationManager.AppSettings["CODIGODOSISTEMA"];
        }

        public UsuarioJson ObterUsuarioPermissao()
        {
            if (string.IsNullOrEmpty(Hash256))
                ObterHash256();

            if (trocarPerfil)
                return UsuarioPerfil;

            if (string.IsNullOrEmpty(Hash256))
                throw new Exception("Usuário sem cadastro no portal do ICMS Transparente.");

            _token = ObterToken();

            var urlCompleta = _urlUsuario + Hash256;

            _client = new RestClient(urlCompleta);

            return RetornoUsuario(_client.Execute(GET()));
        }

        private void ObterHash256()
        {
            StringContent content;
            jsonCompleto = TXT.Length > 20;
            trocarPerfil = jsonCompleto || Debugger.IsAttached;
            if (trocarPerfil)
            {
                TrocarPerfil(TXT);
                return;
            }
            else
                content = new StringContent(ObterJsonUsuario(TXT), null, "application/json");

            _token = ObterToken();
            var client = new HttpClient();

            var request = new HttpRequestMessage(HttpMethod.Post, _urlHash);
            request.Headers.Add("Authorization", "Bearer " + _token);
            request.Headers.Add("Cookie", "BIGipServerVSH100.app~VSH100_pool=1913525420.20480.0000");
            request.Content = content;
            var response = client.SendAsync(request).Result;

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
                Hash256 = response.Content.ReadAsStringAsync().Result;
        }

        private void TrocarPerfil(string login)
        {
            if (jsonCompleto)
            {
                var usuario = JsonConvert.DeserializeObject<dynamic>(login);
                login = ((Newtonsoft.Json.Linq.JValue)usuario.LOGIN).Value.ToString();
            }

            PermissaoSistemaUsuarioJson usuarioPermissao = ObterPermissaoSistemaUsuario(login);

            if (usuarioPermissao == null)
                throw new Exception("Usuário sem cadastro no protal do ICMS Transparente.");

            UsuarioPerfil = new UsuarioJson
            {
                LoginAD = usuarioPermissao.login,
                Nome = usuarioPermissao.nome,
                CPF = usuarioPermissao.cpf,
                GrupoID = Convert.ToInt32(usuarioPermissao.grupoID),
                UnidadeID = Convert.ToInt32(usuarioPermissao.unidadeID),
                NomeGrupo = usuarioPermissao.nomeGrupo,
            };

            UsuarioPerfil.Permissoes = usuarioPermissao.permissoes.ToList();
            UsuarioPerfil.ArvoreMenu = JsonConvert.DeserializeObject<List<ArvoreMenuJon>>(JsonConvert.SerializeObject(usuarioPermissao.arvoreMenu.ToList()));
        }


        public PermissaoSistemaUsuarioJson ObterPermissaoSistemaUsuario(string ie)
        {
            _token = ObterToken();

            var parametros = new Dictionary<object, object>()
            {
                { "login", ie },
                { "sistemaCodigo", Convert.ToInt64(_codigoSistema) }
            };

            var urlCompleta = _urlApiAuthentication + "PermissaoSistemaUsuario";
            _client = new RestClient(urlCompleta);

            return RetornoPermissao(_client.Execute(POST(parametros)));
        }


        public string ObterJsonUsuario(string usuario)
        {
            var sql = $@"select u.usr_nome as LOGIN,  u.uni_codigo as UNIDADECODIGO, ug.sis_codigo as SISTEMACODIGO,
                        ug.gru_codigo as GRUPOCODIGO
                        from Usuario_Grupo ug
                        join Usuario u on u.usr_nome = ug.usr_nome
                        join Sistema s on s.sis_codigo = ug.sis_codigo
                        where u.usr_nome = '{usuario}' and ug.sit_codigo = 'A' 
                        and s.sis_codigo = {ConfigurationManager.AppSettings["CODIGODOSISTEMA"]}";

            var connection = @"data source=S0502.MS;initial catalog=eFazenda_Hom;user id=efazenda;password=p@p3##;Connection Timeout=30";
            var dapper = new SqlConnection(connection);
            var result = JsonConvert.SerializeObject(dapper.QueryFirstOrDefault(sql));

            return result;
        }
        private PermissaoSistemaUsuarioJson RetornoPermissao(IRestResponse response)
        {
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
                return JsonConvert.DeserializeObject<PermissaoSistemaUsuarioJson>(response.Content);

            return null;
        }

        private UsuarioJson RetornoUsuario(IRestResponse response)
        {
            if (response.StatusCode != System.Net.HttpStatusCode.OK)
                throw new Exception($"Erro no retorno da API: {JsonConvert.DeserializeObject<MensagemContentErro>(response.Content)?.message ?? string.Empty}");

            var json = JsonConvert.DeserializeObject<AutenticacaoJson>(response.Content);
            json.Usuario.LoginAD = json.Usuario.LoginAD.Trim();

            return json.Usuario;
        }

        protected RestRequest GET()
        {
            var request = new RestRequest(Method.GET);
            request.AddHeader("cache-control", "no-cache");
            request.AddHeader("authorization", "Bearer " + _token);
            return request;
        }

        protected RestRequest POST(object parametros)
        {
            var envelopeJson = JsonConvert.SerializeObject(parametros);
            var request = new RestRequest(Method.POST);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("accept", "application/json");
            request.AddHeader("cache-control", "no-cache");
            request.AddHeader("authorization", "Bearer " + _token);
            request.AddParameter("application/json", envelopeJson, ParameterType.RequestBody);
            return request;
        }

        private string ObterToken()
        {
            var client = new RestClient(ConfigurationManager.AppSettings["UrlToken"]);
            var request = new RestRequest(Method.POST);
            request.AddHeader("cache-control", "no-cache");
            request.AddHeader("content-type", "application/x-www-form-urlencoded");

            request.AddParameter("application/x-www-form-urlencoded", $"grant_type=client_credentials&client_id={ConfigurationManager.AppSettings["Usuario_ApiCce"]}&client_secret={ConfigurationManager.AppSettings["Segredo_ApiCce"]}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);

            var result = JsonConvert.DeserializeObject<KeyCloakResponse>(response.Content);

            return result.Access_token;
        }
    }
}
