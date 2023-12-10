document.addEventListener("DOMContentLoaded",()=>{
    const gameArena=document.getElementById("game-arena");
    const arenaSize=600;
    const cellSize=20;
    let score=0;
    let gameStarted=false;
    let food={x:300,y:200};
    let snake=[{x:160,y:200},{x:140,y:200},{x:120,y:200}];
    let dx=cellSize;
    dy=0;

    function drawScoreBoard(){
        const scoreBoard=document.getElementById("score-board");
        scoreBoard.textContent=`Score ${score}`
    }

    function drawDiv(x,y,className){
        const div=document.createElement("div");
        div.classList.add(className);
        div.style.top=`${y}px`;
        div.style.left=`${x}px`;
        return div;

    }

    function drawFoodAndSnake(){
        gameArena.innerHTML=" "; //if previously something is drawn remove it
        //wipeout everything and redraw with new coordinates when snake moves

        snake.forEach((snakeCell)=>{
            const element=drawDiv(snakeCell.x,snakeCell.y,'snake');
            gameArena.appendChild(element);
        })

        const foodElement=drawDiv(food.x,food.y,'food');
        gameArena.appendChild(foodElement)
    }
    
    function moveFood(){
        let newX , newY;
        do{
            newX=Math.floor(Math.random()*((arenaSize-cellSize)/cellSize)*cellSize);
            console.log("answer of the following equation is ",newX);
            console.log("arenasie ",arenaSize,"cellsize",cellSize);
            console.log('arenaSize-cellSize',arenaSize-cellSize);
            console.log("(arenaSize-cellSize)/cellSize",(arenaSize-cellSize)/cellSize);
            newY=Math.floor(Math.random()*((arenaSize-cellSize)/cellSize)*cellSize);
        }while(snake.some(snakeCell=>snakeCell.x===newX && snakeCell.y===newY));

        food={x:newX , y:newY};
    }

    function updateSnake(){
        //1. calculate new coordinate the snak3e head will go to 
        const newHead={x:snake[0].x+dx ,y:snake[0].y+dy}
        snake.unshift(newHead);
        if(newHead.x===food.x && newHead.y===food.y){
           //collision 
            score+=5;
            moveFood();
           //move the food
        }
        else{

        }
        snake.pop();
    }

    function isGameOver(){
        //check snake body hit
        for(i=1;i<snake.length;i++)
        {
            if(snake[0].x===snake[i].x && snake[0].y==snake[i].y)return ture;
        }

        const isHittingLeftWall=snake[0].x<0;
        const isHittingTopWall=snake[0].x<0;
        const isHittingRightWall=snake[0].x>=arenaSize;
        const isHittingDownwall=snake[0].y>=arenaSize;

        return isHittingDownwall || isHittingLeftWall || isHittingRightWall|| isHittingTopWall;

    }

    function gameLoop(){
        setInterval(()=>{
            if(!gameStarted) return false;
            if(isGameOver()){
                gameStarted=false;
                alert(`Game over , score=${score}`);
                document.location.reload();
                return;
            }

            updateSnake();
            drawScoreBoard();
            drawFoodAndSnake();
        },500);
    }

    function runGame(){
        gameStarted=true;

        gameLoop();
    }


    function startGame(){
        const scoreBoard=document.createElement("div");
        scoreBoard.id="score-board";
        document.body.insertBefore(scoreBoard,gameArena);


        const startButton=document.createElement("button");
        startButton.textContent="Start Game";
        startButton.classList.add("start-button");
        document.body.appendChild(startButton);

       
       startButton.addEventListener("click",()=>{
            startButton.style.display="none";
            runGame();
        })
       
    }

    startGame();
    
});

//1:18:47