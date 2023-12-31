import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import BreadCrumb from "../Layout/Breadcrumb";
import DeckDeleteButton from "./DeckDeleteButton";
import DeckStudyButton from "./DeckStudyButton";
import DeckEditButton from "./DeckEditButton";
import CardList from "../Cards/CardList";
import CreateCardButton from "../Cards/CreateCardButton";
import { readDeck, deleteCard } from "../utils/api";

function DeckView( { deleteDeckEvent } ) {
 
  const {deckId} = useParams(); 
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(undefined);

  // populate primary deck and card stack properties
  useEffect(() => {

  // retrieve decks with cards, and store the DeckData arry in useState
  const abortController = new AbortController();

    function LoadDeck(){
      const deckPromise = readDeck(deckId, abortController.signal);
      deckPromise.then((result) => {
        const deck = {id : result.id, name: result.name, description: result.description};
        const cards = result.cards;
        setDeck(deck);
        setCards(cards);
  
      })
      .catch(setError);

  }

  LoadDeck();

  return () => {
    abortController.abort();
  };
}, []);

const deleteCardHandler = (cardId) => {

  // remove card where not equal to received cardId parameter, and set state
  const currentCards = cards.filter((card, index) => { return card.id != cardId } );
    
  // remove card from database
  const abortController = new AbortController();
  const deleteCardPromise = deleteCard(cardId, abortController.signal);
    deleteCardPromise.then().catch(setError);

  // update card array and kick-off reload
  setCards(currentCards); 
  
  return () => {
     abortController.abort();
   };


};


  return ( 
    <div className="container">
      <div className="row">
        
        <div className="col-12">
          <BreadCrumb crumb2={deck.name}></BreadCrumb>
          <br/>
          <h4>{deck.name} </h4>    
          <p>{deck.description}</p>
        </div>
        <div className="col-9">
          <DeckEditButton deckId={deckId}></DeckEditButton>
          &nbsp;
          <DeckStudyButton deckId={deckId}></DeckStudyButton>
          &nbsp;
          <CreateCardButton deckId={deckId}></CreateCardButton>
        </div>
        <div className="col-3 d-flex justify-content-end">
          <DeckDeleteButton deleteDeckEvent={() => deleteDeckEvent(deckId)}></DeckDeleteButton>
        </div>
        <div className="col-12">
          <br/>
          <h2>Cards</h2>
        </div>
        <div className="col-12">
          <CardList deckId={deckId} cards={cards} deleteCardEvent={deleteCardHandler}></CardList>
        </div>
        <div className="col-12">
          &nbsp;
        </div>
      </div>
   
    </div>  
  );

}

export default DeckView;