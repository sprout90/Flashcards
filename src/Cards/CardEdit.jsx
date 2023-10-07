import React from "react";
import {useParams} from "react-router-dom";

function CardEdit() {
  const {currentDeck} = useParams();
  console.log("edit", currentDeck);
  return ( <p> Card Edit </p>  );
}

export default CardEdit;