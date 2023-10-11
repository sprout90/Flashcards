import React  from "react";
import "../App.css";

function RestartCardsButton({ display, restartEvent }) {

  return (  
    <span>
        {display && 
        <button className="btn p-2 border border-primary" onClick={() => {
          if (window.confirm("Restart cards?\nClick 'cancel' to return to home page.")){
              restartEvent();
              } 
          }}>Next </button>
        }
    </span>
  );
  
}

export default RestartCardsButton;