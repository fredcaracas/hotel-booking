/* global usuarios, ofertas, reservas, usuarioActual, ordenar, numeroDeReserva, favoritos, ordenar2, usuarioDefault, idActualDeAgregarOferta, ordenarPorFecha, ordenarPorDestacada */

$(".seccion").hide();
$(".btn").hide();
$(".noUser").show();
$("#seccionBienvenida").show(); //mostrar div de inicio
top5();

$(".btn").click(mostrarSeccion); //mostrar el div segun donde hago click

function mostrarSeccion() {//mostrar el div segun donde hago click
    $(".seccion").hide();
    top5();
    var _idBtn = $(this).attr("id");
    var _idSeccion = _idBtn.charAt(3).toLowerCase() +
            _idBtn.substring(4);
    $("#" + _idSeccion).show();

    switch (_idBtn) {
        case "btnSeccionHabilitarOfertas":
            habilitarOfertas();
            break;
        case "btnSeccionHabilitarUsuarios":
            habilitarUsuarios();
            break;
        case "btnSeccionOfertas":
            armarListadoOfertas();
            break;
        case "btnSeccionVerificarReservas":
            mostrarReservas();
            break;
        case "btnSeccionMostrarOfertasFavoritas":
            mostrarOfertasFavoritas();
            break;
        case "btnSeccionEstadoDeCuenta":
            mostrarEstadoDeCuenta();
            break;
        case "btnSeccionLogin":
            $("#pIniciarSesion").empty();
            break;
        case "btnSeccionCerrarSesion":
            $("#pCerrarSesion").empty();
            break;
        case "btnSeccionEstadisticas":
            mostrarSelectEstadisticas();
            break;
        case "btnSeccionMostrarOfertasReservadas":
            mostrarOfertasReservadas();
            break;
    }
}

function top5() { // funcion para mostrar en lateral las 5 ofertas mas compradas
    ofertas.sort(ordenarPorDestacada); // llamar a la funcion para ordenarPorDestacada de mayor a menor objet destacada
    $("#tblTop5").empty();

    for (var i = 0; i < 5; i++) {
        var _fechaAhora = queFechaEs();
        var fechaHabilitada = false;
        var _usuarioLogeado = false;
        var _msj;
        var _msj2;

        if (ofertas[i].habilitado) {
            _msj = "Habilitado";
            _msj2 = "Reservar";
        } else {
            _msj = "Deshab";
            _msj2 = "Reservar";
        }
        $("#tblTop5").append("<tr><td>Paquete " + ofertas[i].nombre + "<br>Estrellas: " + ofertas[i].estrellas
                + "<br>Precio: $" + ofertas[i].precio + "<br>Dirección " +
                ofertas[i].direccion + "<br>Ubicación " + ofertas[i].ubicacion + "<br>Validez " + ofertas[i].validez
                + "</td><td><img src='imagenesproyecto/" + ofertas[i].foto + "'></td><td><input class='reservar' id='btn"
                + ofertas[i].id + "' data-idoferta='" + ofertas[i].id + "' type='button' value='" + _msj2 +
                "'><input class='favorito' id='btnFavoritoTop" + ofertas[i].id + "' data-favorito='"
                + ofertas[i].id + "' type='button' value='Agregar a favorito'><input class='destacar' id='btnTop5Destacar"
                + ofertas[i].id + "' data-destacar='" + ofertas[i].id +
                "' type='button' value='Destacar oferta'></td></tr>");

        if (_fechaAhora < ofertas[i].validez) { // si la fecha de hoy es menor que la de validez
            fechaHabilitada = true;
        }
        if (usuarioActual.tipo === "user") {
            _usuarioLogeado = true;
        }
        if (_msj === "Deshab" || fechaHabilitada === false || _usuarioLogeado === false) {
            // si esta pasado de fecha de validez o no fue habilitado o no se un user el usuario actual por el admin se bloquea el button
            $("#btn" + ofertas[i].id).attr("disabled", "disabled");
            $("#btnFavoritoTop" + ofertas[i].id).attr("disabled", "disabled");
        }
        if (_msj === "Deshab" || usuarioActual.tipo !== "admin" || fechaHabilitada === false) {
            $("#btnTop5Destacar" + ofertas[i].id).attr("disabled", "disabled");
        }
    }
    $(".reservar").click(reservarOferta);
    $(".favorito").click(agregarAFavoritos);
    $(".destacar").click(destacarMas);
}


