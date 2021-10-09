import React from 'react';
import { Form } from 'react-final-form';
import { Button, ToggleButtonGroup, ToggleButton, TextField, Box, FormGroup, FormControlLabel, Checkbox, FormControl } from '@mui/material';
import classes from './CreateProject.module.scss';

function CreateProject() {

  const [toggleBtnGroupValue, setToggleBtnGroupValue] = React.useState('just_an_idea');

  const tags = ['Stack UNDEFINED', 'Lifescience', 'E-commerce', 'Project for Epam', 'Charity project', 'Python', 'C', 'C++',
  'Java', 'C#', 'JavaScript', 'SQL', 'PHP', 'Go', 'R', 'Swift', 'Spring', 'Angular','Node','React','Vue','Machine Learning',
  'MySQL','Postgress','MongoDB','Microsoft Server SQL','Oracle','HTML','CSS','TypeScript'];

  const vacantPlaces = ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 
  'Business Analyst', 'Application Support Engineer', 'Project Manager', 'Software Testing Engineer', 'Soft Automation Engineer', 'DevOps'];
  
  const vacantPositionsState = vacantPlaces.reduce((acc, item) => {
    return {...acc, [item]: false};
  }, {});

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

  const error = Object.keys(vacantPositions).lenght;

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

  const handleOnToggleLanguage = (event, language) => {
    setLanguage(language);
  }

  const handleVacantPlacesChange = (event) => {
    setVacantPositions({...vacantPositions, [event.target.name]: event.target.checked });
  };

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
      vacant_places: Object.entries(vacantPositions).filter(([key, value]) => value).map(([key]) => key),
      members_on_board: []
    };
    sendPostRequest(reqBody);
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
      console.log(err)
      alert('Something went wrong');
    }
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
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.imgContainer}>
        <input className={classes.fileInput} type="file" name="picture" id="picture" accept="image/png, image/jpeg" placeholder="add a picture" onChange={uploadImgHandler}/>
        <img className={classes.img} src='https://as2.ftcdn.net/v2/jpg/04/39/69/17/500_F_439691722_E5m6ba3RFSzODvlkZSpNaixEVBrv4qT8.jpg'/>
      </div>
      <div>
        <h2 htmlFor="name" className={classes.label}>Your project name</h2>
        <TextField className={classes.textarea} name="name" id="name" required inputRef={nameInput}/>
      </div>
      <div>
        <label htmlFor="about_project" className={classes.label} >About your project</label>
        <TextField multiline rows={6} className={classes.textarea} inputRef={aboutProjectInput} placeholder="Write here about technology used on your project" name="about_project" id="about_project" required/>
      </div>
      <div>
        <label htmlFor="stack" className={classes.label}>Stack</label>
        <TextField className={classes.textarea} inputRef={stackInput} multiline rows={6} type="textarea" placeholder="any details about your stack" name="stack" id="stack" required/>
      </div>
      <div className={classes.tags}>
        <p className={classes.label}>Tags</p>
        {tags.map(tag => <ToggleButton classes={{root: classes.tag}} selected={selectedTags.includes(tag)} value={tag} onChange={toggleTagHandler} key={tag}>{tag}</ToggleButton>)}
      </div>
      <div>
        <p className={classes.label}>Add your contacts</p>
         <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
            }}
          >
            <TextField id="email" label="Email" className={classes.contacts} required inputRef={emailInput}/>
          </Box>
          <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
            }}
          >
            <TextField id="phone" label="Phone" className={classes.contacts} inputRef={phoneInput}/>
          </Box>
      </div>
      <div>
        <p className={classes.label}>Vacant places:</p>
         <FormControl required error={error}>
          <FormGroup> {vacantPlaces.map((position, index) => {
            return <FormControlLabel key={index} control={<Checkbox onChange={handleVacantPlacesChange} name={position} key={index}/>} label={position} />
          })}
          </FormGroup>
        </FormControl>
      </div>
      <div>
        <p className={classes.label}>Current stage</p>
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
        <p className={classes.label}>Project language</p>
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
      <Button type="submit" className={classes.btn}>Publish</Button>
    </form>
  </>
  );
}

export default CreateProject;
