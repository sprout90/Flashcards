import React from "react";
import { useHistory } from "react-router-dom"; 

function Navigate({url}){
    const history = useHistory();
    console.log("nav url", url)

    if (url) {
        console.log("valid url")
        history.push(url);
    }
   
}

export default Navigate;