function agregarAFavoritos() {
    var _idOferta = Number($(this).attr("data-favorito")); // tomo el dato de data-favorito
    var _comprador = JSON.parse(JSON.stringify(usuarioActual)); // hace que cuando copie el array al yo modificar la variable _comprador no se podifique el dato del array original
    _comprador.idOferta = _idOferta;
    var _noSeEncuentra = false;
    for (var i = 0; i < favoritos.length; i++) {
        if (favoritos[i].idOferta === _idOferta && favoritos[i].usuario === usuarioActual.usuario) { // ver si la oferta seleccionada ya esta en los favoritos del usuario 
            _noSeEncuentra = true;                  // teniendo en cuenta los datos del usuario logeado
            break;
        }
    }
    if (_noSeEncuentra === false) { //si no aun no se agrego a favorito
        favoritos.push(_comprador);
        alert("Esta oferta se agrego a sus favoritas");
    } else {
        alert("Esta oferta ya la tienes agregada a favoritas");
    }
}


function reservarOferta() {
    var _idOferta = Number($(this).attr("data-idoferta")); // tomo el dato de data-idoferta
    var _comprador = JSON.parse(JSON.stringify(usuarioActual)); // hace que cuando copie el array al yo modificar la variable _comprador no se podifique el dato del array original
    _comprador.idOfertaReservada = _idOferta;
    _comprador.estado = "Pendiente";
    _comprador.idReserva = ++numeroDeReserva;
    _comprador.fecha = queFechaEs();

    reservas.push(_comprador);
    alert("Su reserva fue efectuada con exito");
}


function armarListadoOfertas() { // Seccion (ofertas)   
    ofertas.sort(ordenarPorDestacada); // ordenar el array ofertas por las mas destacadas
    $("#tblMostrarOfertas").empty();

    for (var i = 0; i < ofertas.length; i++) {
        var _fechaAhora = queFechaEs();
        var fechaHabilitada = false;
        var _usuarioLogeado = false;
        var _msj;
        var _msj2;

        if (ofertas[i].habilitado) {
            _msj = "Habilitado";
            _msj2 = "Reservar";
        } else {
            _msj2 = "Reservar";
            _msj = "Deshab";
        }
        $("#tblMostrarOfertas").append("<tr><td>Paquete: " + ofertas[i].nombre + "<br>" +
                "Estrellas: " + ofertas[i].estrellas + "<br>" + "Precio: $" +
                ofertas[i].precio + "<br>Dirección: " + ofertas[i].direccion + "<br>Ubicación: " + ofertas[i].ubicacion +
                "<br>Validez: " + ofertas[i].validez + "</td><td><img src='imagenesproyecto/" + ofertas[i].foto +
                "'></td><td><input class='reservar' id='btnOfertas" + ofertas[i].id + "' data-idoferta='" + ofertas[i].id +
                "' type='button' value='" + _msj2 + "'><input class='favorito' id='btnFavoritoOfertas" + ofertas[i].id +
                "' data-favorito='" + ofertas[i].id +
                "' type='button' value='Agregar a favorito'><input class='destacar' id='btnOfertasDestacar"
                + ofertas[i].id + "' data-destacar='" + ofertas[i].id +
                "' type='button' value='Destacar oferta'></td></tr>");

        if (_fechaAhora < ofertas[i].validez) {
            fechaHabilitada = true;
        }
        if (usuarioActual.tipo === "user") {
            _usuarioLogeado = true;
        }
        if (_msj === "Deshab" || fechaHabilitada === false || _usuarioLogeado === false) {
            // si esta pasado de fecha de validez, no fue habilitado o la ofer esta deshab por el admin se bloquea el boton
            $("#btnOfertas" + ofertas[i].id).attr("disabled", "disabled");
            $("#btnFavoritoOfertas" + ofertas[i].id).attr("disabled", "disabled");
        }
        if (_msj === "Deshab" || usuarioActual.tipo !== "admin" || fechaHabilitada === false) {
            $("#btnOfertasDestacar" + ofertas[i].id).attr("disabled", "disabled");
        }
    }
    $(".reservar").click(reservarOferta);
    $(".favorito").click(agregarAFavoritos);
    $(".destacar").click(destacarMas);
}


function destacarMas() {
    var _idOferta = Number($(this).attr("data-destacar")); // tomar el dato de data-destacar
    var _idBuscado;
    for (var i = 0; i < ofertas.length; i++) {
        if (ofertas[i].id === _idOferta) { //buscar el id de la oferta clickeada en el array ofertas
            _idBuscado = i;
            break;
        }
    }
    ofertas[_idBuscado].destacada++;
    alert("A esta oferta se le sibio un punto de destaque");
}


