/*Obtener una variable para acceder a las funcionalidades*/

var express = require("express");
/*Configurar mi servidor*/

var app = express();

/*Hacemos que la pagina sea dinamica*/
var consolidate = require("consolidate"); /*Libreria para configurar vistas dinamicas*/
var dust = require("dustjs-linkedin");/*motor para crear vistas dinamicas*/

app.listen(8081);//configuracion del servidor

/*Imprime en la consola del servidor*/
console.log("Servidor Iniciado...");
/*Despacha archivos estatiticos*/
//app.use("/", express.static(__dirname + "/vistas"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/imagenes", express.static(__dirname + "/imagenes"));
app.use("/videos", express.static(__dirname + "/videos"));



/*configurar nuestro motor de vistas*/
app.set("view engine", "dust");//nuestras vistas tendran extension dust
app.engine("dust", consolidate.dust);//indicando el engine que se va a utilizar
//indicamos la carpeta que contiene las vistas
app.set("views", __dirname + "/vistas");

/*hacemos que el servidor pueda leer los datos que recibe del cliente*/
app.use(express.urlencoded());

/*hacemos que el servidor responda a peticiones GET*/
app.get("/index", function(request, response){
	/*Logina de como responder a la peticion /index */
	response.render("index");
});

app.get("/contacto", function(request, response){
	/*Logina de como responder a la peticion /index */
	response.render("contacto");
});

/*Responder a peticion post*/
app.post("/suscribirse", function(request, response){
	response.render("suscrito", {
		asunto: "Tu mensaje ha sido enviado",
		email: request.body.email
	});
});

app.post("/contactar", function(request, response){
	response.render("respuesta_contacto", {
		nombre: request.body.nombre,
		email: request.body.email,
		website: request.body.website,
		edad: request.body.edad,
		comentario: request.body.comentario
	});
});



