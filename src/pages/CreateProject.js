import React from 'react';
import { useHistory } from 'react-router';
import { Button, ToggleButtonGroup, ToggleButton, TextField, Box, FormGroup, FormControlLabel, Checkbox, FormControl } from '@mui/material';
import styles from './CreateProject.module.scss';
import { TAGS, VACANT_PLACES } from '../utils/const';

const vacantPositionsState = VACANT_PLACES.reduce((acc, item) => {
  return {...acc, [item]: false};
}, {});

const boxStyles = {
  display: 'flex',
  alignItems: 'center',
  '& > :not(style)': { m: 1 }
};


function CreateProject() {

  const [selectedTags, setSelectedTags] = React.useState([]);
  const [img, setImg] = React.useState(undefined);
  const [stage, setStage] = React.useState('IDEA');
  const [language, setLanguage] = React.useState('ENGLISH');
  const [vacantPositions, setVacantPositions] = React.useState(vacantPositionsState);

  const nameInput = React.useRef();
  const aboutProjectInput = React.useRef();
  const stackInput = React.useRef();
  const emailInput = React.useRef();
  const phoneInput = React.useRef();

  const history = useHistory();

  const toggleTagHandler = (_, value) => {
    if (selectedTags.indexOf(value) === -1) {
      setSelectedTags((prevstate) => [...prevstate, value]);
     } else {
      setSelectedTags((prevstate) => prevstate.filter(tag => tag !== value))
    };
  };

  const handleOnToggleStage = (_, stage) => setStage(stage);
  const handleOnToggleLanguage = (_, language) => setLanguage(language);
  const handleVacantPlacesChange = (event) => setVacantPositions({...vacantPositions, [event.target.name]: event.target.checked });

  const uploadImgHandler = (event) => {
    const file = event.target.files[0];
    let nextSibling = event.target.nextElementSibling;
    const reader = new FileReader();
    reader.addEventListener("load", function(e) {
      setImg(reader.result);
      nextSibling.setAttribute("src", e.target.result);
    })
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqBody = {
      owner_id: 'c9de5e88-294a-11ec-9621-0242ac130002',
      name: nameInput.current.value,
      about_project: aboutProjectInput.current.value,
      stack: stackInput.current.value,
      email: emailInput.current.value,
      phone: phoneInput.current.value,
      image: img,
      stage: stage,
      tags: selectedTags.length ? selectedTags : ["Stack UNDEFINED"],
      language: language,
      vacant_places: Object.entries(vacantPositions).filter(([_, value]) => value).map(([key]) => key),
      members_on_board: []
    };
    sendPostRequest(reqBody);
    cleanUpForm();
  };

  const sendPostRequest = async (body) => {
    try {
      fetch('https://es-be-dev.herokuapp.com/projects',
        { method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      alert('Project created!');
    } catch(err) {
      alert('Something went wrong');
    }
    history.push('/projects');
  }

  const cleanUpForm = () => {
    setSelectedTags([]);
    setImg(undefined);
    setStage('just_an_idea');
    setLanguage('ENGLISH');
    setVacantPositions(vacantPositionsState);
    nameInput.current.value = '';
    aboutProjectInput.current.value ='';
    stackInput.current.value = '';
    emailInput.current.value = '';
    phoneInput.current.value = '';
  }

  return (
    <>
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.imgContainer}>
        <input 
          className={styles.fileInput} 
          type="file" 
          name="picture" 
          id="picture" 
          accept="image/png, image/jpeg" 
          onChange={uploadImgHandler}
        />
        <img 
          alt="project" 
          className={styles.img} 
          src='https://as2.ftcdn.net/v2/jpg/04/39/69/17/500_F_439691722_E5m6ba3RFSzODvlkZSpNaixEVBrv4qT8.jpg'
        />
      </div>
      <div>
        <h2 htmlFor="name" className={styles.label}>
          Your project name
        </h2>
        <TextField 
          className={styles.textarea} 
          name="name" 
          id="name" 
          required 
          inputRef={nameInput}
        />
      </div>
      <div>
        <label htmlFor="about_project" className={styles.label} >About your project</label>
        <TextField multiline rows={6} 
          className={styles.textarea} 
          inputRef={aboutProjectInput} 
          placeholder="Write here the main Idea of your project, the problem it solves, the Target audience, Deadlines, Main Features, About your Team, who is already on the board, Who are you looking for to realize your Idea and other interesting things about your project." 
          ame="about_project" 
          id="about_project" 
          required
        />
      </div>
      <div>
        <label htmlFor="stack" className={styles.label}>Stack</label>
        <TextField 
          className={styles.textarea}
          inputRef={stackInput}
          multiline rows={6} 
          type="textarea" 
          placeholder="any details about your stack" 
          name="stack" 
          id="stack" 
          required
        />
      </div>
      <div className={styles.tags}>
        <p className={styles.label}>Tags</p>
        {TAGS.map(tag => (
          <ToggleButton 
            classes={{root: styles.tag}}
            selected={selectedTags.includes(tag)}
            value={tag}
            onChange={toggleTagHandler}
            key={tag}>
            {tag}
          </ToggleButton>
          ))}
      </div>
      <div>
        <p className={styles.label}>Add your contacts</p>
         <Box sx={boxStyles}>
            <TextField 
              id="email"
              label="Email"
              className={styles.contacts}
              required inputRef={emailInput}/>
          </Box>
          <Box sx={boxStyles}>
            <TextField 
              id="phone" 
              label="Phone" 
              className={styles.contacts} 
              inputRef={phoneInput}
            />
          </Box>
      </div>
      <div>
        <p className={styles.label}>Vacant places:</p>
         <FormControl>
          <FormGroup> {VACANT_PLACES.map((position, index) => (
            <FormControlLabel 
              key={index} 
              control={<Checkbox onChange={handleVacantPlacesChange} name={position} key={index}/>} 
              label={position} 
            />))}
          </FormGroup>
        </FormControl>
      </div>
      <div>
        <p className={styles.label}>Current stage</p>
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
      <div>
        <p className={styles.label}>Project language</p>
        <ToggleButtonGroup
          color="primary"
          value={language}
          exclusive
          onChange={handleOnToggleLanguage}
        >
          <ToggleButton value="ENGLISH">English</ToggleButton>
          <ToggleButton value="RUSSIAN">Russian</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Button type="submit" className={styles.btn}>Publish</Button>
    </form>
  </>
  );
}

export default CreateProject;
