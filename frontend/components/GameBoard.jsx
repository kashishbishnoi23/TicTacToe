import React from 'react'
import { io } from "socket.io-client";
import { useState, useEffect } from 'react';

const socket = io("http://localhost:3000");

const GameBoard = ({ playerValue, oppValue, playerName, oppName, playersData }) => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Board state
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winnerName, setWinnerName] = useState(null);

  const restart = () => {
    socket.emit("restart");
  }

  useEffect(() => {
    socket.on("gameState", ({ board, currentTurn, reset }) => {
      setBoard(board);
      setCurrentTurn(currentTurn);
      if (reset) setWinner(null);
    });

    socket.on("gameOver", ({ winner }) => {
      setWinner(winner);
      if (winner === "Draw") {
        setWinnerName("Draw");
      } else {
        for (let obj of playersData) {
          if (obj.p1.p1value === winner) {
            setWinnerName(obj.p1.p1name);
          } else if (obj.p2.p2value === winner) {
            setWinnerName(obj.p2.p2name);
          }
        }
      }
    });

    return () => {
      socket.off("gameState");
      socket.off("gameOver");
    }
  }, [playersData]);

  const handleClick = (index) => {
    if (board[index] !== null) return; // prevents overwriting

    if (playerValue === currentTurn) {
      socket.emit("playerMove", { index, symbol: playerValue });
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-5xl font-bold text-center mb-8 text-green-600">Tic Tac Toe</h1>

        <div className='w-[50%] flex justify-between mb-4'>
          <div className="text-2xl font-semibold">You: {playerName}</div>
          <div className="text-2xl font-semibold">Opponent: {oppName}</div>
        </div>

        <div className='w-full flex flex-col items-center mb-8'>
          <div className="text-2xl mb-2 font-bold">You are playing as <span className="font-bold">{playerValue}</span></div>
          <div className="text-xl font-semibold">{currentTurn}'s Turn</div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {board.map((value, index) => (
            <button key={index} className='h-20 w-20 border border-green-400 bg-green-100 text-green-600 font-semibold text-xl hover:bg-green-200'
              onClick={() => handleClick(index)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {winner ? 
      <div className='flex  w-full justify-center gap-5'>
      <div className='text-3xl text-green-600 text-center '>
        {winner !== 'Draw' ?  <span> {winnerName} ({winner}) won </span> : <span>{winner}</span> }
        </div>
       <button onClick={restart} className='bg-green-600 px-3 py-2 rounded-2xl  text-white text-md'>Restart</button>
      </div> : ""}
    </>
  )
}

export default GameBoard