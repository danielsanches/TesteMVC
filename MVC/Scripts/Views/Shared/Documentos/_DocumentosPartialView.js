$(document).ready(function () {
    $('.input-data').mask('99/99/9999').datepicker({
        language: 'pt-BR',
        todayHighlight: true,
        autoclose: true,
        toggleActive: true
    });
});

function validarData(idTipoDocumento, contador) {

    var inputData = document.getElementById("dataVencimento-inserir-" + idTipoDocumento);
    var dataSelecionada = new Date(inputData.value);
    var dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    dataSelecionada.setDate(dataSelecionada.getDate() + 1);
    dataSelecionada.setHours(0, 0, 0, 0);

    $('#DocumentoGenerico_' + contador + '__DataVencimento').val(inputData.value);

    var mensagemErro = document.getElementById("mensagemErro-" + idTipoDocumento);
    if (dataSelecionada < dataAtual) {
        event.preventDefault();
        inputData.setAttribute('required', '');
        mensagemErro.style.display = "block";
    } else {
        inputData.removeAttribute('required');
        mensagemErro.style.display = "none";
    }

    var mensagemErroDataMaior = document.getElementById("mensagemErroDataMaior-" + idTipoDocumento);
    var mensagemErroDataMaior18Meses = document.getElementById("mensagemErroDataMaior18Meses-" + idTipoDocumento);
    const dataAtualMaisUmAno = new Date();
    const dataAtualMais18Meses = new Date();
    dataAtualMaisUmAno.setFullYear(dataAtual.getFullYear() + 1);
    dataAtualMaisUmAno.setHours(0, 0, 0, 0);
    dataAtualMais18Meses.setMonth(dataAtual.getMonth() + 18);
    dataAtualMais18Meses.setHours(0, 0, 0, 0);

    var AtestadoDeAdequaçãoEmitidoPorOrganizaçãoAssociativacredenciadaProd = 59; 
    var AtestadoDeAdequaçãoEmitidoPorOrganizaçãoAssociativacredenciadaHom = 60;
    var docArt = 4;

    if (dataSelecionada > dataAtualMaisUmAno && idTipoDocumento == docArt) {
        event.preventDefault();
        inputData.setAttribute('required', '');
        mensagemErroDataMaior.style.display = "block";
    }
    else if (dataSelecionada > dataAtualMais18Meses && (idTipoDocumento == AtestadoDeAdequaçãoEmitidoPorOrganizaçãoAssociativacredenciadaProd || idTipoDocumento == AtestadoDeAdequaçãoEmitidoPorOrganizaçãoAssociativacredenciadaHom))
    {
        event.preventDefault();
        inputData.setAttribute('required', '');
        mensagemErroDataMaior18Meses.style.display = "block";
    }
    else {
        inputData.removeAttribute('required');
        mensagemErroDataMaior.style.display = "none";
        mensagemErroDataMaior18Meses.style.display = "none";
    }
}

function removerDocumentoAnexado(idRemover, ehObrigatorio, contador) {

    var idDoCampo = "DocumentoGenerico_" + idRemover;
    var campo = document.getElementById(idDoCampo);
    campo.value = null;

    var IdCampoArquivoId = "DocumentoGenerico_" + idRemover + "__Id";
    var idArquivo = document.getElementById(IdCampoArquivoId);
    idArquivo.value = 0;

    $("#div-arquivo-inserido-" + idRemover).slideUp(function () {

        var botaoDownload = document.getElementById("btnDownload-" + idRemover);
        var botaoRemover = document.getElementById("btnRemover-" + idRemover);
        botaoDownload.style.display = "none";
        botaoRemover.style.display = "none";

        var dataVencimentoInserida = document.getElementById("div-data-vencimento-inserida-" + idRemover);
        if (dataVencimentoInserida)
            dataVencimentoInserida.style.display = "none";

        var dataVencimento = document.getElementById("div-data-vencimento-inserir-" + idRemover);
        if (dataVencimento)
            dataVencimento.style.display = "block";

        $("#div-arquivo-para-inserir-" + idRemover).slideDown();
    });

    let obrigatorio = ehObrigatorio == 1 ? true : false;
    var idCampo = "DocumentoGenerico_" + contador + "__ArquivoPostado";
    var idParaAnexarDocumento = document.getElementById(idCampo);
    if (obrigatorio) {
        idParaAnexarDocumento.setAttribute("required", "required");
    } else {
        idParaAnexarDocumento.removeAttribute("required");
    }
}

function validarTamanhoDoc(campo, tamanhoMaximoPermitido, idOndeMonstrarMensagemDeErro) {

    var arquivo = campo.files[0];
    var inputText = document.getElementById(idOndeMonstrarMensagemDeErro);
    var tamanhoEmMb = tamanhoMaximoPermitido / 1024;

    if (arquivo != null && (arquivo.size / 1024) > tamanhoMaximoPermitido) {
        addValidationError(inputText, "O tamanho máximo permitido é de " + tamanhoEmMb + "MB!");

        $("button.btn.btn-success[type='submit']").prop('disabled', true);

        campo.files[0].value = null;
        inputText.value = null;
    }
    else {

        $("button.btn.btn-success[type='submit']").prop('disabled', false);

        jQuery('.remover-erro-dinamico').remove();
    }
}

function VerificaSeTemDataDeVencimento(Model) {
    var tipoDocumentoId = document.getElementById("DocumentoGenerico_" + Model + "__IdTipoDocumento").value;

    $.ajax({
        type: "POST",
        url: content + "Documento/DocumentoRequeerVencimento",
        data: { id: tipoDocumentoId },
        success: (function (data) {

            var elemento = document.getElementById("DocumentoGenerico_" + Model + "__DataVencimento");
            if (elemento && data) {
                elemento.style.display = "block";
            } else { elemento.style.display = "none"; }
        })
    });
}

function validarTamanhoNomeDocumento(campo, idOndeMonstrarMensagemDeErro) {

    var nomeArquivo = campo.value;
    var inputText = document.getElementById(idOndeMonstrarMensagemDeErro);

    if (jQuery('.remover-erro-dinamico') != null && jQuery('.remover-erro-dinamico').length > 0)
        return;

    if (nomeArquivo.length > 120) {
        addValidationError(inputText, "O nome do arquivo é muito grande!");

        $("button.btn.btn-success[type='submit']").prop('disabled', true);

        campo.value = ""; 
        inputText.value = null; 
    }
    else {
        $("button.btn.btn-success[type='submit']").prop('disabled', false);

        jQuery('.remover-erro-dinamico').remove(); 
    }
}

function validarExtensaoArquivoGenerico(campo, idOndeMonstrarMensagemDeErro) {

    var arquivo = campo.files[0];
    var inputText = document.getElementById(idOndeMonstrarMensagemDeErro);

    if (jQuery('.remover-erro-dinamico') != null && jQuery('.remover-erro-dinamico').length > 0)
        return;

    if (arquivo != null && (arquivo.type.substring(0, 5) != "image" && arquivo.type != "application/pdf")) {
        addValidationError(inputText, "São permitidos apenas arquivos do tipo PDF ou imagens.");
        campo.files[0].value = null;
        inputText.value = null;
    }
    else {
        jQuery('.remover-erro-dinamico').remove();
    }
}

function downloadDoc(idDocumento, origem) {
    location.href = content + "Documento/Download/?id=" + idDocumento + "&origem=" + origem;
}