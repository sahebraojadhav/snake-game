 ###  adding element using the js  ###
 const scoreBoard=document.createElement("div");
        scoreBoard.id="score-board";
        document.body.insertBefore(scoreBoard,gameArena);
        const startButton=document.createElement("button");
        startButton.textContent="Start Game";

 ###  adding element using the js  ###

  const startButton=document.createElement("button");
        startButton.textContent="Start Game";
        startButton.classList.add("start-button");
        document.body.appendChild(startButton);