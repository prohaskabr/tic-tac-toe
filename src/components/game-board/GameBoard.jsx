const initialGame = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function GameBoard({ onSelectSquare, turns }) {
    let gameBoard = initialGame;

    for (const turn of turns) {
        const { square, player } = turn;
        gameBoard[square.row][square.column] = player;
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
            (<li key={rowIndex}>
                <ol>
                    {row.map((symbol, colIndex) =>
                    (<li key={colIndex}><button onClick={() => onSelectSquare(rowIndex, colIndex)} >{symbol}</button>
                    </li>))}
                </ol>
            </li>))}
        </ol>
    );
}

export default GameBoard;       