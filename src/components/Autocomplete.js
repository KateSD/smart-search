import {useState} from "react";

const Autocomplete = ({suggestion, onResultsChange}) => {
    const [filteredSuggestion, setFilteredSuggestion]=useState([]);
    const [activeSuggestionIndex, setActiveSuggectionIndex] = useState(0);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [input, setInput] = useState("");
    const onChange = (e)=>{
        const value = e.target.value;
        let suggestions=[]
        if(value.length>0){
            const regex = new RegExp(`^${value}`, 'i')
            suggestions=suggestion.sort().filter(v=>regex.test(v))

        }
        setInput(e.target.value);
        setFilteredSuggestion(suggestions);
        setActiveSuggectionIndex(0);
        setShowSuggestion(true);
    };

    const onChooseItem = () => {
        onResultsChange(filteredSuggestion[activeSuggestionIndex])
        setFilteredSuggestion([])
        setInput("")
    }

    const onClick = (e)=>{
        onChooseItem()
    };

    const onKeyDown = (key)=> {
        if(key.keyCode===13 || key.keyCode===9){
            onChooseItem()
        } if (key.keyCode===38){
            setActiveSuggectionIndex(activeSuggestionIndex-1)
        } if(key.keyCode===40){
            setActiveSuggectionIndex(activeSuggestionIndex+1)
        }
    };

    const SuggestionsListComponent = () => {
      return filteredSuggestion.length ? (
          <ul className='suggestion'>
              {filteredSuggestion.map((suggestion,index)=>{
                  let className;
                  if(index===activeSuggestionIndex){
                      className='suggestion-active'
                  }
                  return (
                      <li className={className} key={suggestion} onClick={onClick}>
                          {suggestion}
                      </li>
                  );
              })}
          </ul>
      )
          : (
          <div className='no-suggestion'>
              <em>No suggestions</em>
          </div>
      )};

  return(
      <>
      <input
          type='text'
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
          placeholder='Title...'
      />
          {showSuggestion && input && <SuggestionsListComponent/>}
      </>
  );
};

export default Autocomplete;
