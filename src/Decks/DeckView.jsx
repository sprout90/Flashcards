import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import "../App.css";

function DeckView() {
  const { id }  = useParams();
  const { url } = useRouteMatch();
  console.log("deck view", id);
  return ( 
    <div>
    <p> Deck View: {id} </p>    
    <p> URL: {url} </p>
    </div>  
    );

}

export default DeckView;