function mostrarOfertasFavoritas() { // Seccion (ofertas) 
    ofertas.sort(ordenarPorDestacada);   // ordenar por destacados
    $("#tblMostrarOfertasFavoritas").empty();
    for (var j = 0; j < favoritos.length; j++) {
        if (usuarioActual.usuario === favoritos[j].usuario) {
            //este if es para guardar la oferta que coincide con el usuario
            for (var i = 0; i < ofertas.length; i++) {
                var _fechaAhora = queFechaEs();
                var fechaHabilitada = false;
                var _usuarioLogeado = false;

                if (ofertas[i].id === favoritos[j].idOferta) {
                    $("#tblMostrarOfertasFavoritas").append("<tr><td>Paquete " + ofertas[i].nombre + "<br>" +
                            "Estrellas: " + ofertas[i].estrellas + "<br>" + "Precio: $" +
                            ofertas[i].precio + "<br>Dirección " + ofertas[i].direccion +
                            "<br>Ubicación" + ofertas[i].ubicacion + "<br> Validez " +
                            ofertas[i].validez + "</td><td><img src='imagenesproyecto/" +
                            ofertas[i].foto + "'></td><td><input class='reservar' id='btnOfertasFavoritos" +
                            ofertas[i].id + "' data-idoferta='" + ofertas[i].id +
                            "' type='button' value='Reservar'></td></tr>");

                    if (_fechaAhora < ofertas[i].validez) {
                        fechaHabilitada = true;
                    }
                    if (usuarioActual.tipo === "user") {
                        _usuarioLogeado = true;
                    }
                    if (fechaHabilitada === false || _usuarioLogeado === false) {
                        // si esta pasado de fecha de validez o no fue habilitado por el admin se bloquea el button
                        $("#btnOfertasFavoritos" + ofertas[favoritos[i].idOferta].id).attr("disabled", "disabled");
                    }
                }
            }
        }
    }
    $(".reservar").click(reservarOferta);
}


function mostrarReservas() {   //  Seccion (Verificar reservas). Confirmar o denegar reservas
    $("#tblVerificarReservas").empty();
    var _msj = "Confirmar";
    var _msj2 = "Denegar";

    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].estado === "Pendiente") {
            for (var j = 0; j < ofertas.length; j++) {
                if (ofertas[j].id === reservas[i].idOfertaReservada) {
                    //Si id de oferta coincide con el id que esta en reservas de oferta reservada

                    $("#tblVerificarReservas").append("<tr><td>" + "Usuario: " + reservas[i].usuario + "<br>ID de Reserva: "
                            + reservas[i].idReserva + "<br>Paquete: " + ofertas[j].nombre +
                            "<br>Mail: " + reservas[i].mail + "</td><td><input class='confirmar' id='btnConfirmar" +
                            reservas[i].idReserva + "' data-estadoConfirmar='" + reservas[i].idReserva +
                            "' type='button' value='" + _msj + "'>" + "<br><input class='denegar' id='btnDenegar" +
                            reservas[i].idReserva + "' data-estadoDenegar=" + reservas[i].idReserva +
                            " type='button' value='" + _msj2 + "'></td></tr>");
                }
            }
        }
    }
    $(".denegar").click(cambiarEstadoDeReservaADenegado);
    $(".confirmar").click(cambiarEstadoDeReservaAConfirmar);
}


function cambiarEstadoDeReservaAConfirmar() {
    var _reservaActual;
    var _idDeReserva = Number($(this).attr("data-estadoConfirmar")); // tomar dato data-estadoConfirmar del id de la reserva
    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].idReserva === _idDeReserva) {
            _reservaActual = reservas[i];
            break;
        }
    }
// el estado es pendiente (si aun no se modifico alguna vez) confirada o denegada 
    _reservaActual.estado = "Confirmada";
}


function cambiarEstadoDeReservaADenegado() { // hay q modificar
    var _reservaActual;
    var _idDeReserva = Number($(this).attr("data-estadoDenegar"));  // tomar dato data-estadoDenegar del id de la reserva
    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].idReserva === _idDeReserva) {
            _reservaActual = reservas[i];
            break;
        }
    }
// el estado es pendiente (si aun no se modifico alguna vez) confirada o denegada
    _reservaActual.estado = "Denegada";
}


function mostrarOfertasReservadas() {   // seccion (Mostrar ofertas reservadas) y poder cancelar la oferta que el user quiera
    $("#tblMostrarReservas").empty();

    for (var j = 0; j < reservas.length; j++) {
        if (usuarioActual.usuario === reservas[j].usuario) {
            for (var i = 0; i < ofertas.length; i++) {
                if (reservas[j].idOfertaReservada === ofertas[i].id) {
                    var _posicionOferta = i;
                    $("#tblMostrarReservas").append("<tr><td>Nombre del paquete " + ofertas[_posicionOferta].nombre
                            + "<br>Estrellas: " + ofertas[_posicionOferta].estrellas + "<br>Precio: $ " +
                            ofertas[_posicionOferta].precio + "<br>Número de reserva: " + reservas[_posicionOferta].idReserva
                            + "<br>Direccion " + ofertas[_posicionOferta].direccion + "<br>Ubicación " +
                            ofertas[_posicionOferta].ubicacion + "<br><br>Estado: " + reservas[_posicionOferta].estado +
                            "</td><td><img src='imagenesproyecto/" + ofertas[_posicionOferta].foto +
                            "'></td></tr>");
                }
            }
        }
    }
}


