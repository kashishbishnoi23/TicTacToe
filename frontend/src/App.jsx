import React, { useState, useEffect } from "react";
import Entry from "../components/Entry";
import GameBoard from "../components/GameBoard";
import Loader from "../components/Loader";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [playerName, setPlayerName] = useState("");
  const [oppName, setOppName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]);
  const [playerValue, setplayerValue] = useState("X");

  const [playersData, setPlayersData] = useState([]);
  

  useEffect(() => {
    socket.on("playersData", (e) => {
      setAllPlayers(e.allPlayers);
      const foundObj = e.allPlayers.find(
        (obj) => obj.p1.p1name === playerName || obj.p2.p2name === playerName
      );

      console.log("foundObj" ,foundObj);
      console.log(e.allPlayers);
      setPlayersData(Array(foundObj));
      const opponentName = Object.values(foundObj)
    .map(obj => obj.p1name || obj.p2name) // Extract names
    .find(name => name !== playerName); // Find the name that is not playerName

    setOppName(opponentName);
    // let playerValue = null;

    for (let key in foundObj) {
      let obj = foundObj[key];
      if (obj.p1name === playerName) {
          // playerValue = obj.p1value;
          setplayerValue(obj.p1value);
          break;
      } else if (obj.p2name === playerName) {
          // playerValue = obj.p2value;
          setplayerValue(obj.p2value);
          break;
      }
  }
      
    });
    console.log("allPlayers", allPlayers);

    return () => {
      socket.off("playersData");
    };
  }, [playerName]);

  return (
    <>
      {allPlayers.length === 0 ? (
        submitted && playerName ? (
          <Loader allPlayers={allPlayers} />
        ) : (
          <Entry
            playerName={playerName}
            setPlayerName={setPlayerName}
            submitted={submitted}
            setSubmitted={setSubmitted}
          />
        )
      ) : playersData ? (
      
        <GameBoard
          // allPlayers={allPlayers}
          // setAllPlayers={setAllPlayers}
          playersData={playersData}
          playerName={playerName}
          oppName={oppName}
          playerValue={playerValue}
       
        />
      ) : (
        // <div>hi</div>
        ""
        // ""
      )}
    </>
  );
}

export default App;
