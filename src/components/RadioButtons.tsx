import React from 'react';
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { COHORTS, Cohort } from '../config/'
import { StylesObject } from './types';

interface Props {
  /**
   * Current selected cohort
   */
  cohort: Cohort,

  /**
   * Event callback for when user selects another cohort
   */
  onCohortChange: (evt: React.ChangeEvent<HTMLInputElement>, val?: string) => void;
}

const RadioButtons: React.FC<Props> = (props) => {
  const { cohort, onCohortChange } = props;
  return (
    <>
      <RadioGroup title="Select a cohort" defaultValue='r14' value={cohort} onChange={onCohortChange} style={styles.radio}>
        {COHORTS.map((ch) => (
          <FormControlLabel key={ch} value={ch} label={ch} control={<Radio color="primary" />} />
        ))}
      </RadioGroup>

      <Tooltip title="Select a cohort to search and hit ENTER again" aria-label="add">
        <HelpIcon />
      </Tooltip>
    </>
  )
}

const styles: StylesObject = {
  radio: {
    display: 'flex',
    flexDirection: 'row',
  },
}

export default RadioButtons;