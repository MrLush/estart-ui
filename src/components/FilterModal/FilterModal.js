import React, { useState } from 'react';
import style from './FilterModal.module.scss'
import { VACANT_PLACES, TAGS} from '../../utils/const';
import { Button, ToggleButtonGroup, ToggleButton, TextField, Box, FormGroup, FormControlLabel, Checkbox, FormControl } from '@mui/material';

const FilterModal = () => {
  const vacantPositionsState = VACANT_PLACES.reduce((acc, item) => {
    return {...acc, [item]: false};
  }, {});
  const [vacantPositions, setVacantPositions] = useState(vacantPositionsState);
  const [selectedTags, setSelectedTags] = useState([]);
  const [stage, setStage] = useState('');
  const handleVacantPlacesChange = (event) => {
    setVacantPositions({...vacantPositions, [event.target.name]: event.target.checked });
  };
  const toggleTagHandler = (event, value) => {
    if (selectedTags.indexOf(value) === -1) {
      setSelectedTags((prevstate) => [...prevstate, value]);
     } else {
      setSelectedTags((prevstate) => prevstate.filter(tag => tag !== value))
    };
  };
  const handleOnToggleStage = (event, stage) => {
    setStage(stage);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // sendPostRequest();
  };

  return (
    <section className={style.modal}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div>
        <h3 className={style.label}>Vacant places:</h3>
         <FormControl>
          <FormGroup className={style.vacantPlacesWrapper}> {VACANT_PLACES.map((position, index) => {
            return <FormControlLabel key={index} control={<Checkbox onChange={handleVacantPlacesChange} name={position} key={index}/>} label={position} />
          })}
          </FormGroup>
        </FormControl>
      </div>
      <div className={style.tags}>
        <h3 className={style.label}>Tags:</h3>
        <p className={style.label}>Tags</p>
        {TAGS.map(tag => <ToggleButton style={{root: style.tag}} selected={selectedTags.includes(tag)} value={tag} onChange={toggleTagHandler} key={tag}>{tag}</ToggleButton>)}
      </div>
      <div>
        <p className={style.label}>Current stage</p>
        <ToggleButtonGroup
          color="primary"
          value={stage}
          exclusive
          onChange={handleOnToggleStage}
        >
          <ToggleButton value="IDEA">Idea</ToggleButton>
          <ToggleButton value="IN_PROGRESS">In progress</ToggleButton>
          <ToggleButton value="CLOSE_TO_THE_END">Close to the end</ToggleButton>
          <ToggleButton value="CLOSED">Closed</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <button type="submit">FILTER</button>
      <button type="button">CANCEL</button>
      </form>
    </section>
  );
}

export default FilterModal;
