import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { readDeck } from "../utils/api";
import CardStudyItem from "../Cards/CardStudyItem";
import ErrorMessage from "../Layout/ErrorMessage";

function DeckStudy( ) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [error, setError] = useState(undefined);

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
    return <ErrorMessage error={error}></ErrorMessage>;
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
    console.log("currentCardIndex", currentCardIndex)
    const initCard = initializeEmptyCard();
    const nextCardIndex = currentCardIndex + 1;
    const cardCount = cards.reduce((counter) => counter+1, 0)

    initCard.lastCard = ((nextCardIndex + 1) === cardCount) ? true : false;
    initCard.displayText = cards[nextCardIndex].front;
    initCard.frontFacing = true;
    initCard.index = nextCardIndex;
    const studyCard = cards[nextCardIndex];
    const mergedCard = {...studyCard, ...initCard};
    console.log("current card", mergedCard)
    setCurrentCard(mergedCard);
   
  };

  const restartCardsHandler = () => {
    const initCard = initializeCard(0, true, false, cards[0].front);
    const studyCard = cards[0];
    setCurrentCard(...studyCard, ...initCard);
  };

  // return an initialized card object containing only supplemental state values
  function initializeCard(cardIndex, frontFacing, lastCard, displayText){

    return {index: cardIndex, frontFacing: frontFacing, lastCard: lastCard, displayText: displayText}
  }

  function initializeEmptyCard(){

    return {index: 0, frontFacing: true, lastCard: false, displayText: ""};
  }

  const cardCount = cards.reduce((counter) => counter+1, 0)
  
  console.log("currentCard", currentCard)

  return (
    <div className="container">
  
      {currentCard && 

        <span>
        <div className="col-12 bg-light">
          <span>Home 1 / </span>
          <span>{deck.name} / </span>
          <span>Study</span>
        </div>
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
}

export default DeckStudy;