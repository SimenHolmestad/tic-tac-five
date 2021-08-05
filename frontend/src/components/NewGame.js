import React, { useState } from 'react';
import { createNewGame } from './../actions/ActiveGamesActions';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

function NewGame() {
  const [newGameName, setNewGameName] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const createNewGameAndLoadIt = async () => {
    const createdGame = await dispatch(createNewGame(newGameName))
    history.push(`/play/${createdGame._id}/both_players`)
  }

  return (
    <div style={{marginBottom: "30px"}}>
      <h1>Create new game</h1>
      <input
        type="text"
        value={newGameName}
        placeholder="Name of game"
        onChange={e => setNewGameName(e.target.value)}
      />
      <button onClick={createNewGameAndLoadIt}>Create game</button>
    </div>
  );
}

export default NewGame;
