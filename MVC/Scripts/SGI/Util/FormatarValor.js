/**
 * Add two numbers.
 * Função para formatar o valor númerico com casas decimais
 *
 * É necessário passar o objeto em questão (this), o evento e um objeto literal contendo alguns dos seguintes parâmetros:
 *   casasDecimais, tamanhoDoCampo, separadorMilhar, separadorDecimal
 * Caso algum parâmetro não seja passado, os seguintes valores padrões serão utilizados:
 *   casasDecimais = 2, tamanhoDoCampo = 14, separadorMilhar = '.', separadorDecimal = ','
 * 
 * Exemplo de utilização:
 * <input type="text" maxlength="14" onkeyup="formatarDecimal(this, event, { casasDecimais: 4, tamanhoDoCampo: 14, separadorMilhar: '.', separadorDecimal: ','} );" style="text-align: right;" />
 * 
 * @param {valor} this, é o próprio campo.
 * @param {e} é o event.
 * @param {parametros} é um objeto complexo que tem os seguintes parâmetros: casasDecimais,tamanhoDoCampo, separadorMilhar e separadorDecimal
 * @returns valor formatado.   
 *
 * Autor: Filipe Bezerra de Souza                                               
 * Data de Criação: 14-08-2013                                                  
 * E-mail: filipe.bsouza@gmail.com
 *
 */
