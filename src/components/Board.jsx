import { useEffect, useState } from "react";
import Box from "./Box";

const ROW_SIZE = 10;
const COL_SIZE = 20;
const PADDLE_BOARD_SIZE = 3;
const PADDLE_EDGE_SPACE = 1;
// const mainBoard = [...Array(ROW_SIZE * COL_SIZE)]
const BACKGROUND = 0;
const PLAYER = 1;
const BALL = 2;

const style = {
    width: "250px",
    heigth: "250px",
    display: "grid",
    gridTemplate: `repeat(${ROW_SIZE}, 1fr) / repeat(${COL_SIZE}, 1fr)`
}

const inner = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "justify", 
    marginTop: "9em",
    marginLeft: "25em",
    Text: "100px",
    padding: "10px"
}

const Board = ()=>{
   // const [state,setState] = useState(()=>InitialState())
   const [pause,setPause] = useState(true);
   const [ballPos,setBallPos] = useState(Math.round((ROW_SIZE * COL_SIZE)/2)+ ROW_SIZE);
   const [deltaX,setDeltaX] = useState(-1);
   const [deltaY,setDeltaY] = useState(-COL_SIZE);
   const [playerScore,setPlayerScore] = useState(0);
   const [opponentScore,setOpponentScore] = useState(0);
   const [playerPaddlePos,setPlayerPaddlePos] = useState(PADDLE_EDGE_SPACE);
   const [opponentPaddlePos,setOpponentPaddlePos] = useState(COL_SIZE-PADDLE_EDGE_SPACE-1)

    const resetGame=()=>{}
    const moveBoard=()=>{}
    const touchingEdge=()=>{}
    const touchingPaddle=()=>{}
    const touchingPaddleEdge=()=>{}
    const isScore=()=>{}
    const handleKeyInput=({keyCode})=>{
        const PLAYER_UP   = 38  // up arrow
        const PLAYER_DOWN = 40  // down arrow
        const OPPONENT_UP    = 90; /* z */
        const OPPONENT_DOWN    = 98; /* x */
            
        switch (keyCode) {
                case PLAYER_UP:
                case PLAYER_DOWN:
                    const movedPlayer = moveBoard(playerPaddlePos, keyCode===PLAYER_UP); 
                    if (movedPlayer) {
                      //  setState({player: movedPlayer, pause: false,...state})
                    }
                    break;
                case OPPONENT_UP:
                case OPPONENT_DOWN:
                    // const opponentPlayer = moveBoard(opponentPaddlePos, keyCode===PLAYER_UP); 
                    // if (opponentPlayer) {
                    //   //  setState({player: opponentPlayer, pause: false,...state})
                    // }
                    break;
                default:
                    setPause(!pause)
                    break;
        }   
    }
    const bounceBall=()=>{
       // const newState = {...state}
        const newBallState = ballPos+deltaX+deltaY;
        setBallPos(newBallState)
        if(touchingEdge(newBallState)){
            setDeltaY(-deltaY)
        }
        if(touchingPaddleEdge(newBallState)){
            setDeltaY(-deltaY)
        }
        if(touchingPaddle(newBallState)){
           setDeltaX(-deltaX)
        }
        if(isScore(newBallState)){
            if(deltaX!==-1){
                setPlayerScore(playerScore+1)
            }else{
                setOpponentScore(opponentScore+1)
            }
            setPause(true)
        }
    }

    useEffect(()=>{
        document.onkeydown = handleKeyInput;
        setInterval(()=>{
            if(!pause){
                bounceBall();
            }
        },1000)
    },[pause])

    const isPlayer=(playerPos,idx)=>{
        for(let i=0;i<PADDLE_BOARD_SIZE;i+=1){
            if(playerPos+i*COL_SIZE===idx){
                return true;
            }
        }
        return false;
    }

    const board = [...Array(ROW_SIZE * COL_SIZE)].map((_, pos) => {
        let val = BACKGROUND;
        if (isPlayer(playerPaddlePos,pos) ||isPlayer(opponentPaddlePos,pos)) {
            val = PLAYER;
        } else if (ballPos === pos) {
            val = BALL;
        }
        return <Box key={pos} name={val} />;
    })
    return ( 
    <div style={inner}>
        <div style={style}>{board}</div>
    </div>
    )
}

export default Board;