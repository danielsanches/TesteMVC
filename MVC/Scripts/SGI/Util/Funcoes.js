function carregarCombo(comboId, data, text, value) {

    limpaSelect(comboId);

    if (!verificaValor(text) || !verificaValor(value)) {
        alert("function carregarCombo: text e/ou value não foi definido.");
        return;
    }

    for (var i in data) {
        var item = data[i];
        adicionaComboItem(comboId, item[text], item[value]);
    }
}

function limpaSelect(id) {

    var selectObj = document.getElementById(id);
    var selectParentNode = selectObj.parentNode;
    var newSelectObj = selectObj.cloneNode(false); //Fazendo uma cópia superficial
    selectParentNode.replaceChild(newSelectObj, selectObj);

    //Adicionando o valor padrão do combo, o "Selecione"
    var option = document.createElement("option");
    option.text = "Selecione...";
    option.value = "";

    //Adicionando a nova opção no combo
    try {
        //IE
        newSelectObj.add(option);
    }
    catch (err) {
        //Firefox
        newSelectObj.add(option, null);
    }
}

function adicionaComboItem(comboId, text, value) {
    //Pegando o combo (drop down list)
    var combo = document.getElementById(comboId);

    if (combo == null || combo == undefined) {
        alert("function adicionaComboItem: combo inexistente.");
        return;
    }

    //Criando a opção com seu texto e valor de seleção
    var option = document.createElement("option");
    option.text = text;
    option.value = value;

    //Adicionando a nova opção no combo
    try {
        //IE
        combo.add(option);
    }
    catch (err) {
        //Firefox
        combo.add(option, null);
    }
}

function verificaValor(valor) {
    return valor != undefined && valor != "" && valor != null;
}

function limparMensagens() {
    $("#div-mensagens").html("");
}

function exibirMensagemErro(mensagem) {
    var msgArr = new Array({
        Tipo: 0, //Erro
        Descricao: mensagem
    });

    exibirMensagens(msgArr);
}

function exibirMensagemAlerta(mensagem) {
    var msgArr = new Array({
        Tipo: 1, //Aviso
        Descricao: mensagem
    });

    exibirMensagens(msgArr);
}

function exibirMensagens(mensagens) {

    limparMensagens();

    if (!verificaValor(mensagens))
        return;

    var html = "";

    for (var i = 0; i <= 5; i++) {

        if (i >= 4) {
            continue;
        }

        var titulo = "Erro!";
        var classe = "alert-danger";
        var descricao = '';
        var emissor = "";
        var excecao = "";

        switch (i) {
            case 0: //Erro
            case 4: //ErroNaoBloqueante
                titulo = "Erro!";
                classe = "alert-danger";
                break;
            case 1: //Aviso
            case 5: //AvisoBloqueante
                titulo = "Atenção!";
                classe = "alert-warning";
                break;
            case 2: //Informacao
                titulo = "Informação!";
                classe = "alert-info";
                break;
            case 3: //Sucesso
                titulo = "Sucesso!";
                classe = "alert-success";
                break;
        }

        tipoEnviado = i;
        var mensagensTipo = mensagens.filter(checkTipo);

        if (mensagensTipo.length == 0)
            continue;

        html += "<div class='alert " + classe + " alert-dismissible' role='alert'>" +
				"   <button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
				"       <span aria-hidden='true'>&times;</span>" +
				"   </button>" +
				"   <h4>" + titulo + "</h4>";

        for (j = 0; j < mensagensTipo.length; j++) {
            var mensagem = mensagensTipo[j];
            descricao = mensagem.Descricao + "</br>";
            //descricao = "- " + mensagem.Descricao + "</br>";

            if (mensagem.IsDebug) {
                if (mensagem.Emissor != "" && mensagem.Emissor != null) {
                    emissor = "<p style='padding-left:15px'><u>Origem da Mensagem:</u> " + mensagem.Emissor + "</p>";
                }
                if (mensagem.Excecao != "" && mensagem.Excecao != null) {
                    excecao = "<p style='padding-left:15px'><u>Exceção:</u> " + mensagem.Excecao + "</p>";
                }
            }

            html += "   <p style='padding-left:15px'>" + descricao + "</p>" +
                emissor +
                excecao;

            emissor = "";
            excecao = "";
        }

        html += "</div>";
    }

    $("#div-mensagens").html("");
    $("#div-mensagens").append(html);

    setTimeout(function () {
        $("#div-mensagens").html("");
    }, 30000);

    window.scrollTo(0, 0);

    return;
}