function formatarDecimal(valor, e, parametros) {

    var casasDecimais = parametros.casasDecimais || 2;
    var tamanhoDoCampo = parametros.tamanhoDoCampo || 14;
    var separadorMilhar = parametros.separadorMilhar || ".";
    var separadorDecimal = parametros.separadorDecimal || ",";

    var evento = e || window.event;

    var keycode = evento.charCode || evento.keyCode || evento.which;

    // Certificando que apenas números foram pressionados
    // keycode == 8 - Tecla BackSpace
    // keycode == 46 - Tecla Delete
    if ((keycode >= 48 && keycode <= 57) || (keycode >= 96 && keycode <= 105) || keycode === 8 || keycode === 9 || keycode === 46) {

        var i = j = 0;
        var auxiliar = valorAntesDoSeparadorDecimal = valorDepoisDoSeparadorDecimal = novoValor = '';

        var objeto = separarValores(valor.value, separadorDecimal);

        valorAntesDoSeparadorDecimal = objeto.valorAntesDoSeparadorDecimal;
        valorDepoisDoSeparadorDecimal = objeto.valorDepoisDoSeparadorDecimal;

        // Se a tecla BackSpace for pressionada os valores sofrerão o tratamento inverso, os valores antes da casa decimal passarão para depois da casa decimal
        if (keycode === 8 || keycode === 46) {
            var aux = aux2 = '';

            aux = valorAntesDoSeparadorDecimal.charAt(valorAntesDoSeparadorDecimal.length - 1);
            valorAntesDoSeparadorDecimal = valorAntesDoSeparadorDecimal.substring(0, valorAntesDoSeparadorDecimal.length - 1);
            valorDepoisDoSeparadorDecimal = aux + valorDepoisDoSeparadorDecimal;

            // No caso de haver apenas números após a casa decimal, jogo o valor para a variavel valorAntesDoSeparadorDecimal e zero a variavel valorDepoisDoSeparadorDecimal
            // Apenas para que a propria funcao possa formatar corretamente o valor
            if (valorAntesDoSeparadorDecimal.length === 0 && valorDepoisDoSeparadorDecimal.length > 1) {
                valorAntesDoSeparadorDecimal = valorDepoisDoSeparadorDecimal;
                valorDepoisDoSeparadorDecimal = '';
            }
        }

        // Passando os valores que excedem as casas decimais para antes da casa decimal
        if (valorDepoisDoSeparadorDecimal.length > casasDecimais) {
            // Vejo quantos números terei de passar para antes da vírgula
            var diferenca = valorDepoisDoSeparadorDecimal.length - casasDecimais;

            var passarParaAntesDoSeparadorDecimal = '';
            auxiliar = '';

            // Guardo os números que vão para antes da casa decimal, bem como a nova formação numérica que será apresentada depois das casas decimais
            for (i = 0; i < diferenca; i++) {
                passarParaAntesDoSeparadorDecimal += valorDepoisDoSeparadorDecimal.charAt(i);
                auxiliar = valorDepoisDoSeparadorDecimal.substring(i + 1, valorDepoisDoSeparadorDecimal.length);
            }

            valorDepoisDoSeparadorDecimal = auxiliar;

            var num = 0;

            // Eliminando o excesso de zeros a esquerda por meio do parseInt
            if (passarParaAntesDoSeparadorDecimal.length > 0
                && verificarValorZerado(passarParaAntesDoSeparadorDecimal)) {
                num = parseInt(passarParaAntesDoSeparadorDecimal, 10);
            }

            // Se o valor for maior que zero eu concateno antes da casa decimal
            // Ou se o usuário tiver digitado zero intencionalmente
            // Ou for um zero que está no meio de um número como em: 1.504,5148
            if (num > 0 || (keycode === 48 || keycode === 96) || !verificarValorZerado(passarParaAntesDoSeparadorDecimal)) {
                // Quando o valor estiver com zero é necessário limpá-lo
                if (valorAntesDoSeparadorDecimal === '0') {
                    valorAntesDoSeparadorDecimal = '';
                }

                valorAntesDoSeparadorDecimal += num.toString();
                num = parseInt(valorAntesDoSeparadorDecimal, 10);
                valorAntesDoSeparadorDecimal = num.toString();
            }
        }

        // Se o número for menor que a quantidade de casas decimais, faço a inserção dos zeros a esquerda e do separador de casas decimais
        if (valorDepoisDoSeparadorDecimal.length === 0 && valorAntesDoSeparadorDecimal.length <= casasDecimais) {
            diferenca = casasDecimais - valorAntesDoSeparadorDecimal.length;

            novoValor = '0' + separadorDecimal;

            for (i = 0; i < diferenca; i++) {
                novoValor += '0';
            }

            novoValor += valorAntesDoSeparadorDecimal;
        }
        else {
            // Resolvendo o bug de segurar o botão de um numero
            if (valorAntesDoSeparadorDecimal.length > 0 && valorDepoisDoSeparadorDecimal.length === 0) {
                valorDepoisDoSeparadorDecimal = valorAntesDoSeparadorDecimal.substring(valorAntesDoSeparadorDecimal.length - casasDecimais, valorAntesDoSeparadorDecimal.length);
                valorAntesDoSeparadorDecimal = valorAntesDoSeparadorDecimal.substring(0, valorAntesDoSeparadorDecimal.length - casasDecimais);
            }

            // Inserindo o separador de milhar
            if (valorAntesDoSeparadorDecimal !== '0' && valorAntesDoSeparadorDecimal.length > 3) {

                // Valor antes da casa decimal já corrigido com separador de milhar
                valorAntesDoSeparadorDecimal = inserirSeparadorDeMilhar(valorAntesDoSeparadorDecimal, separadorMilhar);
            }

            // Montando o novo valor já formatado
            novoValor = formatarNovoValor(valorAntesDoSeparadorDecimal, separadorDecimal, valorDepoisDoSeparadorDecimal, casasDecimais);

            if (novoValor.length > tamanhoDoCampo) {
                diferenca = novoValor.length - tamanhoDoCampo;

                objeto = removerExcessosDepoisDoSeparadorDecimal(diferenca, novoValor, separadorDecimal);
                valorAntesDoSeparadorDecimal = objeto.valorAntesDoSeparadorDecimal;
                valorDepoisDoSeparadorDecimal = objeto.valorDepoisDoSeparadorDecimal;

                // Valor antes da casa decimal já corrigido com separador de milhar
                valorAntesDoSeparadorDecimal = inserirSeparadorDeMilhar(valorAntesDoSeparadorDecimal, separadorMilhar);

                // Montando o novo valor já formatado
                novoValor = formatarNovoValor(valorAntesDoSeparadorDecimal, separadorDecimal, valorDepoisDoSeparadorDecimal, casasDecimais);
            }
        }

        // Atribuindo um novo valor para o campo
        valor.value = novoValor;
    }
    else {
        return false;
    }
}

