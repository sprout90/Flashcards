import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { readDeck } from "../utils/api";
import CardStudyItem from "../Cards/CardStudyItem";
import CreateCardButton from "../Cards/CreateCardButton";
import BreadCrumb from "../Layout/Breadcrumb";
import ErrorMessage from "../Layout/ErrorMessage";

function DeckStudy( ) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState(undefined);
  const [currentCard, setCurrentCard] = useState(undefined);
  const [error, setError] = useState(undefined);
  let cardCount;

  // populate primary deck and card stack properties
  useEffect(() => {

    // retrieve decks with cards, and store the DeckData arry in useState
    const abortController = new AbortController();

    function LoadStudyDeck(){
      const deckPromise = readDeck(deckId, abortController.signal);
      deckPromise.then((result) => {
        const studyDeck = {id : result.id, name: result.name};
        const studyCards = result.cards;
        setDeck(studyDeck);
        setCards(studyCards);
   
        
        const initCard = initializeCard(0, true, false, studyCards[0].front);
        const mergedCard = {...studyCards[0], ...initCard};
        setCurrentCard(mergedCard);
      })
      .catch(setError);
    }

    LoadStudyDeck();

    return () => {
      abortController.abort();
    };
  }, []);


  if (error) {
    return (<div>
      <h2>Not enough cards.</h2>
      <p>You need at least 3 cards to study. There are 0 cards in this deck.</p>
      <CreateCardButton deckId={deck.id}></CreateCardButton>
      </div> 
      );
  }

  // define event actions for flip
  const flipCardHandler = () => {
 
    const initCard = { ...currentCard};
   
    // flip the card 
    if (initCard.frontFacing) {
      initCard.frontFacing = false;
      initCard.displayText = initCard.back
    } else {
      initCard.frontFacing = true;
      initCard.displayText = initCard.front
    }

    setCurrentCard(initCard);
  };

  const nextCardHandler = (currentCardIndex) => {

    const initCard = initializeEmptyCard();
    const nextCardIndex = currentCardIndex + 1;
    const cardCount = cards.reduce((counter) => counter+1, 0)

    initCard.lastCard = ((nextCardIndex + 1) === cardCount) ? true : false;
    initCard.displayText = cards[nextCardIndex].front;
    initCard.frontFacing = true;
    initCard.index = nextCardIndex;
    const studyCard = cards[nextCardIndex];
    const mergedCard = {...studyCard, ...initCard};
    setCurrentCard(mergedCard);
   
  };

  const restartCardsHandler = () => {
    const initCard = initializeCard(0, true, false, cards[0].front);
    const studyCard = cards[0];
    const mergedCard = {...studyCard, ...initCard};
    setCurrentCard(mergedCard);
  };

  // return an initialized card object containing only supplemental state values
  function initializeCard(cardIndex, frontFacing, lastCard, displayText){

    return {index: cardIndex, frontFacing: frontFacing, lastCard: lastCard, displayText: displayText}
  }

  function initializeEmptyCard(){

    return {index: 0, frontFacing: true, lastCard: false, displayText: ""};
  }

  if (cards !== undefined){
    cardCount = cards.reduce((counter) => counter+1, 0);
  } else {
    cardCount = undefined;
  }

  if ((cardCount != undefined) && (cardCount > 2)){
    return (
    
      <div className="container">
    
        {currentCard && 

          <span>
            <BreadCrumb crumb2={deck.name} crumb3="Study"></BreadCrumb>
          <div className="col-12 bg-light">
            <h1>{deck.name}: Study</h1>
          </div>
          <div className="col-12">
            <CardStudyItem 
              card = {currentCard}
              cardCount = {cardCount} 
              flipEvent={flipCardHandler} 
              nextEvent={nextCardHandler} 
              restartEvent={restartCardsHandler}  
            />
          </div>
          </span>
        }
      </div>
    ); 
  } else { if ((cardCount != undefined) && (cardCount <= 2))
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards to study. There are {cardCount} cards in this deck.</p>
        <CreateCardButton deckId={deck.id}></CreateCardButton>
      </div>
    ); else 
    return (<h4>Loading...</h4>);

  }
}

export default DeckStudy;