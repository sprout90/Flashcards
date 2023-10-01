import React from "react";
import DeckListItem from "./DeckListItem";
import "../App.css";


function DeckList({ decks, deleteDeck }) {

  
    return ( 
        decks.map((deck, index) =>  
            <DeckListItem deck={deck} deleteDeck={() => deleteDeck(index)} key={index}/>
        )
    );
}

export default DeckList;