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
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const onPressSearchButton = ()=>{
    controller.submit();
  }


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
      style={{width: '100%'}}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search" size="small" className='search-box'
        sx={{"& fieldset": { border: 'none' }}}
        inputProps={{...params.inputProps, style: {fontSize: 15, marginTop: "3px"}}}
        />
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
    <SearchButton type='submit' variant="contained" style={{height : '43px', marginLeft: '10px'}} onClick={onPressSearchButton}><Icon icon={search} size={24} /></SearchButton>
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
  flex-direction: row;
  border: 1px solid #242424;
  border-radius: 5px;
`

const SearchButton = styled(Button)`
height: 30px;
background: none;
border: none;
color: #777;
box-shadow: none;
border-radius: 0;
&:hover {
  background: none;
  box-shadow: none;
}
`
