let palabras = ["ALURA","HTML","CSS","JAVASCRIPT","ORACLE","AHORCADO","GOOGLE","CODIGO"];
var lienzo = document.querySelector("#dibujo-ahorcado");
var pincel = lienzo.getContext("2d");
var textosLienzo = document.querySelector("#lineas-ahorcado");
var lineas = textosLienzo.getContext("2d");
var palabraCorrecta = "";
var letras = [];
var contadorErrores = 0;
var contadorAciertos = 0;

function vector() {
    let clickImagen = document.querySelector("#input");
    alert("😊 Este es un juego del ahorcado, donde puedes jugar y divertirte ✨💖");
}

function crearPalabra(){
    var palabraSecreta = palabras[Math.floor(Math.random()*(palabras.length))];
    palabraCorrecta = palabraSecreta;
    console.log(palabraSecreta);
    return palabraSecreta;
}

var ingresarPalabra = llamarDatosStg();
if(ingresarPalabra == null){
    palabraSecreta = crearPalabra();
    dibujarLineas(palabraSecreta);
    logicaHorca(palabraSecreta);
    
}else{
    palabras.push(ingresarPalabra);
    palabraSecreta = crearPalabra();
    dibujarLineas(palabraSecreta);
    logicaHorca(palabraSecreta);
}
//Dibujar el juego
function llamarDatosStg() {
    var palabraNueva = sessionStorage.getItem("palabra");
    return palabraNueva;
}
//Secciones de dibujar horca
function dibujarSuelo(pincel) {
    pincel.lineWidth = 10;
    pincel.beginPath();
    pincel.moveTo(5, 490);
    pincel.lineTo(445, 490);
    pincel.stroke();
}
function dibujarHorca(pincel) {
    pincel.beginPath();
    pincel.moveTo(100, 10);
    pincel.lineTo(100, 490);
    pincel.stroke();

    pincel.beginPath();
    pincel.moveTo(100, 15);
    pincel.lineTo(350, 15);
    pincel.stroke();

    pincel.beginPath();
    pincel.moveTo(345, 15);
    pincel.lineTo(345, 100);
    pincel.stroke();
}
function dibujarCabeza(pincel) {
    pincel.beginPath();
    pincel.arc(345, 145, 45, 0, 2 * Math.PI);
    pincel.stroke();
}
function dibujarTronco(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 195);
    pincel.lineTo(345, 350);
    pincel.stroke();
}
function dibujarBrzIzq(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 195);
    pincel.lineTo(295, 280);
    pincel.stroke();
}
function dibujarBrzDer(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 195);
    pincel.lineTo(395, 280);
    pincel.stroke();
}
function dibujarPrnIzq(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 338);
    pincel.lineTo(305, 450);
    pincel.stroke();
}
function dibujarPrnDer(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 338);
    pincel.lineTo(385, 450);
    pincel.stroke();
}
function dibujarLineas(palabraSecreta) {
    lineas.lineWidth = 5;
    lineas.lineCap = "round"
    lineas.LineJoin = "round";
    lineas.strokeStyle = "black";

    var sizeLine = 800 / palabraSecreta.length;

    for (let i = 0; i < palabraSecreta.length; i++) {
        lineas.beginPath()
        lineas.moveTo(230 + (sizeLine * i), 130);
        lineas.lineTo(285 + (sizeLine * i), 130);
        lineas.stroke();
        lineas.closePath();
    }
}
function dibujarLetrasCorrectas(palabraSecreta, ubicacion) {
    lineas.font = "bold 52px Montserrat";
    lineas.lineWidth = 5;
    lineas.lineCap = "round"
    lineas.LineJoin = "round";
    lineas.strokeStyle = "blak";
    lineas.fillStyle = "black";

    var sizeLine = 800 / palabraSecreta.length;
    lineas.fillText(palabraSecreta[ubicacion], 235 + (sizeLine * ubicacion), 100);
}
function dibujarLetrasIncorrectas(letra, contadorErrores) {
    lineas.font = "bold 40px Montserrat";
    lineas.lineWidth = 5;
    lineas.lineCap = "round"
    lineas.LineJoin = "round";
    lineas.strokeStyle = "black";
    lineas.fillStyle = "black";

    lineas.fillText(letra, 250 + (40 * (10 - contadorErrores)), 200, 40);
}
function verificarTecla(teclaPress) {
    if (letras.length < 1 || letras.indexOf(teclaPress) < 0) {
        letras.push(teclaPress)
        return false;
    }
    else {
        letras.push(teclaPress)
        return true;
    }
}
//Funcion de dibujar Horca
function horca(contadorErrores, palabraSecreta) {
    pincel.strokeStyle = "black";
    pincel.lineWidth = 10;
    if (contadorErrores == 1) {
        //Dibujar horca
        dibujarSuelo(pincel);
    }
    if (contadorErrores == 2) {
        //Dibujar horca
        dibujarHorca(pincel);
    }
    if (contadorErrores == 3) {
        //Dibujar cabeza
        dibujarCabeza(pincel);
    }
    if (contadorErrores == 4) {
        //Dibujar tronco
        dibujarTronco(pincel);
    }
    if (contadorErrores == 5) {
        //Dibujar brazo izquierdo
        dibujarBrzIzq(pincel);
    }
    if (contadorErrores == 6) {
        //Dibujar brazo derecho
        dibujarBrzDer(pincel);
    }
    if (contadorErrores == 7) {
        //Dibujar pierna izquierda
        dibujarPrnIzq(pincel);
    }
    if (contadorErrores == 8) {
        //Dibujar pierna derecha
        dibujarPrnDer(pincel);
            alert ("Perdiste la palabra correcta es " + palabraSecreta).then(respuesta => {
            if (respuesta == true) {
                location.href = "./juego.html";
            }
            else {
                location.href = "./index.html";
            }
        })
    }
}
function logicaHorca(palabraSecreta) {
    dibujarLineas(palabraSecreta);
    var contenedorLetras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    document.addEventListener("keydown", function (letraIngresada) {
        var letra = letraIngresada.key.toUpperCase();

        for(var k = 0; k < contenedorLetras.length;k++){
            if(contenedorLetras[k]==letra){
                //Detectar letras repetidas o presionadas
                if (!verificarTecla(letraIngresada.key)) {
    
                    //Detectar Si se acierta la letra
                    if(palabraSecreta.includes(letra)){
    
                        //Si se acierta la letra se dibuja en el canvas
                        for(var i = 0; i < palabraSecreta.length; i++){
                            if(palabraSecreta[i] == letra){
                                dibujarLetrasCorrectas(palabraSecreta, i);
                                contadorAciertos++;
                            }
                        }
                        if(contadorAciertos == palabraSecreta.length){
                                alert ("Ganaste la palabra correcta es " + palabraSecreta).then(respuesta => {
                                if (respuesta == true) {
                                    window.location.href = "./juego.html";
                                }
                                else {
                                    window.location.href = "./index.html";
                                }
                            })
                        }
                    }
                    else{
                        contadorErrores++;
                        dibujarLetrasIncorrectas(letra, contadorErrores);
                        horca(contadorErrores, palabraSecreta);
                    }
                }
            }
        }      
    });
}
//intentos
function intentos(){
    var intentosRestantes = contadorErrores - 8;
    console.log(intentosRestantes);
    return intentosRestantes;
}

