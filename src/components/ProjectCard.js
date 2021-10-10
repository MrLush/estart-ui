import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.scss';

function ProjectCard(props) {

  const randomImg = Math.floor(Math.random() * 10);
  
  return (
    <div className={styles.card}>
      <div className={`${styles.card__side} ${styles.card__side__front}`}>
        <img src={`https://raw.githubusercontent.com/MrLush/estart-ui/main/src/img/${randomImg}.jpg`} alt="project" className={styles.img}/>
        <h2 className={styles.header}>{props.project.name}</h2>
        <p className={styles.stage}>{props.project.stage}</p>
      </div>
      <div className={`${styles.card__side} ${styles.card__side__back}`}>
        <Link className={styles.link} to={`/current-project/${props.project.id}`}>Get more information</Link>
      </div>
    </div>
  )
}

export default ProjectCard;