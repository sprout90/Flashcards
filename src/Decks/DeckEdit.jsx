import React from "react";
import {useParams} from "react-router-dom";

function DeckEdit() {
  const {currentDeck} = useParams();
  console.log("edit", currentDeck);
  return ( <p> Deck Edit </p>  );
}

export default DeckEdit;