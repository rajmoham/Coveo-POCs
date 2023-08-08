import {FunctionComponent, useEffect, useState, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  SearchBox as HeadlessSearchBox,
  StandaloneSearchBoxOptions,
  buildStandaloneSearchBox
} from '@coveo/headless';
import EngineContext from '../../common/engineContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";


interface SearchBoxProps {
  controller: HeadlessSearchBox;
  toggleSearchBox : ()=>void;
}

const SearchBoxRenderer: FunctionComponent<SearchBoxProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);
  let navigate = useNavigate();

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

 const onPressSearchButton = ()=>{
      navigate('/search');
      props.toggleSearchBox();
      controller.submit();
 }

  return (
    <Container >
    <Autocomplete
      inputValue={state.value}
      onInputChange={(_, newInputValue) => {
        controller.updateText(newInputValue);
      }}
      onChange={() => {
          if (controller.state.value !== '')
          {
            props.toggleSearchBox();
            controller.submit();
            navigate('/search');
          }
      }}
      options={state.suggestions.map((suggestion) => suggestion.rawValue)}
      freeSolo
      style={{width: '100%'}}
      renderInput={(params) => (
        <TextField {...params} sx={{backgroundColor: "#fff", height: "50px", "& fieldset": { border: 'none' }}}  className='home-search-box' placeholder="Search" size="medium" />
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

interface  SearchBoxType {
    toggleSearchBox : ()=>void
}

const SearchBox = ({toggleSearchBox}: SearchBoxType) => {
  const options: StandaloneSearchBoxOptions = {numberOfSuggestions: 8, redirectionUrl: '/search'};
  const engine = useContext(EngineContext)!;
  const controller = buildStandaloneSearchBox(engine, {options});
  controller.updateText('');
  return <SearchBoxRenderer controller={controller} toggleSearchBox = {toggleSearchBox} />;
};

export default SearchBox;


const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  margin: 24px 0;
`

const SearchButton = styled(Button)`
width: 50px;
border-radius: 0;
background-color: #D5001C;
&:hover {
  background-color: #950014;
}
`
