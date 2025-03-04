import React from 'react'
import { useState } from 'react'
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Entry = ({playerName, setPlayerName, submitted, setSubmitted}) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    if (playerName) {
      socket.emit("playerData", { name: playerName });
      setSubmitted(true);
      console.log(playerName);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-5xl font-bold text-center mb-8 text-green-600">Tic Tac Toe</h1>
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <input 
            className="border border-gray-300 p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-600" 
            placeholder='Enter your name' 
            value={playerName} 
            onChange={(e)=> setPlayerName(e.target.value)}
            required
          />
          <button className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-full'>
            Search for a player
          </button>
        </form>
      </div>
    </>
  )
}

export default Entry