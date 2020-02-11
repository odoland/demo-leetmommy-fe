import React from 'react';
import { getLogoForToday } from '../../src/services/getLogo'
import { useHistory } from 'react-router-dom';

interface Props {
  /**
   * Can be a '100%', '100px' or number 10.
   */
  width?: string | number;


  /**
   * Can be '100%', '100px' or number 10.
   */
  height?: string | number;
}

/**
 * Rotating Search engine logo 
 */
const Logo: React.FC<Props> = (props) => {
  const history = useHistory();
  return (
    <img onClick={() => history.push('/')} alt="logo" width={props.width} height={props.height} src={getLogoForToday()} />  
  )
}

export default Logo;