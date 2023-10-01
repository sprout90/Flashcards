import React from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function DeckStudy() {
  const { deckId } = useParams();

  return (  
    <p>Deck to Study {deckId}</p>

  );
}

export default DeckStudy;