$("#btnMostrarOfertasReservadas").click(mostrarOfertasReservadasSegunEstado);
function mostrarOfertasReservadasSegunEstado() {   // seccion (Mostrar ofertas reservadas) y poder cancelar la oferta que el user quiera
    $("#tblMostrarReservas").empty();
    var _estadoAMostrar = $("#slcMostrarOfertasReservadas").val();

    for (var j = 0; j < reservas.length; j++) {
        var _guardarOferta;
        if (usuarioActual.usuario === reservas[j].usuario) {
            _guardarOferta = reservas[j].idOfertaReservada;
            // if para guardar la oferta que se reservo

            for (var i = 0; i < ofertas.length; i++) { //_estadoAMostrar === "Todas"
                if ((ofertas[i].id === _guardarOferta && reservas[j].estado === _estadoAMostrar) ||
                        (ofertas[i].id === _guardarOferta && _estadoAMostrar === "Todas")) {
//selecciona uno en especial o todas las ofertas, la otra condicion que acompaña con el & es para ubicar la oferta correcta

                    $("#tblMostrarReservas").append("<tr><td>Nombre del paquete " + ofertas[i].nombre
                            + "<br>Estrellas: " + ofertas[i].estrellas + "<br>Precio: $ " +
                            ofertas[i].precio + "<br>Número de reserva: " + reservas[j].idReserva +
                            "<br>Direccion" + ofertas[i].direccion + "<br>Ubicación " + ofertas[i].ubicacion +
                            "<br><br>Estado: " + reservas[j].estado + "</td><td><img src='imagenesproyecto/" +
                            ofertas[i].foto + "'></td></tr>");
                }
            }
        }
    }
}





function mostrarEstadoDeCuenta() {
    $("#tblEstadoDeCuenta").empty(); // limpiar tabla
    var _totalMontoDeReservasConfirmadas = 0;
    var _contadorDeReservasConfirmadas = 0;
    for (var j = 0; j < reservas.length; j++) {
        var _guardarOferta;
        if (usuarioActual.usuario === reservas[j].usuario) {
            _guardarOferta = reservas[j].idOfertaReservada;
            // if para guardar la oferta que se reservo

            for (var i = 0; i < ofertas.length; i++) {
                if (ofertas[i].id === _guardarOferta && reservas[j].estado === "Confirmada") {
                    _totalMontoDeReservasConfirmadas = _totalMontoDeReservasConfirmadas + ofertas[i].precio;
                    _contadorDeReservasConfirmadas++;
                    $("#tblEstadoDeCuenta").append("<tr><td>Nombre del paquete " + ofertas[i].nombre
                            + "<br>Precio: $ " + ofertas[i].precio + "<br>Número de reserva: " + reservas[j].idReserva +
                            "</td><td><img src='imagenesproyecto/" + ofertas[i].foto + "'></td><td></td></tr>");
                }
            }
        }
    }
    $("#pEstadoDeCuenta").html("<h3>Usted tiene un total de " + _contadorDeReservasConfirmadas +
            " reservas confirmadas.<br>Por un total de $ " + _totalMontoDeReservasConfirmadas+ ".</h3><br><br>");
}


$("#txtFechaAgregarOferta").datepicker(// Corresponde al menu seleccionador de fecha de AGREGAR OFERTA
        {
            minDate: 0,
            dateFormat: "yy-mm-dd",
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
                "Octubre", "Noviembre", "Diciembre"]}
);


