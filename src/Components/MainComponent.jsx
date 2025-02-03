import React, { useEffect, useState } from 'react'
import "../CSS/MainComponent.css"


const randomColorGenerator = () =>{
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)]
    }

    return color
}


export default function MainComponent() {

    const[targetColor, setTargetColor] = useState("")
    const[colorOption, setColorOption] = useState([])
    const[gameStatus, setGameStatus] = useState("")
    const[gameScore, setGameScore] = useState(0)
    const[isCorrect, setIsCorrect] = useState(null)

    const startGame = () =>{
        const newTargetColor = randomColorGenerator()
        const option = [newTargetColor, randomColorGenerator, randomColorGenerator, randomColorGenerator, randomColorGenerator, randomColorGenerator].sort(() => Math.random()-0.5 )
        setTargetColor(newTargetColor)
        setColorOption(option)
        setGameStatus('')
        setIsCorrect(null)
    }
    

    useEffect(()=>{
      startGame()  
    },[])

    const handleGuess = (color) =>{
        if (color === targetColor) {
            setGameStatus("Correct")
            setGameScore(gameScore + 1)
            setIsCorrect(true)
            setTimeout(startGame, 1200)
            
        }else{
            setGameStatus("Wrong Guess, try again 😥")
            setIsCorrect(false)
        }
    }

    const handleNewGame = () =>{
        setGameScore(0)
        startGame()
    }

  return (
    <div>
        <div className="body">
            <h2>Can you guess the right Color?</h2>
            <div className="score-and-cancel-button">
                <p>Score: {gameScore} </p>
                <button className='cancelBtn' onClick={()=> handleNewGame()}>New game</button>
            </div>
            {/* {isCorrect? } */}
            <span>correct</span>
            <div className="box" style={{backgroundColor: targetColor}}></div>
            <div className="colorOptions">
                {colorOption.map((color, index) => (
                    <button key={index} style={{backgroundColor: color}} onClick={() => handleGuess(color)}></button>
                ))}
            </div>

        </div>
    </div>
  )
}
