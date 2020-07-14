var reservaActual;
var numeroDeReserva = 12;   //va a partit del numero de reservas precargadas (Se pone el numero de reservas cargadas)
var idActualDeAgregarOferta = 9; //va a partir del numero de ofertas precargadas (en este caso habian 6)
var ofertaActual;

var usuarios = [{//No tiene objet id porque el usuario no puede repetirse
        nombre: "matias",
        usuario: "matias",
        contrasenia: "1234",
        mail: "matiesteff@gmail.com",
        tipo: "admin",
        habilitado: true},
    {
        nombre: "fred",
        usuario: "fred",
        contrasenia: "1234",
        mail: "algo@gmail.com",
        tipo: "admin",
        habilitado: true},
    {
        nombre: "camila",
        usuario: "camila",
        contrasenia: "camila1",
        mail: "algo@gmail.com",
        tipo: "user",
        habilitado: true},
{
        nombre: "francisco giz",
        usuario: "francesco",
        contrasenia: "fran22",
        mail: "franchi20@gmail.com",
        tipo: "user",
        habilitado: false},
    {
        nombre: "miguel gomez",
        usuario: "miguelito",
        contrasenia: "aux2013",
        mail: "auxiliar@gmail.com",
        tipo: "user",
        habilitado: true},
    {
        nombre: "maria lopez",
        usuario: "dulcinea",
        contrasenia: "choco2233",
        mail: "chocolate@gmail.com",
        tipo: "user",
        habilitado: false},
    {
        nombre: "santiago santos",
        usuario: "santos",
        contrasenia: "aaa44",
        mail: "santoss@gmail.com",
        tipo: "user",
        habilitado: true},
    {
        nombre: "jhon smith",
        usuario: "jhony",
        contrasenia: "1277as",
        mail: "jhonybravo@gmail.com",
        tipo: "user",
        habilitado: true}];

var usuarioDefault = {
    nombre: "Invitado",
    usuario: "",
    contrasenia: "",
    mail: "",
    tipo: "noUser",
    habilitado: false};

var reservas = [{
        nombre: "camila",
        usuario: "camila",
        contrasenia: "camila1",
        mail: "algo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOfertaReservada: 3,
        estado: "Pendiente",
        idReserva: 1,
        fecha: "2018-11-20"
    }, {
        nombre: "camila",
        usuario: "camila",
        contrasenia: "camila1",
        mail: "algo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOfertaReservada: 5,
        estado: "Confirmada",
        idReserva: 2,
        fecha: "2018-11-20"
    }, {
        nombre: "camila",
        usuario: "camila",
        contrasenia: "camila1",
        mail: "algo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOfertaReservada: 3,
        estado: "Denegada",
        idReserva: 3,
        fecha: "2018-11-22"
    }, {
        nombre: "camila",
        usuario: "camila",
        contrasenia: "camila1",
        mail: "algo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOfertaReservada: 1,
        estado: "Confirmada",
        idReserva: 4,
        fecha: "2018-11-20"
    }, {
        nombre: "camila",
        usuario: "camila",
        contrasenia: "camila1",
        mail: "algo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOfertaReservada: 3,
        estado: "Confirmada",
        idReserva: 5,
        fecha: "2018-11-20"
    }, {
        nombre: "camila",
        usuario: "camila",
        contrasenia: "camila1",
        mail: "algo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOfertaReservada: 4,
        estado: "Confirmada",
        idReserva: 6,
        fecha: "2018-11-20"
    }, {
        nombre: "santiago santos",
        usuario: "santos",
        contrasenia: "aaa444",
        mail: "santoss@gmail.com",
        tipo: "user",
        habilitado: true,
        idOfertaReservada: 4,
        estado: "Denegada",
        idReserva: 7,
        fecha: "2018-12-20"
    }, {
        nombre: "camila",
        usuario: "camila",
        contrasenia: "camila1",
        mail: "algo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOfertaReservada: 1,
        estado: "Confirmada",
        idReserva: 8,
        fecha: "2018-01-20"
    }, {
        nombre: "jhon smith",
        usuario: "1277as",
        contrasenia: "1234",
        mail: "jhonybravo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOfertaReservada: 4,
        estado: "Confirmada",
        idReserva: 9,
        fecha: "2018-11-20"
    }, {
        nombre: "camila",
        usuario: "camila",
        contrasenia: "camila1",
        mail: "algo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOfertaReservada: 7,
        estado: "Pendiente",
        idReserva: 10,
        fecha: "2018-10-22"
    }, {
        nombre: "jhon smith",
        usuario: "jhony",
        contrasenia: "1277as",
        mail: "jhonybravo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOfertaReservada: 8,
        estado: "Pendiente",
        idReserva: 11,
        fecha: "2018-11-22"
    }, {
        nombre: "jhon smith",
        usuario: "jhony",
        contrasenia: "1277as",
        mail: "jhonybravo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOfertaReservada: 4,
        estado: "Denegada",
        idReserva: 12,
        fecha: "2018-11-12"
    }
];