$("#btnAgregarOferta").click(agregarOferta); // PESTAÑA AGREGAR OFERTA
function agregarOferta() {
    $("#pAgregarOferta").empty();
    var _nombre = $("#txtNombreAgregarOferta").val();
    var _categoria = Number($("#txtCategoriaAgregarOferta").val());
    var _precio = Number($("#txtPrecioAgregarOferta").val());
    var _direccion = $("#txtDireccionAgregarOferta").val();
    var _localidad = $("#txtLocalidadAgregarOferta").val();
    var _fecha = $("#txtFechaAgregarOferta").val();
    var _ubicacionArchivo = $("#fileFotoAgregarOfertas").val();
    var _reservasEfectuadas = 0;

    var _nombreCorreto = false;
    var _nombreDisponible = true;
    var _categoriaCorrecto = false;
    var _precioCorrecto = false;
    var _direccionCorrecto = false;
    var _localidadCorrecto = false;
    var _fechaCorrecto = false;
    var _ubicacionArchivoCorrecto = false;
    _ubicacionArchivo = depurarRuta(_ubicacionArchivo);
    if (_nombre === "" || _nombre.length <= 3) { //si campo de texto vacio o menos de 3 caracteres
        $("#pAgregarOferta").append("Ingrese el nombre del paquete conteniendo al menos 3 caracteres");
    } else {
        _nombreCorreto = true;
    }

    for (var i = 0; i < ofertas.length; i++) {
        if (_nombre === ofertas[i].nombre) { // verificar si existe este nombre de oferta
            _nombreDisponible = false;
            break;
        }
    }
    if (_nombreDisponible === false) {
        $("#pAgregarOferta").append("<br>Dicho nombre no se encuentra disponible");
    }
    if (_categoria === 0 || (_categoria > 6 || _categoria < 0) || isNaN(_categoria)) {// que ingrese una categoria de 1 a 5
        //categoria === 0 es porque si no ingresa nada se pone 0 automaticaente en el dato tomado del campo
        $("#pAgregarOferta").append("<br>Ingrese en forma númerica la categria");
    } else {
        _categoriaCorrecto = true;
    }
    if (_precio === 0 || _precio < 0 || isNaN(_precio)) { // que el precio sea numerico y mayor que 0
        $("#pAgregarOferta").append("<br>Ingrese un valor por el paquete en forma númerica");
    } else {
        _precioCorrecto = true;
    }
    if (_direccion === "") {
        $("#pAgregarOferta").append("<br>Ingrese la dirección del paquete");
    } else {
        _direccionCorrecto = true;
    }
    if (_localidad === "") {
        $("#pAgregarOferta").append("<br>Ingrese la localidad del paquete");
    } else {
        _localidadCorrecto = true;
    }
    if (_fecha === "") {
        $("#pAgregarOferta").append("<br>Seleccione la fecha de inicio del paquete");
    } else {
        _fechaCorrecto = true;
    }
    if (_ubicacionArchivo === "") {
        $("#pAgregarOferta").append("<br>Agrege una foto del paquete");
    } else {
        _ubicacionArchivoCorrecto = true;
    }
    if (_nombreCorreto === true && _nombreDisponible === true && _categoriaCorrecto === true && _precioCorrecto === true
            && _direccionCorrecto === true && _localidadCorrecto === true && _ubicacionArchivoCorrecto === true
            && _fechaCorrecto === true) {
        var _oferta = {
            id: ++idActualDeAgregarOferta,
            nombre: _nombre,
            estrellas: _categoria,
            precio: _precio,
            direccion: _direccion,
            ubicacion: _localidad,
            validez: _fecha,
            reservasEfectuadas: _reservasEfectuadas,
            foto: _ubicacionArchivo,
            habilitado: false,
            destacada: 1
        };
        ofertas.push(_oferta);
        alert("Oferta agregada");
    }
}


function depurarRuta(_rutaImg) {//Para obtener el nombre del archivo de la foto
    var _rutaDepurada;
    _rutaDepurada = _rutaImg.substr(_rutaImg.lastIndexOf("\\") + 1);
    return _rutaDepurada;
}


function habilitarOfertas() {
    $("#tblHabilitarOfertas").empty();//vaciar tabla

    for (var i = 0; i < ofertas.length; i++) {
        var _estaReservada = false;

        if (ofertas[i].habilitado === true) { //si esta habilitada la oferta, para ver el value del boton
            var _boton = "Deshabilitar";
        } else {
            var _boton = "Habilitar";
        }
        for (var j = 0; j < reservas.length; j++) {
            if (ofertas[i].id === reservas[j].idOfertaReservada) {
                _estaReservada = true; // buscar el if de la oferta que coincida en el array reserva
            }
        }
        if (_estaReservada === false) { // solo va a mostrar aquellas reservas que no tengan ninguna reserva hecha
            $("#tblHabilitarOfertas").append("<tr><td>Paquete: " + ofertas[i].nombre + "<br>" + "Estrellas: " +
                    ofertas[i].estrellas + "<br>Precio: $ " + ofertas[i].precio + "<br>Dirección: " + ofertas[i].direccion
                    + "<br>Ubicación: " + ofertas[i].ubicacion + "</td><td><img src='imagenesproyecto/" + ofertas[i].foto
                    + "'></td><td><input class='habilitar' data-habilitar='" + ofertas[i].id +
                    "' type='button' value='" + _boton + "'></td></tr>");
        }
    }
    $(".habilitar").click(cambiarEstadoDeOferta);
}



function cambiarEstadoDeOferta() {
    var _idUsuario = Number($(this).attr("data-habilitar")); // tomar e id de la oferta que se le hizo click
    for (var i = 0; i < ofertas.length; i++) {
        if (ofertas[i].id === _idUsuario) {
            ofertaActual = ofertas[i];
            break;
        }
    }

    if (ofertaActual.habilitado) {
        ofertaActual.habilitado = false;
        $(this).attr("value", "Habilitar");
    } else {
        ofertaActual.habilitado = true;
        $(this).attr("value", "Deshabilitar");
    }
}


