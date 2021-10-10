import React, { useState } from 'react';
import style from './FilterModal.module.scss'
import { VACANT_PLACES, TAGS} from '../../utils/const';
import { Button, ToggleButtonGroup, ToggleButton, TextField, Box, FormGroup, FormControlLabel, Checkbox, FormControl } from '@mui/material';

const FilterModal = () => {
  const [filterForm, setFilterForm] = useState({
    vacant_places: [],
    tags: [],
    stage: '',
  })
  const [vacantPositions, setVacantPositions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [stage, setStage] = useState('');

  const handleVacantPlacesChange = (evt) => {
    const {name} = evt.target;
    let copyVacantPositions = vacantPositions;

    if (copyVacantPositions.includes(name)) {
      copyVacantPositions.pop(name);
    } else {
      copyVacantPositions.push(name);
    }
    setVacantPositions([...copyVacantPositions]);
  };

  const toggleTagHandler = (evt) => {
    const {value} = evt.target;
    let copySelectedTags = selectedTags;

    if (copySelectedTags.includes(value)) {
      copySelectedTags.pop(value);
     } else {
      copySelectedTags.push(value);
    };
    setSelectedTags([...copySelectedTags]);
  };

  const handleOnToggleStage = (evt) => {
    const {value} = evt.target
    setStage(value);
  };

  const fetchFiltredProjects = async (filterForm) => {
    try {
      await fetch(
        'https://es-be-dev.herokuapp.com/projects/filter',
        { method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filterForm)
        }
      )
      .then( (response) => response.json() )
      .then(( response ) => {
        console.log(response);
      })
    } catch(err) {
      console.log(err);
      alert('Something went wrong');
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let copyFilterForm = filterForm;
    copyFilterForm.vacant_places = vacantPositions;
    copyFilterForm.tags = selectedTags;
    copyFilterForm.stage = stage;
    setFilterForm({...copyFilterForm});

    fetchFiltredProjects(filterForm);

  };

  return (
    <section className={style.modal}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.filterWrapper}>
        <h3 className={style.modal__header}>Vacant places:</h3>
         <FormControl>
          <FormGroup className={style.vacantPlacesWrapper}> {VACANT_PLACES.map((item, index) => {
            return <FormControlLabel key={index+item} control={<Checkbox onChange={handleVacantPlacesChange} name={item} key={index+item}/>} label={item} />
          })}
          </FormGroup>
        </FormControl>
      </div>
      <div className={style.tags, style.filterWrapper}>
        <h3 className={style.modal__header}>Tags:</h3>
        <div className={style.tagsContainer}>
        {TAGS.map(tag =>
          <ToggleButton
            className={style.tag}
            selected={selectedTags.includes(tag)}
            value={tag}
            onChange={toggleTagHandler}
            key={tag}>
              {tag}
          </ToggleButton>)}
        </div>
      </div>
      <div className={style.filterWrapper}>
        <h3 className={style.modal__header}>Current stage</h3>
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
      <div className={style.btnWrapper}>
        <button type="submit" className={style.btn}>FILTER</button>
        <button type="button" className={style.btn}>CANCEL</button>
      </div>
      </form>
    </section>
  );
}

export default FilterModal;