var favoritos = [{
        nombre: "camila",
        usuario: "camila",
        contrasenia: "1234",
        mail: "algo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOferta: 1
    }, {
        nombre: "camila",
        usuario: "camila",
        contrasenia: "1234",
        mail: "algo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOferta: 5
    }, {
        nombre: "jhon smith",
        usuario: "jhony",
        contrasenia: "1277as",
        mail: "jhonybravo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOferta: 4
    }, {
        nombre: "jhon smith",
        usuario: "jhony",
        contrasenia: "1277as",
        mail: "jhonybravo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOferta: 8
    }, {
        nombre: "camila",
        usuario: "camila",
        contrasenia: "1234",
        mail: "algo@gmail.com",
        tipo: "user",
        habilitado: true,
        idOferta: 7
    }
];


var usuarioActual = {//Para inicializarlo
    nombre: "",
    usuario: "",
    contrasenia: "",
    mail: "",
    tipo: "noUser",
    habilitado: false};


var ofertas = [{
        id: 1,
        nombre: "3 noches en Hotel President",
        estrellas: 5,
        precio: 345,
        direccion: "18 de Julio 1216",
        ubicacion: "Montevideo - Uruguay",
        validez: "2018-12-15",
        reservasEfectuadas: 1,
        foto: "Amelia.jpg",
        habilitado: true,
        destacada: 1
    }, {
        id: 2,
        nombre: "4 noches Casa Linda",
        estrellas: 5,
        precio: 456,
        direccion: "Mitre 567",
        ubicacion: "Mallorca - España",
        validez: "2018-11-23",
        reservasEfectuadas: 1,
        foto: "Casalinda.jpg",
        habilitado: false,
        destacada: 4
    }, {
        id: 3,
        nombre: "5 noches Hostal Friends",
        estrellas: 2,
        precio: 232,
        direccion: "Legnani 3467",
        ubicacion: "Miami - EEUU",
        validez: "2018-11-23",
        reservasEfectuadas: 3,
        foto: "Lagoon.jpg",
        habilitado: true,
        destacada: 1
    }, {
        id: 4,
        nombre: "2 noches Hotel Luxury",
        estrellas: 3,
        precio: 90,
        direccion: "calle hope 123",
        ubicacion: "Washington - EEUU",
        validez: "2018-11-23",
        reservasEfectuadas: 4,
        foto: "Luxury.jpg",
        habilitado: true,
        destacada: 1
    }, {
        id: 5,
        nombre: "2 noches Oasis Hotel",
        estrellas: 5,
        precio: 345,
        direccion: "avenida mary 456",
        ubicacion: "Cartagena - Colombia",
        validez: "2018-11-23",
        reservasEfectuadas: 1,
        foto: "Moon Bay.jpg",
        habilitado: true,
        destacada: 2
    }, {
        id: 6,
        nombre: "1 noche Sher a ton",
        estrellas: 3,
        precio: 70,
        direccion: "Calle Justicia",
        ubicacion: "Colonia - Uruguay",
        validez: "2018-12-31",
        reservasEfectuadas: 0,
        foto: "Neptuno.jpg",
        habilitado: false,
        destacada: 1
    }, {
        id: 7,
        nombre: "2 noches Hotel Bandolero",
        estrellas: 3,
        precio: 145,
        direccion: "Enchilada 1216",
        ubicacion: "Cancun - Mexico",
        validez: "2018-12-25",
        reservasEfectuadas: 1,
        foto: "Mexico.jpg",
        habilitado: true,
        destacada: 1
    }, {
        id: 8,
        nombre: "3 noches Bangldesh Hotel",
        estrellas: 4,
        precio: 255,
        direccion: " Calle yeptv",
        ubicacion: "Zurich - Suiza",
        validez: "2019-11-09",
        reservasEfectuadas: 1,
        foto: "Zurich.jpg",
        habilitado: true,
        destacada: 1
    }, {
        id: 9,
        nombre: "1 noche Comarade Hotel",
        estrellas: 2,
        precio: 65,
        direccion: "Lenin 1414",
        ubicacion: "Moscu - Rusia",
        validez: "2019-23-11",
        reservasEfectuadas: 0,
        foto: "Comra.jpg",
        habilitado: false,
        destacada: 1
    }];














