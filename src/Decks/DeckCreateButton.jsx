import React from "react";
import {Link} from "react-router-dom";

function DeckCreateButton({ createDeck } ) {
  return (  <Link to={ 
      { pathname: "/decks/new", 
        currentDeck: createDeck
      } } 
      >+ Create Deck</Link>  );
}

export default DeckCreateButton;