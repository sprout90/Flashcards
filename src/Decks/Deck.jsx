import React from "react";
import DeckCreateButton from "../Decks/DeckCreateButton";
import DeckList from "../Decks/DeckList";

function Deck( {decks, createDeck, deleteDeck} ){

    return (
        <div>
            <div className="container">
                <div className="row g-2">
                    <DeckCreateButton createDeck={createDeck} /> 
                </div>
                {decks && 
                <div className="row g-2">
                    <DeckList decks={decks} deleteDeck={deleteDeck} />            
                </div>
                }
            </div>
        </div>
    );
}

export default Deck;