function habilitarUsuarios() {
    $("#tblHabilitarUsuarios").empty(); // limpiar tabla

    for (var i = 0; i < usuarios.length; i++) {

        if (usuarios[i].habilitado === true) { //si usuario esta habilitado
            var _boton = "Deshabilitar";
        } else {
            var _boton = "Habilitar";
        }
        $("#tblHabilitarUsuarios").append("<tr><td>Nombre: " + usuarios[i].nombre + "<br>" + "Usuario: " + usuarios[i].usuario +
                "<br>Contraseña " + usuarios[i].contrasenia + "<br>Mail: " + usuarios[i].mail + "<br>Habilitado: " + usuarios[i].habilitado
                + "</td><td><input class='habilitar' data-habilitar='" + usuarios[i].usuario + "' type='button' value='" + _boton +
                "'></td></tr>");
    }
    $(".habilitar").click(cambiarEstadoUsuario);
}


function cambiarEstadoUsuario() {
    var _idUsuario = $(this).attr("data-habilitar"); // tomar el usuario ya que este es unico
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario === _idUsuario) { // buscar el usuario en array usuarios y asignarlo a una variable
            var usuarioACambiar = usuarios[i];
            break;
        }
    }

    if (usuarioACambiar.habilitado) { //cambia el estado y el value del boton
        usuarioACambiar.habilitado = false;
        $(this).attr("value", "Habilitar");
    } else {
        usuarioACambiar.habilitado = true;
        $(this).attr("value", "Deshabilitar");
    }
}


function mostrarSelectEstadisticas() {
    var _cantConfirmadas = 0;
    var _cantDenegadas = 0;
    var _cantPendientes = 0;
    var _montoAcumuladoConfirmada = 0;
    var _montoAcumuladoDenegada = 0;
    var _montoAcumuladoPendiente = 0;
    $("#slcEstadisticas").empty(); // vaciar select
    $("#slcEstadisticas").html("<option value='x'>Seleccióne un estado</option>"); // poner el primero para identificar
    for (var k = 0; k < ofertas.length; k++) { //armar select
        $("#slcEstadisticas").append("<option value='" + ofertas[k].id + "'>" + ofertas[k].nombre + "</option>");
    }

    for (var i = 0; i < reservas.length; i++) {

        for (var j = 0; j < ofertas.length; j++) {//tomar posicion en que se encuentra la oferta
            if (ofertas[j].id === reservas[i].idOfertaReservada) {
                var _posicionEnOferta = j;
            }
        }
        // ifs para sumar a contadores y sumar el precio segun el estado de la oferta
        if (reservas[i].estado === "Confirmada") {   // ifs para sumar a contadores y sumar el precio segun su estado
            _cantConfirmadas++;
            _montoAcumuladoConfirmada = _montoAcumuladoConfirmada + ofertas[_posicionEnOferta].precio;
        }
        if (reservas[i].estado === "Denegada") {
            _cantDenegadas++;
            _montoAcumuladoDenegada = _montoAcumuladoDenegada + ofertas[_posicionEnOferta].precio;
        }
        if (reservas[i].estado === "Pendiente") {
            _cantPendientes++;
            _montoAcumuladoPendiente = _montoAcumuladoPendiente + ofertas[_posicionEnOferta].precio;
        }
    }
    $("#tblEstadisticas").html("<tr><td>Totalizan " + _cantConfirmadas + " de reservas confirmadas<br>Por un total de $ "
            + _montoAcumuladoConfirmada + "</td><td>Totalizan " + _cantDenegadas +
            " de reservas denegadas<br>Por un total de $ " + _montoAcumuladoDenegada + "</td><td>Totalizan "
            + _cantPendientes + " de reservas pendientes<br>Por un total de $ " + _montoAcumuladoPendiente +
            "</td></tr>");
}


$("#btnMostrarEstadisticas").click(mostrarEstadisticas);
function mostrarEstadisticas() {
    $("#tblMostrarUnaOferta").empty(); // vaciar tabla
    reservas.sort(ordenarPorFecha); // ordenar el array reservas segun la fecha de reserva
    var _idDeOfertaSeleccionada = Number($("#slcEstadisticas").val()); // tomar dato del select

    if (_idDeOfertaSeleccionada !== "x") { // si selecciono alguna oferta
        for (var i = 0; i < reservas.length; i++) { // para hacerlo con todas las reservas 

            for (var j = 0; j < ofertas.length; j++) {// para hacerlo con todas las ofertas 
                if (ofertas[j].id === reservas[i].idOfertaReservada) {
                    var _posisionEnOferta = j;  //si el id de la oferta reservada coincide con el id ofertas
                }
            }
            if (reservas[i].idOfertaReservada === _idDeOfertaSeleccionada) {
                // si se encontro la posicion armo tabla de esa reserva
                $("#tblMostrarUnaOferta").append("<tr><td>Usuario: " + reservas[i].usuario + "<br>Estado de Reserva: "
                        + reservas[i].estado + "<br>Paquete " + ofertas[_posisionEnOferta].nombre
                        + "<br>Precio: $" + ofertas[_posisionEnOferta].precio + "<br>Fecha de reserva:  "
                        + reservas[i].fecha + "</td><td><img src='imagenesproyecto/" + ofertas[_posisionEnOferta].foto
                        + "'></td><td></td></tr>");
            }
        }
    }
}


