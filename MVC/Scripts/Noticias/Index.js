$(document).ready(function () {
    LoadDataTables();
    $('.input-data').datepicker();
})

function LoadDataTables() {
    var table = jQuery("#IdGridNoticias").DataTable({
        responsive: { details: false },
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": ajaxUrl + "GridNoticias",
            "data": ObterParametros,
            "type": "POST"
        },
        "columns": [
            { "data": "Titulo" },
            { "data": "Resumo" },
            { "data": "GrupoLogado", "width": "10%" },
            { "data": "DataAtivacao", "width": "15%" },            
            { "data": "Situacao", "width": "10%" },
            {
                "render": function (data, type, row) {
                    var retorno = getButtonsGrid(row);
                    return retorno;
                }
                , "orderable": false, "width": "15%"
            }
        ],
        "order": [[0, 'desc']],
        lengthMenu: [10],
        bJQueryUI: true,
        bLengthChange: false,
        bFilter: false
    });
}

function getButtonsGrid(row) {
    return "<a class=\"btn btn-primary btn-sm\" href=" + content + "/Noticias/Alterar/" + row.Id + "\"><i class=\"glyphicon glyphicon-edit\"></i> Analisar &nbsp;</a> " +
        "<a class=\"btn btn-danger btn-sm\" onclick=\"Remover(" + row.Id + ")\"><i class=\"glyphicon glyphicon-trash\"></i> Excluir &nbsp;</a>";
}

function ObterParametros(dataTable) {

    var filtro = $("#form-noticias").serializeArray();
    var view = {};
    for (var i = 0; i < filtro.length; i++) {
        var item = filtro[i];
        view[item.name] = item.value;
    }

    view["DataTables"] = dataTable;
    return view;
}

function ReloadDataTables() {
    $('#IdGridNoticias').DataTable().ajax.reload();
}

function AplicarFiltro() {
    ReloadDataTables();
}

function LimparFiltros() {
    setTimeout(function () {
        $('#IdTitulo').val('').trigger('change');
        $('#IdResumo').val('').trigger('change');
        $('#DataAtivacao').val('').trigger('change');
        $('#IdSituacao').val('').trigger('change');
        $('#IdGrupoLogado').val('').trigger('change');
        ReloadDataTables();
    }, 1);
}

function Remover(noticiaId) {
    $('#ModelRemover').modal('show');
    jQuery("#removerNoticia").val(noticiaId)
}

function RemoverNoticia() {
    $('#ModelRemover').modal('hide');
    var parametros = "id=" + jQuery("#removerNoticia").val();

    jQuery.post(content + "Noticias/Remover", parametros)
    .success(function (data) {
        data = eval('(' + data + ')');
        if (Boolean(data.Sucesso) === true) {
            location.reload();
        }
    });
}