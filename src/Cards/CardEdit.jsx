import React from "react";
import {useParams} from "react-router-dom";

function CardEdit() {
  const {currentCard} = useParams();
  console.log("edit", currentCard);
  return ( <p> Card Edit </p>  );
}

export default CardEdit;