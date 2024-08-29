$.extend(true, $.fn.dataTable.defaults, {
    processing: true,
    select: {
        style: "api" //"single":Seleciona a row; "api":Não seleciona a row
        },
    responsive: true,
    deferRender: true,
    searching: true,
    ordering: true,
    lengthMenu: [10, 20, 40, 60],
    pageLength: 10,
    language: {
        sEmptyTable: "Nenhum registro encontrado",
        sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        sInfoEmpty: "Mostrando 0 até 0 de 0 registros",
        sInfoFiltered: "(Filtrados de _MAX_ registros)",
        sInfoPostFix: "",
        sInfoThousands: ".",
        sLengthMenu: "_MENU_ Resultados por página",
        sLoadingRecords: "Carregando...",
        sProcessing: "Processando...",
        sZeroRecords: "Nenhum registro encontrado",
        sSearch: "Pesquisar",
        oPaginate: {
            sNext: "Próximo",
            sPrevious: "Anterior",
            sFirst: "Primeiro",
            sLast: "Último"
        },
        oAria: {
            sSortAscending: ": Ordenar colunas de forma ascendente",
            sSortDescending: ": Ordenar colunas de forma descendente"
        },
        select: {
            rows: {
                _: ""
            }
        }
    }
});

var DataTableRenders = function () {
    function DataTableRenders() {

    }
    DataTableRenders.Valor = function (data) {
        var numero = parseFloat(data);
        if (isNaN(numero)) {
            return data;
        }
        return accounting.formatNumber(numero);
    };

    DataTableRenders.Data = function (data) {
        var m = moment(data);
        if (m.isValid()) {
            return m.format("L");
        }
        return data;
    };

    DataTableRenders.DataHora = function (data) {
        var m = moment(data);
        if (m.isValid()) {
            return m.format("L LT");
        }
        return data;
    };

    return DataTableRenders;
}();


window.moment.locale("pt-br");

jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "date-br-pre": function (a) {
        if (a == null || a == "") {
            return 0;
        }
        var brDatea = a.split('/');
        return (brDatea[2] + brDatea[1] + brDatea[0]) * 1;
    },

    "date-br-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "date-br-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});