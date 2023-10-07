import React  from "react";
import "../App.css";

function RestartCardsButton({ display, restartEvent }) {

  return (  
    <span>
        {display && 
        <button className="btn p-2 border border-primary" onClick={restartEvent}>Restart </button>
        }
    </span>
  );
  
}

export default RestartCardsButton;