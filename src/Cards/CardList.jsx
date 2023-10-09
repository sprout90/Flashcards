import React from "react";
import CardListItem from "./CardListItem";
import "../App.css";


function CardList({ deckId, cards, deleteCardEvent }) {

    if (cards.length > 0) {
        return ( 
            cards.map((card, index) =>  
                <CardListItem deckId={deckId} card={card} deleteCardEvent={deleteCardEvent} index={index} key={index} />
            )
        );
    } else {
        return (
            <div className="container">
                <br/>
                <h4>Loading ...</h4>
            </div>
        );
    }
}

export default CardList;