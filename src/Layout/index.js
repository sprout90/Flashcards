import React, {useState, useEffect } from "react";
import {Route, Switch, useRouteMatch, useHistory} from "react-router-dom";
import Header from "./Header";
import Deck from "../Decks/Deck";
import DeckView from "../Decks/DeckView";
import DeckEdit from "../Decks/DeckEdit";
import DeckStudy from "../Decks/DeckStudy";
import CardEdit from "../Cards/CardEdit";
import ErrorMessage from "./ErrorMessage";
import NotFound from "./NotFound";
import { listDecks, createDeck, updateDeck, deleteDeck, createCard, updateCard } from "../utils/api";


function Layout() {
  const {path} = useRouteMatch();
  const [decks, setDecks] = useState([]);
  const [deckId, setDeckId] = useState(undefined);
  const [error, setError] = useState(undefined);
  const history = useHistory();
  
  useEffect(() => {

    // retrieve decks with cards, and store the DeckData arry in useState
    const abortController = new AbortController();

    function loadDecks(){
      const deckPromise = listDecks(abortController.signal);
      deckPromise.then(setDecks).catch(setError);

      return <h2>Loading Decks...</h2>
    }

    loadDecks();

    return () => {
      abortController.abort();
    };
  }, []);

 // define event actions for create and delete
 const createDeckHandler = (newDeck) => {

    const abortController = new AbortController(); 

    const deckPromise = createDeck(newDeck, abortController.signal);
       deckPromise.then((result) => {
        // add new deck (with id) to end of list, and set state
        newDeck.id = result.id;
        const url = `/decks/${newDeck.id}`
        const currentDecks = [...decks, newDeck];
        setDecks(currentDecks); 
        setDeckId(newDeck.id);
        history.push(url);
      })
      .catch(setError);
 
    return () => {
      abortController.abort();
    };
 };
 
 



// define event actions for create and delete
const saveDeckHandler = (saveDeck) => {
  const abortController = new AbortController();
 
  const deckPromise = updateDeck(saveDeck, abortController.signal);
      deckPromise.then((result) => history.goBack())
      .catch(setError);

   return () => {
     abortController.abort();
   };
};


 const deleteDeckHandler = (deckId) => {

  const currentDecks = decks.filter((deck, index) => deck.id != deckId);
  
  // remove deck from database
  const abortController = new AbortController();
  const deleteDeckPromise = deleteDeck(deckId, abortController.signal);
    deleteDeckPromise.then().catch(setError);

  // update deck array and kick-off reload
  setDecks(currentDecks); 
  
  return () => {
     abortController.abort();
   };
   
 };


 const createCardHandler = (deckId, newCard) => {
  const abortController = new AbortController(); 

  console.log("new card", newCard)
  const cardPromise = createCard(deckId, newCard, abortController.signal);
     cardPromise.then((result) => { 
      console.log("new card result", result)
      const url = `/decks/${deckId}/cards/new`
      history.push({pathname: url, state: {reload: true}});
    })
     .catch(setError);

  return () => {
    abortController.abort();
  };
 }

 const saveCardHandler = (deckId, saveCard) => {
  saveCard.deckId = parseInt(deckId);
  console.log("updating card", saveCard)
  const abortController = new AbortController();

   const cardPromise = updateCard(saveCard, abortController.signal);
      cardPromise.then(() => {
        history.push(`/decks/${deckId}`);
      })
      .catch(setError);

   return () => {
     abortController.abort();
   };
 }

  return (
    <div>
      <Header />
      <div className="container">
        
        <Switch>
          <Route path={`${path}decks/:deckId/cards/new`}>
            <CardEdit createCardEvent={createCardHandler} saveCardEvent={saveCardHandler}/>
          </Route>
          <Route path={`${path}decks/:deckId/cards/:cardId`}>
            <CardEdit createCardEvent={createCardHandler} saveCardEvent={saveCardHandler} deckId={deckId}/>
          </Route>

          <Route path={`${path}decks/new`}>
            <DeckEdit createDeckEvent={createDeckHandler} saveDeckEvent={saveDeckHandler} deckId={deckId}/>
          </Route>
          <Route path={`${path}decks/:deckId/study`}>
            <DeckStudy />
          </Route>
          <Route path={`${path}decks/:deckId/edit`}>
            <DeckEdit deckId={deckId} createDeckEvent={createDeckHandler} saveDeckEvent={saveDeckHandler}/>
          </Route>
          <Route path={`${path}decks/:deckId`}>
            <DeckView deckId={deckId} deleteDeckEvent={deleteDeckHandler} />
          </Route>
          <Route exact path="/" >
            <Deck decks={decks} deleteDeckEvent={deleteDeckHandler} />
          </Route>
          <Route >
            <NotFound />
          </Route>
        </Switch>
        </div>
      </div>
  );
}

export default Layout;
