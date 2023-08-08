import {FunctionComponent, useEffect, useState, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  buildSearchBox,
  SearchBox as HeadlessSearchBox,
  SearchBoxOptions,
} from '@coveo/headless';
import EngineContext from '../../common/engineContext';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";


interface SearchBoxProps {
  controller: HeadlessSearchBox;
}

const SearchBoxRenderer: FunctionComponent<SearchBoxProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => {
      setState(controller.state); 
    }),
    [controller]
  );

  const onPressSearchButton = ()=>{
    controller.submit();
  }

  useEffect(() => {
    setTimeout(() => {
      onPressSearchButton();
    }, 500);
  }, [])


  return (
    <Container>
    <Autocomplete
      inputValue={state.value}
      onInputChange={(_, newInputValue) => {
        controller.updateText(newInputValue);
      }}
      onChange={() => {
        controller.submit();
      }}
      options={state.suggestions.map((suggestion) => suggestion.rawValue)}
      freeSolo
      style={{width: '100%', background: 'white'}}
      renderInput={(params) => (
        <TextField {...params} sx={{backgroundColor: "#fff", height: "50px", "& fieldset": { border: 'none' }}} placeholder="Search" size="medium" className='search-box'/>
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option, inputValue);
        const parts = parse(option, matches);
        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 400 : 300,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
    <SearchButton type='submit' variant="contained" onClick={onPressSearchButton}><Icon icon={search} size={24} /></SearchButton>
    </Container>
  );
};

const SearchBox = () => {
  const options: SearchBoxOptions = {numberOfSuggestions: 8};
  const engine = useContext(EngineContext)!;
  const controller = buildSearchBox(engine, {options});

// This is added to fix a bug which does not allow to see query suggestion on first click.  
  if(controller.state.value === ""){
    controller.updateText('');
  }
  
  return <SearchBoxRenderer controller={controller} />;
};

export default SearchBox;


const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
`

const SearchButton = styled(Button)`
width: 50px;
border-radius: 0;
background-color: #D5001C;
&:hover {
  background-color: #950014;
}
`;
