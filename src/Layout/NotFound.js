import React from "react";
import {useLocation } from "react-router-dom";

function NotFound() {
  const location = useLocation();

  return (
    <div className="NotFound">
      <h1>Not Found</h1>
      <h3>No match was found for path <code>{location.pathname}</code></h3>
    </div>
  );
}

export default NotFound;
