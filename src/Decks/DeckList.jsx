import React from "react";
import DeckListItem from "./DeckListItem";
import "../App.css";


function DeckList({ decks, deleteDeckEvent }) {

  
    return ( 
        decks.map((deck, index) =>  
            <DeckListItem deck={deck} deleteDeck={() => deleteDeckEvent(index)} key={index}/>
        )
    );
}

export default DeckList;