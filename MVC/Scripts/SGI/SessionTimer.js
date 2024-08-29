var SessionTimer = (function () {
    function SessionTimer(url, timeout) {
        this.url = url;
        this.timeout = timeout;
        this.timerInicial = new Date(timeout * 60 * 1000);
        this.horaInicial = new Date();
    }

    SessionTimer.prototype.Iniciar = function () {
        var _this = this;

        this.intervalId = setInterval(function () {
            var horaAtual = new Date();
            var diferenca = +_this.timerInicial - (+horaAtual - +_this.horaInicial);
            if (diferenca < 0) {
                diferenca = 0;
            }

            if (diferenca < 60000 && !_this.popupaberto) {
                _this.popupaberto = true;

                Mensagem({
                    titulo: "Tempo de Expiração 🕒",
                    tipo: "alerta",
                    "texto": "<span>Sua Sessão irá expirar em: </span> <h3 data-sessao-timeout></h3>Clique em <b>OK</b> para renová-la!",
                    dialog: true,
                    databackdrop: 'static',
                    OkEvent: function () { return _this.Renovar(); }
                });
            }

            if (diferenca === 0) {
                $('.modal').hide();
                $('.modal-backdrop').hide();
                var obj = {
                    Titulo: 'SESSÃO EXPIRADA',
                    Mensagem: 'Sua Sessão foi expirada, favor acessar novamente pelo ICMS Transparente.',
                    TipoMensagem: 3
                };

                $.ajax({
                    type: 'POST',
                    url: content + 'Home/SessaoEncerrada',
                    data: { instancia: obj },
                    dataType: 'html',
                    success: function (response) {
                        jQuery("#main").html(response);
                    }
                });
                return _this.Parar();
            }

            var timer = new Date(diferenca);
            var formatado = (timer.getUTCHours() < 10 ? "0" + timer.getUTCHours() : timer.getUTCHours()) + ":" +
                            (timer.getUTCMinutes() < 10 ? "0" + timer.getUTCMinutes() : timer.getUTCMinutes()) + ":" +
                            (timer.getUTCSeconds() < 10 ? "0" + timer.getUTCSeconds() : timer.getUTCSeconds());
            $("[data-sessao-timeout]").text(formatado);
        }, 1000);

    };

    SessionTimer.prototype.Renovar = function () {
        var _this = this;
        $.get(this.url).done(function () {
            _this.horaInicial = new Date();
            _this.popupaberto = false;
        });

    };

    SessionTimer.prototype.Parar = function () {
        clearInterval(this.intervalId);
    };

    return SessionTimer;
}());