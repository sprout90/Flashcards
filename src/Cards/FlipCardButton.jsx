import React  from "react";
import "../App.css";

function FlipCardButton({ flipEvent }) {

  return (  
    <button className="btn p-2 border border-primary" onClick={flipEvent}>Flip </button>
  );
  
}

export default FlipCardButton;