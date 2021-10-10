import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Button, ToggleButtonGroup, ToggleButton, TextField, Box, FormGroup, FormControlLabel, Checkbox, FormControl } from '@mui/material';
import styles from './CreateProject.module.scss';
import { TAGS, VACANT_PLACES } from '../utils/const';

const boxStyles = {
  display: 'flex',
  alignItems: 'center',
  '& > :not(style)': { m: 1 }
};


function EditProject() {

  const { projectId } = useParams();
  const [project, setProject] = React.useState({});
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [projectName, setProjectName] = React.useState('');
  const [img, setImg] = React.useState('');
  const [stage, setStage] = React.useState('');
  const [language, setLanguage] = React.useState('');
  const [vacantPositions, setVacantPositions] = React.useState([]);
  const [aboutProject, setAboutProject] = React.useState('');
  const [stack, setStack] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const fetchProject = async (projectId) => {
    try {
      await fetch('https://es-be-dev.herokuapp.com/projects/' + `${projectId}`)
      .then( (response) => response.json() )
      .then(( response ) => {
        setProject(response);
        setSelectedTags(response.tags || ['Stack UNDEFINED']);
        setProjectName(response.name || '');
        setImg(response.image || '');
        setLanguage(response.language || 'ENGLISH');
        setStage(response.stage || '');
        setVacantPositions(response.vacant_places || []);
        setAboutProject(response.about_project || '');
        setStack(response.stack || '');
        setEmail(response.email || '');
        setPhone(response.phone || '');
      })
    } catch(err) {
      console.log(err);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchProject(projectId);
  }, [projectId]);

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
  const handleVacantPlacesChange = (event) => setVacantPositions((prevState) => {
    const checkedValue = event.target.name;
    return prevState.includes(checkedValue) ? prevState.filter(item => item !== checkedValue) : [...prevState, checkedValue];
  });

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

  const changeNameHandler = (event) => setProjectName(event.target.value);
  const changeAboutHandler = (event) => setAboutProject(event.target.value);
  const changeStackHandler = (event) => setStack(event.target.value);
  const changeEmailHandler = (event) => setEmail(event.target.value);
  const changePhoneHandler = (event) => setPhone(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqBody = {
      id: project.id,
      owner_id: project.owner_id,
      name: projectName,
      about_project: aboutProject,
      stack: stack,
      email: email,
      phone: phone,
      image: img,
      stage: stage,
      tags: selectedTags.length ? selectedTags : ["Stack UNDEFINED"],
      language: language,
      vacant_places: vacantPositions,
      members_on_board: project.members_on_board
    };
    sendPutRequest(reqBody);
  };

  const sendPutRequest = async (body) => {
    try {
      fetch(`https://es-be-dev.herokuapp.com/projects`,
        { method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      alert('Changes saved');
    } catch(err) {
      alert('Something went wrong');
    }
    history.push('/my-projects');
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
          src={img || 'https://raw.githubusercontent.com/MrLush/estart-ui/main/src/img/0.jpg' }
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
          value={projectName}
          onChange={changeNameHandler}
        />
      </div>
      <div>
        <label htmlFor="about_project" className={styles.label} >About your project</label>
        <TextField multiline rows={6} 
          className={styles.textarea} 
          placeholder="Write here the main Idea of your project, the problem it solves, the Target audience, Deadlines, Main Features, About your Team, who is already on the board, Who are you looking for to realize your Idea and other interesting things about your project." 
          name="about_project" 
          id="about_project" 
          required
          value={aboutProject}
          onChange={changeAboutHandler}
        />
      </div>
      <div>
        <label htmlFor="stack" className={styles.label}>Stack</label>
        <TextField 
          className={styles.textarea}
          multiline rows={6} 
          type="textarea" 
          placeholder="any details about your stack" 
          name="stack" 
          id="stack" 
          required
          value={stack}
          onChange={changeStackHandler}
        />
      </div>
      <div className={styles.tags}>
        <p className={styles.label}>Tags</p>
        {TAGS.map(tag => (
          <ToggleButton 
            classes={{root: styles.tag}}
            selected={selectedTags.includes(tag)}
            onChange={toggleTagHandler}
            value={tag}
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
              required
              value={email}
              onChange={changeEmailHandler}
            />
          </Box>
          <Box sx={boxStyles}>
            <TextField 
              id="phone" 
              label="Phone" 
              className={styles.contacts} 
              value={phone}
              onChange={changePhoneHandler}
            />
          </Box>
      </div>
      <div>
        <p className={styles.label}>Vacant places:</p>
         <FormControl>
          <FormGroup> {VACANT_PLACES.map((position, index) => (
            <FormControlLabel 
              key={index} 
              control={<Checkbox  name={position} key={index} checked={vacantPositions.includes(position)}/>} 
              label={position} 
              onChange={handleVacantPlacesChange}
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
      <Button type="submit" className={styles.btn}>Save changes</Button>
    </form>
  </>
  );
}

export default EditProject;
