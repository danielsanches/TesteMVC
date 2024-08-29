var pressed = 0;
var checkWebkitandIE;
var checkMoz;

jQuery(document).keypress(function (e) {

    mostrarMainTrix(e);
    ultGenji(e);
    ultHanzo(e);
    inserirContinues(e);
});

function mostrarMainTrix(e) {
    checkWebkitandIE = (e.which === 26 ? 1 : 0);
    checkMoz = (e.which === 122 && e.ctrlKey ? 1 : 0);

    if (checkWebkitandIE || checkMoz) {
        pressed++;

        if (pressed === 4) {
            $("#main_trix").show();
        }
        else {
            jQuery("#main_trix").hide();
        }
    }
}

function mostrarCreditos(e) {
    checkMoz = (e.keyCode === 10 && e.ctrlKey ? 1 : 0);

    if (checkWebkitandIE || checkMoz) {
        var classeCredit = $("#credits").attr("class");
        if (classeCredit.search('hidden')) {
            $("#credits").toggleClass('wrapper wrapper-hidden');
            $("#credits").show();
        }
        else {
            $("#credits").toggleClass('wrapper-hidden wrapper');
            $("#credits").hide();
        }
    }
}

function ultGenji(e) {
    checkWebkitandIE = (e.keyCode === 34 ? 1 : 0);

    if (checkWebkitandIE) {
    }
}

function ultHanzo(e) {
    checkWebkitandIE = (e.keyCode === 33 ? 1 : 0);

    if (checkWebkitandIE) {
    }
}

function inserirContinues(e) {
    checkWebkitandIE = (e.keyCode === 29 && e.ctrlKey ? 1 : 0);

    if (checkWebkitandIE) {
        jQuery("#main_trix").hide();

        if (pressed <= 4)
            alert("Hard reset");

        if (pressed > 4)
            alert("Another coin inserted");

        pressed = 0;
    }
}

function send() {
    document.getElementById("xee").submit();
}

var c = document.getElementById("c");
var ctx = c.getContext("2d");

//faz o canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;


//caracteresDaChuva
var caracteresDaChuva = "0 1";
//converte a string em um array de caracteres unicode
caracteresDaChuva = caracteresDaChuva.split("");

var font_size = 10;
var columns = c.width / font_size; //numero de colunas da chuva.

//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns; x++)
    drops[x] = 1;

//drawing the characters
function draw() {
    // document.body.style.background = "#ccc";
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#0F0"; //green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for (var i = 0; i < drops.length; i++) {
        //a random chinese character to print
        var text = caracteresDaChuva[Math.floor(Math.random() * caracteresDaChuva.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
}

setInterval(draw, 33);

