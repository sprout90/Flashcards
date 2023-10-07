import React, {useState} from "react";
import {Link, useParams, useRouteMatch, useHistory} from "react-router-dom";
import Breadcrumb from "../Layout/Breadcrumb";

function DeckEdit({ createDeckEvent }) {
  const {deckId} = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
 

   // define inital form state object 
   const initialFormState = {
    name: "",
    description: "",
  };

  // define formData state object
  const [formData, setFormData] = useState({ ...initialFormState });
  const title = (path === "/decks/new") ? "Create Deck" : "Edit Deck";

 
  // define event handlers for field-level change, and form submit
  const handleChange = ({ target }) => { 
    setFormData({ ...formData, [target.name]: target.value, 
    });  
  };

  return ( 
    <div>
      <Breadcrumb crumb2={title}></Breadcrumb>
      <div>
        <h1>{title}</h1>
      </div>
      <form name="create" onSubmit={(event) => {
          event.preventDefault();
          createDeckEvent(formData);
          history.push(`/decks/${deckId}`)
        } }
      >
          <label htmlFor="name">Name<br/>
            <input 
              id="name" 
              name="name" 
              type="text" 
              placeholder="Deck Name"
              onChange={handleChange}
              value={formData.name}
              required={true} />
            </label>
          <br/>
          <label htmlFor="description">Description<br/>
            <textarea 
              id="description" 
              name="description" 
              rows="5" 
              cols="50" 
              placeholder="Brief description of the deck"
              onChange={handleChange}
              value={formData.description}
              required={true}/>
            </label>
          <div>
            <Link to="/" className="btn btn-primary">Cancel</Link>
            &nbsp;
            <button type="submit" className="btn btn-secondary">Submit</button>
          </div>
      </form> 
    </div>
  );
}

export default DeckEdit;