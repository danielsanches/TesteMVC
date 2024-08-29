$(document).ready(function () {
    $(this).scrollTop(0);
    $.fn.select2.defaults.set("language", "pt-BR");
    $("select").select2({ width: "100%", theme: "bootstrap" });
});

function PreencherDropDownList(campo, data) {

    var lista = $("#" + campo);
    lista.empty();
    var option = $("<option />");
    option.attr('value', "").text("Selecione...");
    lista.append(option);

    for (var i = 0; i < data.length; i++) {
        option = $("<option />");
        var item = data[i];
        option.attr('value', item.Id).text(item.Descricao);
        lista.append(option);
    }
}

//--Tratamento para retornar para Aba anteriormente selecionada--
// Javascript to enable link to tab
var hash = document.location.hash;
var prefix = "tab_";

if (hash) {
    $(".nav-tabs a[href='" + hash.replace(prefix, "") + "']").tab("show");
}

// Change hash for page-reload
$(".nav-tabs a").on("shown.bs.tab", function (e) {
    window.location.hash = e.target.hash.replace("#", "#" + prefix);
});

$(".divAbas").show();
//--Fim tratamento das Abas--

jQuery('.remover-erro-dinamico').remove(); //Remove os erros incluidos pela funcao addValidationError no script Scripts/Validation/AddFormValidationError

//Remove autocomplete dos formulários
$("form").attr('autocomplete', 'off');

$(function () {
    $(".submit-ajax").click(function () {
        executarSubmit();
    });
});