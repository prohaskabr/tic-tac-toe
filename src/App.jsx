import { useState } from "react"
import { WINNING_COMBINATIONS } from "./assets/winning-combinations.js";
import Player from "./components/player/Player"
import GameBoard from "./components/game-board/GameBoard"
import Log from "./components/log/Log";
import GameOver from "./components/game-over/GameOver.jsx";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function getActivePlayerFrom(gameTurns) {
  let activePlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player == activePlayer)
    activePlayer = 'O';

  return activePlayer;
}

function getWinner(gameBoard, players) {
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = players[firstSymbol];
    }
  }

  return winner;
}

function loadGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(inner => [...inner])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    gameBoard[square.row][square.column] = player;
  }

  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = getActivePlayerFrom(gameTurns);
  const gameBoard = loadGameBoard(gameTurns);
  const winner = getWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = getActivePlayerFrom(prevTurns);

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
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange} />
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main >
  )
}

export default App
