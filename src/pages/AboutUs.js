import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { STAGES } from '../utils/const';

import classes from './AboutUs.module.scss';

function AboutUs() {
  const [projects, setProjects] = useState([]);
  const [isProjectsLoaded, setProjectsLoaded] = useState(false);

  const getProjects = async () => {
    try {
      await fetch('https://es-be-dev.herokuapp.com/projects')
      .then((response) => response.json())
      .then((response) => setProjects(response.content.slice(0,5)))
      .then(() => setProjectsLoaded(true));
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProjects();
  }, [isProjectsLoaded])

  return (
    <>
      <div>
      <p className={classes.text}>What do the wheel, rocket, and transistor have in common?</p>
      <p className={classes.text}>
        Every great project or invention that changed the world started with an Idea.
        But how many ideas have not gone beyond the mind of their creators?
        How many great projects have we failed to implement?
        <span className={classes.textBold}> Estart was created to give every Idea a chance to come true</span>.
      </p>
      <p className={classes.text}>
        But is one idea enough to change the world? Of course not.
        Behind every brilliant project there is an equally brilliant team that has implemented it.
        And this is the second problem that the Estart project offers to solve - <span className={classes.textBold}>to bring together an idea and a team ready to bring it to life.</span>
        Just imagine how our world could change if we provided a fertile ground for both creative commercial ideas and charity ideas aimed at making this world a better place.
      </p>
      </div>
      <p className={classes.text}>
        If you are looking for an interesting project, want to gain new experience and improve your skills, then <span className={classes.textBold}>find your ideal project with Estart!</span>
      </p>
      <div className={classes.imgContainerTeam}>
          <Link className={classes.btn} to='/projects'>Find a project</Link>
      </div>
      <h2 className={classes.heading}> Our projects</h2>
      <Carousel className={classes.carousel}>
        {
          projects.map((project, i) => {
            return (
              <Link to={`/current-project/${project.id}`}>
              <div className={classes.card} key={i} project={project} style={{ background: `url(${project.image ? project.image : 'https://raw.githubusercontent.com/MrLush/estart-ui/main/src/img/0.jpg'})`, backgroundSize: 'cover'}} >
                <p className={classes.card__heading}>{project.name}</p>
                <p className={classes.card__stage}>{STAGES[project.stage]}</p>
              </div>
              </Link>
            );
          })
        }
      </Carousel>
      <p className={classes.text}>
        If you have a project, or just an idea, and you are looking for a team to implement it, then <span className={classes.textBold}>make your Idea come true with Estart!</span>
      </p>
      <div className={classes.imgContainerIdea}>
          <Link className={classes.btn} to='/create-project'>Create a project</Link>
      </div>
    </>
  );
}

export default AboutUs;
