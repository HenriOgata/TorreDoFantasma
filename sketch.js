var imagemDaTorre, torre;
var imagemDaPorta, porta, grupoDePortas;
var imagemDeEscalador, escalador, grupoDeEscaladores;
var fantasma, imagemDoFantasma;
var grupoDeBlocoInvisivel, blocoInvisivel;
var estadoJogo = "JOGAR"


function preload(){
  imagemDaTorre = loadImage("tower.png");
  imagemDaPorta = loadImage("door.png");
  imagemDeEscalador = loadImage("climber.png");
  imagemDoFantasma = loadImage("ghost-standing.png");
  grupoDePortas = new Group();
  grupoDeEscaladores = new Group();
  grupoDeBlocoInvisivel = new Group();
}

function setup(){
  createCanvas(600,600);
 
  torre = createSprite(300,300);
  torre.addImage("tower",imagemDaTorre);
  torre.velocityY = 1;
  

  fantasma = createSprite(200,200,50,50);
  fantasma.scale = 0.3;
  fantasma.addImage("ghost", imagemDoFantasma);
}

function draw(){
  background(0);
  
    if(estadoJogo == "JOGAR"){
      
    
    
    if(torre.y > 400){
      torre.y = 300
    }
    
    if(keyDown("left")){
      fantasma.x = fantasma.x-3;
    }
    if(keyDown("right")){
      fantasma.x = fantasma.x+3;
    }
    if(keyDown("space")){
      fantasma.velocityY = -5;
    }
      fantasma.velocityY = fantasma.velocityY+0.3;
    if(grupoDeEscaladores.isTouching(fantasma)){
      fantasma.velocityY = 0;
    }
  
  if(grupoDeBlocoInvisivel.isTouching(fantasma) ||fantasma.y > 600){
    fantasma.destroy();
    estadoJogo = "ENCERRAR";
  }
  
  
    drawSprites();
    
    gerarPortas();
  }
  if(estadoJogo == "ENCERRAR"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
  }

}

function gerarPortas() {
  //escreva o código aqui para gerar portas na torre
  if (frameCount % 200 === 0) {
    var porta = createSprite(200, -50);
    var escalador = createSprite(200,10);
    var blocoInvisivel = createSprite(200,15);
    
    blocoInvisivel.width = escalador.width;
    blocoInvisivel.height = 2;
    blocoInvisivel.debug =true;
    grupoDeBlocoInvisivel.add(blocoInvisivel);
    
    porta.addImage(imagemDaPorta);
    porta.x = Math.round(random(124,400));
    porta.velocityY = 1;
   
    

    escalador.addImage(imagemDeEscalador);
    escalador.x = porta.x;
    escalador.velocityY = 1;
    
    blocoInvisivel.x = porta.x;
    blocoInvisivel.velocityY = 1;
    blocoInvisivel.visible = false;
    
    //atribuir tempo de vida à variável
    porta.lifeTime = 700;
    escalador.lifeTime = 700;
    blocoInvisivel.lifeTime = 700;
    
    
    fantasma.depth = porta.depth;
    fantasma.depth +=1;
    
    //adicione cada porta ao grupo
    grupoDePortas.add(porta);
    grupoDeEscaladores.add(escalador);
  }
}
