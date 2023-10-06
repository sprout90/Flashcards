import React  from "react";
import FlipCardButton from "./FlipCardButton";
import NextCardButton from "./NextCardButton";
import RestartCardsButton from "./RestartCardsButton";
import "../App.css";

function CardStudyItem({ card, cardCount, flipEvent, nextEvent, restartEvent }) {

    let displayNext = false;
    let displayRestart = false;

    if (card.lastCard) {
        displayNext = false;
        displayRestart = true;
    } else {
        displayNext = true;
        displayRestart = false;
    }
 
    console.log("display text", card.displayText)
    return (  

        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Card {card.id} of {cardCount}</h5>
                <p className="card-text">{card.displayText}</p>
                <FlipCardButton flipEvent={() => flipEvent()} ></FlipCardButton>
                <NextCardButton display={displayNext} nextEvent={() => nextEvent(card.index)} key={card.index} ></NextCardButton>
                <RestartCardsButton display={displayRestart} restartEvent={()=>restartEvent()} ></RestartCardsButton>
            </div>
        </div>
  );

}

export default CardStudyItem;