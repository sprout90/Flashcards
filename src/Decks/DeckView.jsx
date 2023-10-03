import React from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function DeckView() {
  const { deckId }  = useParams();
  console.log("deck view", deckId);
  return (   <p> Deck View: {deckId} </p>    );
}

export default DeckView;