function verificarValorZerado(passarParaAntesDoSeparadorDecimal) {
    if (passarParaAntesDoSeparadorDecimal !== '0' && passarParaAntesDoSeparadorDecimal !== '00'
        && passarParaAntesDoSeparadorDecimal !== '000' && passarParaAntesDoSeparadorDecimal !== '0000') {
        return true;
    }
    else {
        return false;
    }
}

function separarValores(valor, separadorDecimal) {
    // String de validação para certificar-se de que apenas números sejam colocados
    var stringDeValidacao = '0123456789';
    var auxiliar = valorAntesDoSeparadorDecimal = valorDepoisDoSeparadorDecimal = '';
    var i = 0;

    // Pegando o valor do que está antes da vírgula e depois dela
    for (i = 0; i < valor.length; i++) {
        if (stringDeValidacao.indexOf(valor.charAt(i)) !== -1) {
            valorAntesDoSeparadorDecimal += valor.charAt(i);
        }
        else if (valor.charAt(i) === separadorDecimal) {
            auxiliar += valor.substring(i + 1, valor.length);
            // Como pego todos os números depois da vírgula de uma só vez, é necessário utilizar o comando break para forçar a saída do laço for
            break;
        }
    }

    // Validando os valores depois da vírgula
    for (i = 0; i < auxiliar.length; i++) {
        if (stringDeValidacao.indexOf(auxiliar.charAt(i)) !== -1) {
            valorDepoisDoSeparadorDecimal += auxiliar.charAt(i);
        }
    }

    var objeto = {
        valorAntesDoSeparadorDecimal: valorAntesDoSeparadorDecimal,
        valorDepoisDoSeparadorDecimal: valorDepoisDoSeparadorDecimal
    };

    return objeto;
}

function inserirSeparadorDeMilhar(valor, separadorMilhar) {
    var aux = aux2 = '';

    // Vou pegando os valores antes da casa decimal em ordem decrescente, de três em três, para inserir o separador de milhar
    for (i = valor.length; i !== 0; i -= 3) {
        aux = separadorMilhar + valor.substring(i - 3, i) + aux;
        aux2 = valor.substring(0, i - 3);

        if (aux2.length <= 3) {
            aux = aux2 + aux;
            break;
        }
    }

    return aux;
}

function removerExcessosDepoisDoSeparadorDecimal(diferenca, valor, separadorDecimal) {
    var valorAntesDoSeparadorDecimal = valorDepoisDoSeparadorDecimal = '';
    var aux = aux2 = '';

    var objeto = separarValores(valor, separadorDecimal);

    aux = objeto.valorAntesDoSeparadorDecimal;
    aux2 = objeto.valorDepoisDoSeparadorDecimal;

    valorDepoisDoSeparadorDecimal = '';
    valorDepoisDoSeparadorDecimal = aux.substring(aux.length - diferenca, aux.length);
    valorDepoisDoSeparadorDecimal += aux2.substring(0, aux2.length - diferenca);
    valorAntesDoSeparadorDecimal = aux.substring(0, aux.length - diferenca);

    objeto = {
        valorAntesDoSeparadorDecimal: valorAntesDoSeparadorDecimal,
        valorDepoisDoSeparadorDecimal: valorDepoisDoSeparadorDecimal
    };

    return objeto;
}

function formatarNovoValor(valorAntesDoSeparadorDecimal, separadorDecimal, valorDepoisDoSeparadorDecimal, casasDecimais) {
    if (valorDepoisDoSeparadorDecimal.length > casasDecimais) {
        var diferenca = valorDepoisDoSeparadorDecimal.length - casasDecimais;

        var objeto = removerExcessosDepoisDoSeparadorDecimal(diferenca, novoValor, separadorDecimal);
        valorAntesDoSeparadorDecimal = objeto.valorAntesDoSeparadorDecimal;
        valorDepoisDoSeparadorDecimal = objeto.valorDepoisDoSeparadorDecimal;
    }

    return valorAntesDoSeparadorDecimal + separadorDecimal + valorDepoisDoSeparadorDecimal;
}