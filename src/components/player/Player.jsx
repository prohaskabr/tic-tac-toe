import { useState } from "react";

function Player({ name, symbol, isActive, onNameChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    function HandleEditClick() {
        setIsEditing((editing) => !editing);
        onNameChange(symbol, playerName);
    }

    function HandleOnChange(event) {
        setPlayerName(event.target.value);
    }

    let displayInput = <span className="player-name">{playerName}</span>;
    if (isEditing)
        displayInput = <input type="text" id="inputName" required defaultValue={playerName} onChange={HandleOnChange} />;

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="palyer">
                {displayInput}
                <spam className="player-symbol">{symbol}</spam>
                <button onClick={HandleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
        </li>);
}

export default Player;