$("#btnIniciarSesion").click(iniciarSesion);
function iniciarSesion() {
    $("#pIniciarSesion").empty(); //vaciar parrafo de iniciar sesión

    var _usuario = $("#txtNombreLogin").val();
    var _pass = $("#txtContraseniaLogin").val();
    var _usuarioBuscado;
    var _user = false; // para que por defecto el user sea falso
    _usuario = _usuario.toLowerCase(); //para buscar el usuario cargado en minuscula, de esta manera 
    //al hacer que no se reitan al registrarse los usuarios son unicos y con todos los caracteres en inuscula
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario === _usuario) { // si se encuentra el usuario en el array usuarios
            _user = true;
            var _numero = i; //guardar posicion en que se encuentra el usuario en el array usuarios
            break;
        }
    }
    if (_user === false) {// si el usuario no se encontro
        $("#pIniciarSesion").html("Usuario No Encontrado");
    } else {
        _usuarioBuscado = usuarios[_numero]; // si el usuario se encontro le asigno todos los datos a la variable
    }
    if (_usuarioBuscado.habilitado === true) { // si el usuario ya fue habilitado por los administradores
        if (_pass === _usuarioBuscado.contrasenia) { // si la contraseña ingresada coincide con la guardada al registrarse
            usuarioActual = _usuarioBuscado;
            $("#pIniciarSesion").html(_usuario + " ha iniciado sesión"); // aviso de inicio de sesión
            $("#txtNombreLogin").val(""); // lipiar campos de texto
            $("#txtContraseniaLogin").val("");

            if (usuarioActual.habilitado === true) {
                // siguentes ifs son para mostrar los diferentes botones de li segun el usuario que ingrese al sistema
                $("#btnSeccionCerrarSesion").show();
            }
            if (usuarioActual.tipo === "admin") {
                $(".user").hide();
                $(".admin").show();
                $(".yaIngresado").hide();
                top5();
            }
            if (usuarioActual.tipo === "user") {
                $(".admin").hide();
                $(".user").show();
                $(".yaIngresado").hide();
                top5();
            }
        } else {
            $("#pIniciarSesion").html("Contraseña Incorrecta"); // si la contraseña no es correcta dar aviso
        }
    } else {
        $("#pIniciarSesion").html("El usuario " + _usuario + " aun no ha sido habilitado");
        // si el usuario aun no fue habilitado por los administradores da aviso
    }
}


