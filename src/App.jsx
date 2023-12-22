import { useState } from "react"
import { WINNING_COMBINATIONS } from "./assets/winning-combinations.js";
import Player from "./components/player/Player"
import GameBoard from "./components/game-board/GameBoard"
import Log from "./components/log/Log";
import GameOver from "./components/game-over/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function GetActivePlayerFrom(gameTurns) {
  let activePlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player == activePlayer)
    activePlayer = 'O';

  return activePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(
    {
      'X': 'Player 1',
      'O': 'Player 2'
    }
  );
  const activePlayer = GetActivePlayerFrom(gameTurns);

  let gameBoard = [...initialGameBoard.map(inner => [...inner])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    gameBoard[square.row][square.column] = player;
  }

  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = players[firstSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = GetActivePlayerFrom(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, column: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prev => {
      return {
        ...prev,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main >
  )
}

export default App
