import React from "react";
import DeckCreateButton from "../Decks/DeckCreateButton";
import DeckList from "../Decks/DeckList";

function Deck( {decks, deleteDeckEvent} ){

    return (
        <div>
            <div className="container">
                <div className="row g-2">
                    <DeckCreateButton /> 
                </div>
                <div className="row g-2">
                    <DeckList decks={decks} deleteDeckEvent={deleteDeckEvent} />            
                </div>
            </div>
        </div>
    );
}

export default Deck;