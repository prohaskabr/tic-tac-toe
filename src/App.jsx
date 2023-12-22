import { useState } from "react"
import Player from "./components/player/Player"
import GameBoard from "./components/game-board/GameBoard"
import Log from "./components/log/Log";

function GetActivePlayerFrom(gameTurns) {
  let activePlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player == activePlayer)
    activePlayer = 'O';

  return activePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = GetActivePlayerFrom(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = GetActivePlayerFrom(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, column: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare}
          turns={gameTurns} />
      </div>
      <Log gameTurns={gameTurns} />
    </main >
  )
}

export default App
