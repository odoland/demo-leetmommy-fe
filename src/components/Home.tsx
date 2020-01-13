import React, { useState } from 'react';
import styled from 'styled-components';
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { useLoading, useSearch } from '../hooks';
import '../styles.css';
import { getLogoForToday } from '../services/getLogo';
import get from 'lodash/get';
import { Doc } from '../services/leetmommyAPI';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Autocomplete from 'react-autocomplete';
import { Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import SearchIcon from '@material-ui/icons/Search';

const COHORTS = ['r11', 'r12', 'r13', 'r14'];

const Wrapper = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
/**
 * Just some wannabe search engine 
 */
const Home: React.FC<{}> = (props) => {
  const isLoading = useLoading();

  const { cohort, options, results, bind, setValue } = useSearch();
  const { value, onCohortChange, onInputChange, onSubmit } = bind;

  const [searched, setSearched] = useState(false);

  return (
    <div>

      <Wrapper>
        <img alt="logo" src={getLogoForToday()} />
        <RadioGroup title="Select a cohort" defaultValue='r14' value={cohort} onChange={onCohortChange} style={styles.radio}>
          {COHORTS.map((ch) => (
            <FormControlLabel key={ch} value={ch} label={ch} control={<Radio color="primary" />} />
          ))}
        </RadioGroup>

        <form onSubmit={(evt) => {
          onSubmit(evt)
          setSearched(true);
        }}>
          <section id="Search-Section">
            <Autocomplete
              inputProps={{
                className: "Search-Bar",
                placeholder: "search and hit enter",
              }}
              menuStyle={{
                borderRadius: '3px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                overflow: 'auto',
                zIndex: 2,
              }}
              autoHighlight={false}
              getItemValue={(item: any) => item}
              items={options}
              renderItem={(item: any, isHighlighted: any) =>
                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                  {item}
                </div>
              }
              value={value}
              onChange={onInputChange}
              onSelect={(value: string) => setValue(value)}
            />
          </section>

          <button style={{ display: "none" }} type="submit"> <SearchIcon/></button>
        </form>

        {renderResults(results, searched)}

        <Tooltip title="Suggestions here" aria-label="add">
          <HelpIcon />
        </Tooltip>
      </Wrapper>
    </div>

  )
}

const renderResults = (results: Doc[], hasSearched: boolean) => {
  if (!hasSearched) {
    return null;
  } else {
    return (
      <React.Fragment>
        <p>
          Found {get(results, 'length', 0)} result(s).
        </p>
        <List>
          {results.map((doc: Doc) => (
            <ListItem button>
              <strong>
                <span> {doc.title} </span>
                <a target="_blank" rel="noopener noreferrer" href={doc.url}> {doc.url} </a>
              </strong>
            </ListItem>
          ))
          }
        </List>
      </React.Fragment>
    )
  }
}

interface StylesObject {
  [key: string]: React.CSSProperties,
}

const styles: StylesObject = {
  radio: {
    display: 'flex',
    flexDirection: 'row',
  },
}

export default Home;