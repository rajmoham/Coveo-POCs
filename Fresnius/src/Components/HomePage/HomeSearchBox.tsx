import {FunctionComponent, useEffect, useState, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  SearchBox as HeadlessSearchBox,
  StandaloneSearchBoxOptions,
  buildStandaloneSearchBox,buildSearchBox
} from '@coveo/headless';
import EngineContext from '../../common/engineContext';
import { useLocation, useNavigate } from 'react-router-dom';
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

  const location = useLocation();

 const onPressSearchButton = ()=>{
      /*  */
      props.toggleSearchBox();
      controller.submit();
      window.open('/search' + window.location.hash,"_self");
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
            window.open('/search' + window.location.hash,"_self");
          }
      }}
      options={state.suggestions.map((suggestion) => suggestion.rawValue)}
      freeSolo
      style={{width: '100%'}}
      renderInput={(params) => (
        <TextField {...params} className='home-search-box' placeholder="Search" size="small"
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
  console.log(engine)
  const controller = buildSearchBox(engine, {options});
  controller.updateText('');
  return <SearchBoxRenderer controller={controller} toggleSearchBox = {toggleSearchBox} />;
};

export default SearchBox;


const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const SearchButton = styled(Button)`
height: 42px;
border-radius: 0;
margin-left: 10px;
background-color: #002967;
&:hover {
  filter: brightness(0.8);
  background-color: #002967;
}
`
