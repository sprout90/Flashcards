import React from "react";
import DeckListItem from "./DeckListItem";
import "../App.css";


function DeckList({ decks, deleteDeckEvent }) {

    if (decks.length > 0) {
        return ( 
            decks.map((deck, index) =>  
                <DeckListItem deck={deck} deleteDeckEvent={deleteDeckEvent} key={index} index={index}/>
            )
        );
    } else {
        return (
            <div className="container">
                <br/>
                <h4>Loading decks...</h4>
            </div>
        );
    }
}

export default DeckList;