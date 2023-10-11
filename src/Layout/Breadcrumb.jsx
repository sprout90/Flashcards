import React from "react";
import { Link } from "react-router-dom"; 

function Breadcrumb({crumb2, crumb3}){

    let slash2; 
    let fontColor;

    // crumb2 and crumb3 is optional, only display slash both defined.
    if ((crumb2 === undefined) || (crumb3 === undefined)){
        slash2 = " ";
    } else {
        slash2 = " / "
        fontColor = "text-primary";
    }

    return (
        <div className="col-12 bg-light">
            <span><Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
            </svg>
            &nbsp;Home</Link> / </span>
            <span className={`${fontColor}`}>{crumb2} </span>
            <span>{crumb3}</span>
        </div>
    );
}

export default Breadcrumb;