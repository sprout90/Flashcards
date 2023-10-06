import React  from "react";
import "../App.css";

function NextCardButton({ display, nextEvent }) {

    return (  
       <span>
        {display && 
            <button className="btn p-2 border border-primary" onClick={nextEvent}>Next </button>
        }
        </span>
  );
  
}

export default NextCardButton;