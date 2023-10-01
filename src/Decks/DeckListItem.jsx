import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "../App.css";

function DeckListItem({ deck, deleteDeck }) {

  const {url} = useRouteMatch();
  const cards = deck.cards;
  const cardCount = cards.reduce((counter) => counter+1, 0)

  console.log ("deck.name", deck.name, url)
  return (  

        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{deck.name} </h5>
                <span> {cardCount} cards</span>
                <p className="card-text">{deck.description}</p>
                <Link to={`/decks/${deck.id}`} className="btn p-2 border border-primary">View </Link>
                <Link to={`/decks/${deck.id}/study`} className="btn p-2 border border-primary">Study</Link>
                <button name="delete" onClick={deleteDeck} className="p-2">Delete</button>
            </div>
        </div>
  );
}

export default DeckListItem;