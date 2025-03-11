let contexto = document.getElementById("game")
let ctx = contexto.getContext("2d");
let anchura = 300;
let altura = 530;
//Canvas
let anchhura_canvas = 300;
let altura_canvas = 530;
contexto.width = anchura;
contexto.height = altura;
//Variables
let score = 0;
let FPS =60;
let gravedad = 1.5;

let tuberias = new Array();
tuberias[0] = {
    x: contexto.width,
    y: 0
}

//Variables sonido
let punto = new Audio();
punto.src = "audio/punto.mp3";

//variables imagen
let bird = new Image();
bird.src = "images/bird.png";

let background = new Image();
background.src = "images/background.png";

let suelo = new Image();
suelo.src = "images/suelo.png";

let tuberiaNorte = new Image();
tuberiaNorte.src = "images/tuberiaNorte.png";

let tuberiaSur = new Image();
tuberiaSur.src = "images/tuberiaSur.png";


let personaje = {
    x: 50,
    y: 150,
    width: 50,
    height: 50,
    velocidad: 20
}

//Control
function presionar(){
    personaje.y -= 25;
}
redimencionar();
function redimencionar(){
    altura_canvas = window.innerHeight;
    anchura_canvas = window.innerWidth;

    contexto.width = anchura;
    contexto.height = altura;

    contexto.style.height = ""+altura_canvas+"px";
}


//bucle
setInterval(loop,1000/FPS);

function loop(){
    ctx.clearRect(0,0,300,530);
    //Fondo
    ctx.drawImage(background,0,0);
    //Suelo
    ctx.drawImage(suelo,0,ctx.canvas.height-suelo.height);
    //Personaje 
    ctx.drawImage(bird,personaje.x,personaje.y);    
    //Tuberias
    for(let i=0; i<tuberias.length; i++){
        let constante = tuberiaNorte.height+80;
        ctx.drawImage(tuberiaNorte,tuberias[i].x,tuberias[i].y);   
        ctx.drawImage(tuberiaSur,tuberias[i].x,tuberias[i].y+constante);
        tuberias[i].x--;
        if(tuberias[i].y + tuberiaNorte.height < 80){
            tuberias.y = 0;
        }
        if(tuberias[i].x == 150){
            tuberias.push({
                x: ctx.canvas.width,
                y: Math.floor(Math.random()*tuberiaNorte.height)-tuberiaNorte.height
            });
        }
        //Colisiones
        if(personaje.x + bird.width >= tuberias[i].x && 
            personaje.x <= tuberias[i].x + tuberiaNorte.width && 
            (personaje.y <= tuberias[i].y + tuberiaNorte.height ||
            personaje.y + bird.height >= tuberias[i].y+constante) || 
            personaje.y + bird.height >= ctx.canvas.height - suelo.height){
            location.reload();
        }
        if(tuberias[i].x == 40){
            score++;
            punto.play();
        }
    }
    

    //Condiciones
    personaje.y += gravedad;
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.font = "24px Arial";
    ctx.fillText("Score: "+score,10,ctx.canvas.height-40);
}

//Eventos
window.addEventListener("resize",redimencionar);
window.addEventListener("keydown",presionar);