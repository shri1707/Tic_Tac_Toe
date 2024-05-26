const Player=(player,mark)=>{
    return {player,mark}
}
const gameControl= (()=>{
    const boardState= Array(9).fill(null)
    const winSeq= [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const p1= document.querySelector("#p1")
    const p2= document.querySelector("#p2")
    const btn= document.querySelector(".btn")
    const info = document.querySelector(".info")
    const start= document.querySelector(".start")
    const restart= document.querySelector(".restart")
    let playGame
    let players
    let currentPlay
    let index
    start.textContent= "Click Start button to play the game"

    restart.addEventListener("click", ()=>{
        window.location.reload()
    })
    
    btn.addEventListener("click", ()=>{
        if (p1.value!= "" && p2.value!=""){
        players= [Player(p1.value,"X"), Player(p2.value,"O")]
        console.log(players)
        playGame = true
        currentPlay= players[1]
        console.log(currentPlay)
        info.textContent= `${players[0]["player"]}'s turn` 
        start.textContent= "Game started"
        }
    })
    
    const turn= ()=>{
        if (currentPlay== players[1]){
            currentPlay= players[0]
            info.textContent= `${players[1]["player"]}'s turn`
        }
        else{
            currentPlay= players[1]
            info.textContent= `${players[0]["player"]}'s turn` 
        }
        return currentPlay
    }
    function checkWin() {
        return winSeq.some(combination => {
            return combination.every(index => {
                return boardState[index] === currentPlay["mark"];
            });
        });
    }

    const cell= document.querySelectorAll(".cell")
    cell.forEach(c => {
        c.addEventListener("click", (e)=>{
            console.log(e.target)
            index= e.target.dataset.index
            console.log(index)
        if (playGame){
            if (p1.value!= "" && p2.value!=""){

                if (c.textContent==""){
                    chance = turn()
                    boardState[index]= currentPlay["mark"]
                    e.target.textContent= currentPlay["mark"]
                    if(checkWin()){
                        playGame=false
                        info.textContent= `${currentPlay["player"]} has won`
                        return
                    }
                    if (boardState.every(cell => cell)) {
                        alert("It's a draw!");
                        playGame = false;
                        return;
                    }
                }  
            }
        }
        else{
            cell.disabled= true
        }
        })
    });

})()