function Log({ gameTurns }) {
    return (
        <ol id="log">
            {gameTurns.map(turn => <li key={`${turn.square.row}${turn.square.column}`}>{turn.player} selected {turn.square.row} , {turn.square.column}</li>)}
        </ol>);
}

export default Log;