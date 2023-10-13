import React, {useState, useEffect} from "react";
import { useParams, useRouteMatch, useHistory} from "react-router-dom";
import Breadcrumb from "../Layout/Breadcrumb";
import { readDeck, readCard } from "../utils/api";

function CardEdit({ createCardEvent, saveCardEvent }) {
  const {deckId, cardId} = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const [deck, setDeck] = useState(undefined);
  const [error, setError] = useState(undefined);

  
  let crumb2;
  let crumb3; 
  let title;
  let quitBtnText;
  let saveBtnText;

  // define inital form state object 
  const initialFormState = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  
  // populate primary deck and card stack properties
  useEffect(() => {

    // retrieve decks with cards, and store the DeckData arry in useState
    const abortController = new AbortController();


    function LoadDeck(){
      const deckPromise = readDeck(deckId, abortController.signal);
      deckPromise.then((result) => {
        const loadedDeck = {id : result.id, name: result.name, description: result.description};
        setDeck(loadedDeck);   
      })
      .catch(setError);
    }

    function LoadCard(){
      const cardPromise = readCard(cardId, abortController.signal);
      cardPromise.then((result) => {
        const card = {id : result.id, front: result.front, back: result.back};
        setFormData(card);   
      })
      .catch(setError);
    }

    LoadDeck();
   
    if (cardId){
      LoadCard();
    }

    return () => {
      abortController.abort();
    };
  }, [deckId, cardId]);

  if (deck) {
    crumb2 = deck.name;
    title = `${deck.name}: Add Card`;

    if (url === `/decks/${deckId}/cards/new`){
      crumb3 = "Add Card";
      quitBtnText = "Done";
      saveBtnText = "Save";
    } else {
      crumb3 = `Edit Card ${cardId}`;
      quitBtnText = "Cancel";
      saveBtnText = "Submit"
      title = "Edit Card"
    }
  }  else {
    title = "Loading..."
  } 


   
  // define event handlers for field-level change, and form submit
  const handleChange = ({ target }) => { 
    setFormData({ ...formData, [target.name]: target.value, 
    });  
  };

  const cancelButton = () => {
    history.push(`/decks/${deckId}`);
  }

 
  return ( 
    <div>
      <Breadcrumb crumb2={crumb2} crumb3={crumb3}></Breadcrumb>
      <div>
        <h1>{title}</h1>
      </div>
      <form name="create" onSubmit={(event) => {
          event.preventDefault();
          if (saveBtnText === "Save"){
            createCardEvent(deckId, formData);
          } else {
            saveCardEvent(deckId, formData)
          }
          setFormData({ ...initialFormState });
        }
       }
      >
          <label htmlFor="front">Front<br/>
            <textarea 
                id="front" 
                name="front" 
                rows="5" 
                cols="50" 
                placeholder="Front side of card"
                onChange={handleChange}
                value={formData.front}
                required={true}/>
              </label>
          <br/>
          <label htmlFor="back">Back<br/>
            <textarea 
              id="back" 
              name="back" 
              rows="5" 
              cols="50" 
              placeholder="Back side of card"
              onChange={handleChange}
              value={formData.back}
              required={true}/>
            </label>
          <div>
            <button onClick={cancelButton} className="btn btn-secondary">{quitBtnText}</button>
            &nbsp;
            <button type="submit" className="btn btn-primary">{saveBtnText}</button>
          </div>
      </form> 
    </div>
  )
}

export default CardEdit;