$("#btnRegistrarse").click(registrarUsuario);
function registrarUsuario() {
    $("#pMostrarEnRegistrarse").empty(); // vaciar parrafo

    var _nombre = $("#txtNombreRegistrarse").val();
    var _usuario = $("#txtUsuarioRegistrarse").val();
    var _contrasenia = $("#txtContraseniaRegistrarse").val();
    var _verificarContrasenia = $("#txtVerificarContraseniaRegistrarse").val();
    var _mail = $("#txtMailRegistrarse").val();

    var _nombreCorrecto = false;
    var _usuarioCorrecto = false;
    var _usuarioDisponible = true;
    var _contraseniaCorrecto = false;
    var _verificarContraseniaCorrecto = false;
    var _mailCorrecto = false;

    _nombre = _nombre.toLowerCase(); // para guardar el nombre en minsculas
    _usuario = _usuario.toLowerCase();// para guardar el usuario en minsculas y hacer que sea unico si no se repite

    if (_nombre === "") {
        $("#pMostrarEnRegistrarse").append("Porfavor ingrese su nombre y apellido");
    } else {
        _nombreCorrecto = true;
    }
    if (_usuario === "" || _usuario.length < 5) {
        $("#pMostrarEnRegistrarse").append("<br>Porfavor ingrese un nombre de usuario con al menos 5 caracteres");
    } else {
        _usuarioCorrecto = true;
    }
    for (var i = 0; i < usuarios.length; i++) { // para verificar que el usuario no exista en el array usuarios
        if (_usuario === usuarios[i].usuario) {
            _usuarioDisponible = false;
            break;
        }
    }
    if (_usuarioDisponible === false) { // dar aviso de que el usuario ya esiste
        $("#pMostrarEnRegistrarse").append("<br>Este usuario ya existe, intente con uno nuevo");
    }

    var _tieneNumero = contieneNumero(_contrasenia);
    if (_tieneNumero === false) { // dar aviso si la contraseña no contiene numero
        $("#pMostrarEnRegistrarse").append("<br>Su contraseña debe contener al menos un número");
    }
    var _tieneLetra = contieneLetra(_contrasenia);
    if (_tieneLetra === false) { // dar aviso si la contraseña no contiene letra
        $("#pMostrarEnRegistrarse").append("<br>Su contraseña debe contener al menos una letra.");
    }
    if (_tieneLetra === true && _tieneNumero === true) { // si tiene numero y letra, contraseña correcto
        _contraseniaCorrecto = true;
    }
    if (_tieneLetra === true && _tieneNumero === true) { // para verificar que escriba 2 veces la misma contraseña
        if (_contrasenia !== _verificarContrasenia) {
            $("#pMostrarEnRegistrarse").append("<br>La confirmacion de la contraseña no coincide con la contraseña ingresada.");
        } else {
            _verificarContraseniaCorrecto = true;
        }
    }

    var _tieneArroba = buscarAlgo(_mail, "@");
    var _tienePuntoCom = buscarPuntoCom(_mail);
    if (_tieneArroba < 0 || _tienePuntoCom < 0) {
        $("#pMostrarEnRegistrarse").append("<br>Debe ingresar un correo electronico.");
    } else {
        _mailCorrecto = true;
    }
    if (_nombreCorrecto === true && _usuarioCorrecto === true && _contraseniaCorrecto === true
            && _verificarContraseniaCorrecto === true && _mailCorrecto === true
            && _usuarioDisponible === true) { // verificar que sea un correo electronico

        var _usuarioAIngresar; // asignar todos los datos anteriores a una variable
        _usuarioAIngresar = {
            nombre: _nombre,
            usuario: _usuario,
            contrasenia: _contrasenia,
            mail: _mail,
            tipo: "user",
            estado: false
                    //Tipo de usuario
        };
        usuarios.push(_usuarioAIngresar); // agregar los datos a el array usuario
        $("#pMostrarEnRegistrarse").append("<br>Usuario registrado exitosamente.");
// limpiar campos de texto una vez que se registre
        $("#txtNombreRegistrarse").val("");
        $("#txtUsuarioRegistrarse").val("");
        $("#txtContraseniaRegistrarse").val("");
        $("#txtVerificarContraseniaRegistrarse").val("");
        $("#txtMailRegistrarse").val("");
    }
}


$("#btnCambiarPass").click(cambiarPass);
function cambiarPass() {
    $("#pCambiarPass").empty(); // vaciar parrafo

    var _passActual = $("#txtPassActual").val();
    var _passNueva = $("#txtPassNueva").val();
    var _confirmarPass = $("#txtConfirmarPassNueva").val(); // tomo datos de campo de texto
    var _tieneNumero = contieneNumero(_passNueva); // verifico que la contraseña nueva tenga numero
    var _tieneLetra = contieneLetra(_passNueva);// verifico que la contraseña nueva tenga letra

    if (_passActual !== usuarioActual.contrasenia) {
        // si contraseña actual ingresada NO coincide con la que esta en el sistema
        $("#pCambiarPass").append("<br>La contraseña actual ingresada no coincide con su contraseña");
    } else { // si contraseña actual ingresada COINCIDE con la que esta en el sistema
        if (_tieneNumero === false || _tieneLetra === false) { // si la contraseña nueva no contiene letra o numero da aviso
            $("#pCambiarPass").append("<br>Su contraseña debe contener al menos un número y una letra");
        } else {
            if (_passNueva !== _confirmarPass) { // si la confirmacon de la contraseña nueva NO coincide con la contraseña nueva
                $("#pCambiarPass").append("<br>Su confirmación de contraseña no coincide");
            } else { // si la confirmacon de la contraseña nueva COINCIDE con la contraseña nueva
                usuarioActual.contrasenia = _passNueva; //modifico la contraseña del usuario en el sistea
                $("#pCambiarPass").append("<br>Su contraseña fue cambiada con exito.");
                $("#txtPassActual").val("");
                $("#txtPassNueva").val("");
                $("#txtConfirmarPassNueva").val("");
            }
        }
    }
}


$("#btnCerrarSesion").click(cerrarsesion);
function cerrarsesion() {
    //segun los datos en la variable usuarioActual se muestran o ocultan diferentes botones o da acceso a diferentes funciones
    usuarioActual = usuarioDefault;
    //se asigna a la variable usuarioActual datos para referirse a que no hay ningun usuario en el sistema
    $("#pCerrarSesion").html("Usted ha cerrado sesión exitosamente"); //da aviso de cerrar sesion
    $("#btnSeccionCerrarSesion").hide();// oculta y muestra las secciones para un usuario de tipo noUser
    $("#btnSeccionCambiarContrasenia").hide();
    $("#btnSeccionLogin").show();
}