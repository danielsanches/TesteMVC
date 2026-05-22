$(document).ready(function () {
    $("#GrupoId").on("change", function () {
        ResetarDropDowns();
        $("#DIVFrigorifico, #DIVProdutor, #DIVTecnico, #DIVClassificadora, #DIVCertificadora, #DIVTerceiros, #DIVTecnicosClassificadores, #DIVIndustriaLaticinio").hide();
        switch (this.value) {
            case "756": case "761": case "774": case "775": case "962": case "967": case "1007": case "1008": case "2005": case "2007":
                $("#DIVGerencial").toggle();
                break;
            case "960": case "754": case "1998":
                $("#DIVTecnico").toggle();
                break;
            case "963": case "757": case "2001":
                $("#DIVProdutor").toggle();
                break;
            case "965": case "759": case "2003":
                $("#DIVClassificadora").toggle();
                break;
            case "1021": case "788": case "2008":
                $("#DIVCertificadora").toggle();
                break;
            case "966": case "760": case "2004":
                $("#DIVFrigorifico").toggle();
                break
            case "1144": case "2011": case "893":
                $("#DIVTerceiros").toggle();
                break
            case "1035": case "800": case "2009":
                $("#DIVTecnicosClassificadores").toggle();
                break
            case "2495": case "2532": case "1302":
                $("#DIVIndustriaLaticinio").toggle();
                break
            default:
        }
    });

    $("#IeFrigorifico, #IeProdutor, #CpfTecnico, #IeClassificadora, #IeCertificadora, #LoginTerceiro, #LoginTecnicoClassificador, #IeIndustriaLaticinio").on("change", function () {

        if (this.value != "") {

            LoadDadosFrigorifico(this.value, this.id);

        }
    });

    DDLProdutores();

    $("form").on("submit", function (e) {
        if ($("#primeiroAcesso").is(":visible")) {
            var loginInput = $("#LoginIcms");
            var erroSpan = $("#erroLoginIcms");

            if (!loginInput.val().trim()) {
                e.preventDefault();
                erroSpan.show();
                loginInput.addClass("is-invalid");

                setTimeout(function () {
                    erroSpan.hide();
                }, 2000);
            } else {
                erroSpan.hide();
                loginInput.removeClass("is-invalid");
            }
        }
    });

    $('#LoginIcms').on('input', function () {
        let valor = $(this).val();

        valor = valor.replace(/\D/g, '');

        if (valor.length > 14) {
            valor = valor.substring(0, 14);
        }

        $(this).val(valor);
    });


});

$(document).on('keyup', '.select2-search__field', function (e) {
    var $element = $(e.target);
    var valorCampo = $element.val();
    var valorLimpo = valorCampo.replace(/[^a-zA-Z0-9\s]/g, '');
    $element.val(valorLimpo).trigger('input');
})

function LoadDadosFrigorifico(IeCpf, Origem) {
    $("#div-dados-perfil").load(content + "Perfil/BuscarDados?IeCpf=" + IeCpf + "&Origem=" + Origem, function () {
        $("#painel-dados-perfil").slideDown();
        ManipularBotaoSelecionar(Origem);

    });
}

function ManipularBotaoSelecionar(origem) {
    MostrarTagPorId('btn-selecionar-origem');
    EsconderTagPorId('msg-certificadora-nao-aprovada');

    if (!ValidarCertificadora(origem)) {
        EsconderTagPorId('btn-selecionar-origem');
        MostrarTagPorId('msg-certificadora-nao-aprovada');
    }
}

function ValidarCertificadora(origem) {
    var situacao_certificadora = document.getElementById('situacao_certificadora');

    if ((origem == 'IeCertificadora') && (situacao_certificadora.value == "EmPreenchimento"))
        return true;

    if ((origem == 'IeCertificadora') && (situacao_certificadora.value != "Aprovado"))
        return false;

    return true;
}

function MostrarTagPorId(id) {
    var artefato = document.getElementById(id);
    artefato.style.display = 'block';
}

function EsconderTagPorId(id) {
    var tag = document.getElementById(id);
    tag.style.display = 'none';
}

function ResetarDropDowns() {
    $("#IeFrigorifico, #IeProdutor, #CpfTecnico, #IeClassificadora, #IeCertificadora, #LoginTerceiro, #LoginTecnicoClassificador, #IeIndustriaLaticinio").val("").trigger("change");
    $("#Usuario").val("");
    $("#div-dados-perfil").html("");
    $("#painel-dados-perfil").slideUp();
}

function DDLProdutores() {
    $("#IeProdutor").select2({
        allowClear: true,
        ajax: {
            url: content + "Perfil/BuscarProdutorDropDown",
            type: "POST",
            dataType: "json",
            delay: 1000,
            global: false,
            data: ObterParam,
            processResults: function (data, params) {
                params.page = params.page || 1;
                return {
                    results: data.result,
                    pagination: {
                        more: (params.page * 200) < data.Counts
                    }
                }
            },
            cache: true
        },
        placeholder: {
            id: '0',
            text: 'Selecione...'
        },
        width: '100%',
        minimumInputLength: 4,
        theme: "bootstrap"
    });
}

function ObterParam(params) {
    return {
        keyword: params.term ? params.term : "a",
        pageSize: 200,
        page: params.page || 1
    };
}