function exibirMensagensOnTarget(mensagens) {

    limparMensagens();

    if (!verificaValor(mensagens))
        return;

    var html = "";

    for (var i = 0; i <= 5; i++) {

        if (i >= 4) {
            continue;
        }

        var titulo = "Erro!";
        var classe = "alert-danger";
        var descricao = '';
        var emissor = "";
        var excecao = "";

        switch (i) {
            case 0: //Erro
            case 4: //ErroNaoBloqueante
                titulo = "Erro!";
                classe = "alert-danger";
                break;
            case 1: //Aviso
            case 5: //AvisoBloqueante
                titulo = "Atenção!";
                classe = "alert-warning";
                break;
            case 2: //Informacao
                titulo = "Informação!";
                classe = "alert-info";
                break;
            case 3: //Sucesso
                titulo = "Sucesso!";
                classe = "alert-success";
                break;
        }

        tipoEnviado = i;
        var mensagensTipo = mensagens.filter(checkTipo);

        if (mensagensTipo.length == 0)
            continue;

        html += "<div class='alert " + classe + " alert-dismissible' role='alert'>" +
				"   <button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
				"       <span aria-hidden='true'>&times;</span>" +
				"   </button>" +
				"   <h4>" + titulo + "</h4>";

        for (j = 0; j < mensagensTipo.length; j++) {
            var mensagem = mensagensTipo[j];
            descricao = mensagem.Descricao + "</br>";
            //descricao = "- " + mensagem.Descricao + "</br>";

            if (mensagem.IsDebug) {
                if (mensagem.Emissor != "" && mensagem.Emissor != null) {
                    emissor = "<p style='padding-left:15px'><u>Origem da Mensagem:</u> " + mensagem.Emissor + "</p>";
                }
                if (mensagem.Excecao != "" && mensagem.Excecao != null) {
                    excecao = "<p style='padding-left:15px'><u>Exceção:</u> " + mensagem.Excecao + "</p>";
                }
            }

            html += "   <p style='padding-left:15px'>" + descricao + "</p>" +
                emissor +
                excecao;

            emissor = "";
            excecao = "";
        }

        html += "</div>";
    }

    return html;
}

var tipoEnviado = 0;

function checkTipo(mensagem) {
    if (mensagem !== null) {
        if (tipoEnviado == 0)
            return mensagem.Tipo == tipoEnviado || mensagem.Tipo == 4;
        if (tipoEnviado == 1)
            return mensagem.Tipo == tipoEnviado || mensagem.Tipo == 5;
        else
            return mensagem.Tipo == tipoEnviado;
    }
}

/*
* Função que pega os dados do form e envia por ajax
*/
function executarSubmit(sucesso, erro) {
    var form = $('form')[0]; // You need to use standart javascript object here
    var formData = new FormData(form);

    var sucessoPadrao = function (data) {
        //if (data.Status == 0)
        if (verificaValor(data.Redirect)) {
            if (data.Redirect[0] == '/' && content[content.length - 1] == '/') {
                //Remover o excesso de /
                data.Redirect = data.Redirect.substring(1);
            }

            window.location = content + data.Redirect;
        }
        else {
            exibirMensagens(data.Mensagens);
        }
    };

    var erroPadrao = function (xhr, error) {
        //console.debug(xhr); console.debug(error);
        alert("Erro ao realizar operação! Entre em contato com o Suporte Técnico.");
    }

    $.ajax({
        url: form.action,
        type: form.method,
        data: formData,
        // Isto deve ser feito para o upload de arquivo
        contentType: false,
        processData: false,
        // ... Outras opções como success, error, etc...
        success: sucesso != null ? sucesso : sucessoPadrao,
        error: erro != null ? erro : erroPadrao
    });
}

function mascaraInteiro() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
        return false;
    }
    return true;
}

function formataCampo(campo, Mascara, evento) {
    var boleanoMascara;

    var Digitato = evento.keyCode;
    exp = /\-|\.|\/|\(|\)| /g;
    campoSoNumeros = campo.value.toString().replace(exp, "");

    var posicaoCampo = 0;
    var NovoValorCampo = "";
    var TamanhoMascara = campoSoNumeros.length;;

    if (Digitato !== 8) { // backspace 
        for (i = 0; i <= TamanhoMascara; i++) {
            boleanoMascara = ((Mascara.charAt(i) === "-") || (Mascara.charAt(i) === ".")
								|| (Mascara.charAt(i) === "/"));
            boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === "(")
								|| (Mascara.charAt(i) === ")") || (Mascara.charAt(i) === " "));
            if (boleanoMascara) {
                NovoValorCampo += Mascara.charAt(i);
                TamanhoMascara++;
            } else {
                NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                posicaoCampo++;
            }
        }
        campo.value = NovoValorCampo;
        return true;
    } else {
        return true;
    }
}

function SomenteNumero(e) {
    var tecla = (window.event) ? event.keyCode : e.which;
    if ((tecla > 47 && tecla < 58)) return true;
    else {
        if (tecla === 8 || tecla === 0) return true;
        else return false;
    }
}

var eStatus = { Ok: 0, Erro: 1, NaoDefinido: 2 };

function roundToX(num, X) {
    return +(Math.round(num + "e+" + X) + "e-" + X);
}

function BuscarCarCCE(ie) {

    $.ajax({
        url: content + "IncentivosFiscais/IncentivoProdutor/BuscarCar",
        method: 'POST',
        data: {
            ie: ie,
        },
        success: function (retorno) {
            $("#divCar").show();
            if (retorno.Status === eStatus.Ok) {
                $("#Car").val(retorno.Redirect);
                LoadDadosPropriedade(ie);
            }
            else {
                exibirMensagens(retorno.Mensagens);
                $("#Car").removeAttr("readonly");
                $("#botaoBuscar").show();
            }
        }
    });
}

function ObterParametrosDoFormularioComAnexo(form) {
    formData = new FormData()

    $.each(form.find('input[type="file"]'), function (i, tag) {
        $.each($(tag)[0].files, function (i, file) {
            formData.append(tag.name, file);
        });
    });

    $.each(form.serializeArray(), function (i, item) {
        formData.append(item.name, item.value);
    });

    return formData
}

function ObterParametrosDoFormulario(form) {
    formData = new FormData()
    $.each(form.serializeArray(), function (i, item) {
        formData.append(item.name, item.value);
    });

    return formData
}

