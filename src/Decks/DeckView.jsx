import React, {useState, useEffect} from "react";
import { useRouteMatch, useParams } from "react-router-dom";
import "../App.css";
import BreadCrumb from "../Layout/Breadcrumb";
import DeckDeleteButton from "./DeckDeleteButton";
import DeckStudyButton from "./DeckStudyButton";
import DeckEditButton from "./DeckEditButton";
import CardList from "../Cards/CardList";
import CreateCardButton from "../Cards/CreateCardButton";
import { readDeck } from "../utils/api";

function DeckView( { deleteDeckEvent, index } ) {
 
  const {deckId} = useParams(); 
  const { url } = useRouteMatch();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(undefined);

  console.log("deckId", deckId)

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

const deleteCardHandler = (cardId, indexToDelete) => {

  // remove deck where not equal to received indexToDelete parameter, and set state
  const currentCards = cards.filter((card, index) => index !== indexToDelete);
  setCards(currentCards); 
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
          <DeckDeleteButton deleteDeckEvent={() => deleteDeckEvent(deckId, index)}></DeckDeleteButton>
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