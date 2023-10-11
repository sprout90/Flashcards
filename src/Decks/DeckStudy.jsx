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
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [error, setError] = useState(undefined);
  let cardCount = 0;
  let mergedCard = {};

  //TODO: Fix load error when 0 cards defined.

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
   
        const cardCount = studyCards.reduce((counter) => counter+1, 0)
        const initFirstCardText = (cardCount > 0) ? studyCards[0].front : "";
        const initFirstCard = initializeCard(0, true, false, initFirstCardText);
        if (cardCount > 0) {
          mergedCard = {...studyCards[0], ...initFirstCard};
        } else {
          mergedCard = { initFirstCard };
        }

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
    const mergedCard = {...studyCard, ...initCard};
    setCurrentCard(mergedCard);
  };

  // return an initialized card object containing only supplemental state values
  function initializeCard(cardIndex, frontFacing, lastCard, displayText){

    return {index: cardIndex, frontFacing: frontFacing, lastCard: lastCard, displayText: displayText, loaded: true}
  }

  function initializeEmptyCard(){

    return {index: 0, frontFacing: true, lastCard: false, displayText: "", loaded: true};
  }

  
  
  if (currentCard.loaded === true){
    if (cardCount > 2) {
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
    } else {
        return (
          <div>
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There are {cardCount} cards in this deck.</p>
            <CreateCardButton deckId={deck.id}></CreateCardButton>
          </div>
        );
    }
  } else {
    return <h4>Loading cards...</h4>
  }

}

export default DeckStudy;