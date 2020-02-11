import React from 'react';
import { ListItem } from '@material-ui/core';
import { Doc } from '../services/leetmommyAPI';

interface Props {
  /**
   * Document result from the API
   */
  doc: Doc;
}

/**
 * Search Result clickable
 */
const ResultCard: React.FC<Props> = (props) => {
  const { doc: { highlight: { headers, text, bullets, code }, url, title} } = props;
  return (
    <ListItem button className="Result-Card">
      <strong>
        <a className="Card-Title" target="_blank" rel="noopener noreferrer" href={url}> {title} </a>
        <p className="Card-URL"> {url} </p>
      </strong>
      {renderHighlight(headers)}
      {renderHighlight(text)}
      {renderHighlight(bullets)}
      <pre style={{
        fontWeight: 'normal',
      }}>
        {code && <pre dangerouslySetInnerHTML={{ __html: code.join(' ... ') }} />}
      </pre>
    </ListItem >
  )
}

// Dangerously renders the bolding HTML
const renderHighlight = (highlights: string[]) => {
  if (!highlights || !highlights.length) {
    return null;
  } else {
    return (
      <p style={{
        fontWeight: 'normal',
      }}>
        <span dangerouslySetInnerHTML={{ __html: highlights.join(', ') }} />}
      </p>
    )
  }
};

export default ResultCard;