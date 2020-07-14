// poner funcion de sacar espacios en blancos

function quitarEspacios(texto) {
    var _nuevoTexto = "";
    for (var i = 0; i < texto.length; i++) {
        if (texto.charAt(i) !== " ") {
            _nuevoTexto += texto.charAt(i);
        }
    }
    return _nuevoTexto;
}


function inputVacio(texto) {
    var _sinTexto;
    if (texto === "") {
        _sinTexto = -1;
    }
    return _sinTexto;
}

function contieneNumero(texto) { //verificar si tiene un numero
    var _numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    var _resultado = false;
    for (var i = 0; i <= texto.length; i++) {
        for (var j = 0; j < _numeros.length; j++) {
            if (texto[i] === _numeros[j]) {
                _resultado = true;
                break;
            }
        }
    }
    return _resultado;
}


function contieneLetra(texto) {  //verificar si tiene letra
    var _letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
        "s", "u", "v", "w", "x", "y", "z"];

    var _resultado = false;
    for (var i = 0; i < texto.length; i++) {
        for (var j = 0; j <= _letras.length; j++) {
            if (texto[i] === _letras[j]) {
                _resultado = true;
                break;
            }
        }
    }
    return _resultado;
}


function buscarAlgo(_texto, _datoBuscado) {
    var _noEsta = -1;
    for (var i = 0; i < _texto.length; i++) {
        if (_texto.charAt(i) === _datoBuscado) {
            _noEsta = 1;
            break;
        }
    }
    return _noEsta;
}


function buscarPuntoCom(_texto) {
    var _noEsta = -1;
    var _posision = _texto.indexOf(".");
    if (_posision >= 0) {
        var _textoNuevo = _texto.substr(_posision);
        for (var i = 0; i < _texto.length; i++) {
            if (_textoNuevo === ".com") {
                _noEsta = 1;
                break;
            }
        }
    }
    return _noEsta;
}


function ordenar(_a, _b) { //ORDENAR DE MAYOR A MENOR PARA LLAMARLA SE DEBE PONER    VARIABLE.sort(ordenar);
    var _dev;
    if (_a.reservasEfectuadas > _b.reservasEfectuadas) {
        _dev = -1;
    } else {
        _dev = 1;
    }
    return _dev;
}


function ordenarPorFecha(_a, _b) { //ORDENAR DE MAYOR A MENOR PARA LLAMARLA SE DEBE PONER    VARIABLE.sort(ordenarPorFecha);
    var _dev;
    if (_a.fecha > _b.fecha) {
        _dev = -1;
    } else {
        _dev = 1;
    }
    return _dev;
}


function ordenarPorDestacada(_a, _b) { //ORDENAR DE MAYOR A MENOR PARA LLAMARLA SE DEBE PONER    VARIABLE.sort(ordenarPorDestacada);
    var _dev;
    if (_a.destacada > _b.destacada) {
        _dev = -1;
    } else {
        _dev = 1;
    }
    return _dev;
}


function queFechaEs() { 
var fechaAhora = new Date ();
    var dia = fechaAhora.getDate();
    var anio = fechaAhora.getFullYear();
    var mes = (fechaAhora.getMonth());
    var _fecha = "";

    if (mes < 9) {
        var modificada = mes + 1;
        modificada = modificada.toString();
        modificada = "0" + modificada;
        mes = modificada;
    } else {
        var modificada = mes + 1;
        modificada = modificada.toString();
        mes = modificada;
    }
    _fecha = anio.toString() + "-" + mes + "-" + dia.toString();
    return _fecha; 
}