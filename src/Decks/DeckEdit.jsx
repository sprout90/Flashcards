import React, {useState, useEffect} from "react";
import { useParams, useRouteMatch, useHistory} from "react-router-dom";
import Breadcrumb from "../Layout/Breadcrumb";
import { readDeck } from "../utils/api";

function DeckEdit({ createDeckEvent, saveDeckEvent }) {
  const {deckId} = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const [error, setError] = useState(undefined);
  
  let crumb2;
  let crumb3; 
  let title;

  // define inital form state object 
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  // populate primary deck and card stack properties
    useEffect(() => {

    // retrieve decks with cards, and store the DeckData arry in useState
    const abortController = new AbortController();

      function LoadDeck(){
        const deckPromise = readDeck(deckId, abortController.signal);
        deckPromise.then((result) => {
          const deck = {id : result.id, name: result.name, description: result.description};
          setFormData(deck);   
        })
        .catch(setError);

    }

    if (deckId){
      LoadDeck();
    }

    return () => {
      abortController.abort();
    };
  }, []);

 
  if (path === "/decks/new"){
    crumb2 = "Create Deck"
    title = "Create Deck"
  } else {
    crumb2 = formData.name;
    crumb3 =  "Edit Deck";
    title = "Edit Deck"
  }
   
  // define event handlers for field-level change, and form submit
  const handleChange = ({ target }) => { 
    setFormData({ ...formData, [target.name]: target.value, 
    });  
  };

  const cancelButton = () => {
    history.goBack();
  }

  return ( 
    <div>
      <Breadcrumb crumb2={crumb2} crumb3={crumb3}></Breadcrumb>
      <div>
        <h1>{title}</h1>
      </div>
      <form name="create" onSubmit={(event) => {
          event.preventDefault();
          if (!(deckId)){
            createDeckEvent(formData);
          } else {
            saveDeckEvent(formData)
          }
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
            <button onClick={cancelButton} className="btn btn-primary">Cancel</button>
            &nbsp;
            <button type="submit" className="btn btn-secondary">Submit</button>
          </div>
      </form> 
    </div>
  );
}

export default DeckEdit;