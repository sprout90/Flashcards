import React from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function DeckView() {
  const { deckId }  = useParams();
  return (   <p> Deck View: {deckId} </p>    );
}

export default DeckView;