import React, { useCallback } from 'react';
import Autocomplete from 'react-autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { useSearch } from '../hooks';
import RadioButtons from './RadioButtons';
import { useHistory } from 'react-router-dom';
import { StylesObject } from './types';

interface Props {
  /**
   * Option to render the search button
   */
  button?: boolean;

  /**
   * Option to render the Radio buttons
   */
  radio?: boolean;
}

/**
 * Component that renders an Input Field  
 */
const SearchForm: React.FC<Props> = (props) => {

  const { autocomplete, cohort, setValue, inputProps } = useSearch();
  const { value, onInputChange, onCohortChange } = inputProps;

  // Hookup the autocomplete functionality
  const onSelect = useCallback((selection: string) => setValue(selection), [setValue]);
  const renderAutocompleteList = useCallback((item: any, isHighlighted: boolean) => (
    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}> {item} </div>
  ), []);

  // Form submission uses query strings
  const history = useHistory();
  const queryString = new URLSearchParams({ q: value, cohort }).toString();

  return (

    <form onSubmit={(evt) => {
      evt.preventDefault();
      history.push('/search?' + queryString);
    }}>

      {props.radio &&
        <div className="Center-Container">
          <RadioButtons cohort={cohort} onCohortChange={onCohortChange} />
        </div>
      }

      <div className="Center-Container">
        <section id="Search-Section">
          <Autocomplete
            inputProps={autocompleteInputProps}
            menuStyle={styles.menuStyle}
            autoHighlight={false}
            getItemValue={(item: any) => item}
            items={autocomplete}
            renderItem={renderAutocompleteList}
            value={value}
            onChange={onInputChange}
            onSelect={onSelect}
          />
        </section>
      </div>

      {props.button &&
        <div className="Center-Container">
          <button className="Search-Button" type="submit"><SearchIcon /></button>
        </div>
      }
    </form>
  )
}

const autocompleteInputProps: React.HTMLProps<HTMLInputElement> = {
    className: 'Search-Bar',
    placeholder: 'search and hit enter',
};

const styles: StylesObject = {
  menuStyle: {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'auto',
    zIndex: 2,
  }
};

export default SearchForm;