import React, {useState, useEffect } from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Header from "./Header";
import Deck from "../Decks/Deck";
import DeckView from "../Decks/DeckView";
import DeckEdit from "../Decks/DeckEdit";
import DeckStudy from "../Decks/DeckStudy";
import ErrorMessage from "./ErrorMessage";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api";


function Layout() {
  const {path} = useRouteMatch();
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  let decksOutput;
  
  useEffect(() => {

    // retrieve decks with cards, and store the DeckData arry in useState
    const abortController = new AbortController();

    function loadDecks(){
      const deckPromise = listDecks(abortController.signal);
      deckPromise.then(setDecks).catch(setError);

    }

    loadDecks();

    return () => {
      abortController.abort();
    };
  }, []);

  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }

 // define event actions for create and delete
 const createDeck = (newDeck) => {

   // add new deck to end of list, and set state
   const currentDecks = [...decks, newDeck];
   setDecks(currentDecks); 
 };

 const deleteDeck = (indexToDelete) => {

   // remove deck where not equal to received indexToDelete parameter, and set state
   const currentDecks = decks.filter((deck, index) => index !== indexToDelete);
   setDecks(currentDecks); 
 };


  return (
    <div>
      <Header />
      <div className="container">

  

        <Switch>
          <Route path={`${path}decks/:deckId/study`}>
            <DeckStudy />
          </Route>
          <Route path={`${path}decks/:deckId`}>
            <DeckView />
          </Route>
          <Route path={`${path}decks/new`}>
            <DeckEdit />
          </Route>
          <Route path="/" >
            <Deck decks={decks} createDeck={createDeck} deleteDeck={deleteDeck} />
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
