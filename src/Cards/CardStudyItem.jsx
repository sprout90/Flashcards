import React  from "react";
import FlipCardButton from "./FlipCardButton";
import NextCardButton from "./NextCardButton";
import RestartCardsButton from "./RestartCardsButton";
import "../App.css";

function CardStudyItem({ card, cardCount, flipEvent, nextEvent, restartEvent }) {

    let displayNext = false;
    let displayRestart = false;
    const cardNumber = card.index + 1;

    if (card.frontFacing === false) {
        displayNext = true;
    } 

    if (card.lastCard) {
        displayRestart = true;
    } else {
        displayRestart = false;
    }
 
    // TODO: Replace Restart button with Windows.confirm() to appear after last card is flipped.
    // If yes, restart deck.  If no, return user to home screen. 
    return (  

        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Card {cardNumber} of {cardCount}</h5>
                <p className="card-text">{card.displayText}</p>
                <FlipCardButton flipEvent={() => flipEvent()} ></FlipCardButton>
                <NextCardButton display={displayNext} nextEvent={() => nextEvent(card.index)} key={card.index} ></NextCardButton>
                <RestartCardsButton display={displayRestart} restartEvent={()=>restartEvent()} ></RestartCardsButton>
            </div>
        </div>
  );

}

export default CardStudyItem;