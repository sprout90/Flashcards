import React, {useState, useEffect} from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import "../App.css";
import BreadCrumb from "../Layout/Breadcrumb";
import DeckDeleteButton from "./DeckDeleteButton";
import DeckStudyButton from "./DeckStudyButton";
import DeckEditButton from "./DeckEditButton";
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
        <div className="col-3">
          <DeckDeleteButton deleteDeckEvent={() => deleteDeckEvent(deckId, index)}></DeckDeleteButton>
        </div>
        
      </div>
      <div>

      </div>
    </div>  
  );

}

export default DeckView;