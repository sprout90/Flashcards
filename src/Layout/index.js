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
import { listDecks, createDeck, updateDeck } from "../utils/api";


function Layout() {
  const {path} = useRouteMatch();
  const [decks, setDecks] = useState([]);
  const [deckId, setDeckId] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [navUrl, setNavUrl] = useState(undefined);
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

  /*useEffect(() => {
  
    history.push(navUrl)
  }, navUrl)
  */

 // define event actions for create and delete
 const createDeckHandler = (newDeck) => {
   console.log("saving deck", newDeck)
   const abortController = new AbortController();

  
    const deckPromise = createDeck(newDeck, abortController.signal);
       deckPromise.then((result) => {
        // add new deck (with id) to end of list, and set state
        newDeck.id = result.id;
        console.log("layout deckid", newDeck.id)
        const url = `/decks/${newDeck.id}`
        setNavUrl(url);
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
  console.log("updating deck", saveDeck)
  const abortController = new AbortController();

 
   const deckPromise = updateDeck(saveDeck, abortController.signal);
      deckPromise.then((result) => {
       // update deck and set state
       //newDeck.id = result.id;
       console.log("layout deckid", saveDeck.id)
       setNavUrl(`/decks/${saveDeck.id}`);

      // TODO: add logic to update existing deck in array
      // possibly replacing the currentDecks assignment. 

       const currentDecks = [...decks, saveDeck];
       setDecks(currentDecks); 
       setDeckId(saveDeck.id);
       
     })
     .catch(setError);

   return () => {
     abortController.abort();
   };
};


 const deleteDeckHandler = (indexToDelete) => {

   // remove deck where not equal to received indexToDelete parameter, and set state
   const currentDecks = decks.filter((deck, index) => index !== indexToDelete);
   setDecks(currentDecks); 
 };


  return (
    <div>
      <Header />
      <div className="container">
        
        <Switch>
          <Route path={`${path}decks/new`}>
            <DeckEdit createDeckEvent={createDeckHandler} saveDeckEvent={saveDeckHandler} deckId={deckId}/>
          </Route>
          <Route path={`${path}decks/:deckId/study`}>
            <DeckStudy />
          </Route>
          <Route path={`${path}decks/:deckId/edit`}>
            <DeckEdit id={deckId} createDeckEvent={createDeckHandler} saveDeckEvent={saveDeckHandler}/>
          </Route>
          <Route path={`${path}decks/:deckId/cards/new`}>
            <CardEdit />
          </Route>
          <Route path={`${path}decks/:deckId`}>
            <DeckView id={deckId} />
          </Route>
          <Route path="/" >
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
