import { Link } from 'react-router-dom';
import classes from './ProjectCard.module.scss';

function ProjectCard(props) {
  return (
    <div className={classes.card}>
      <div className={`${classes.card__side} ${classes.card__side__front}`}>
        <h2>{props.project.name}</h2>
        <p>{props.project.stage}</p>
      </div>
      <div className={`${classes.card__side} ${classes.card__side__back}`}>
        <Link to={`/current-project/${props.project.id}`}>Get more information</Link>
      </div>
    </div>
  )

}

export default ProjectCard;