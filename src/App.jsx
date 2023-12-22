import { useState } from "react"
import Player from "./components/player/Player"
import GameBoard from "./components/game-board/GameBoard"
import Log from "./components/log/Log";

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((currentPlayer) => currentPlayer == 'X' ? 'O' : 'X');

    setGameTurns(prevTurns => {
      let currentPlayer = 'X';
      if (prevTurns.length > 0 && prevTurns[0].player == currentPlayer)
        currentPlayer = 'O';

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
