import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.scss';

function ProjectCard({project}) {

  const { image, id, name, stage } = project;

  const randomImg = Math.floor(Math.random() * 10);
  const imgSrc = image && image.length ? image : `https://raw.githubusercontent.com/MrLush/estart-ui/main/src/img/${randomImg}.jpg`;

  return (
    <div className={styles.card}>
      <div className={`${styles.card__side} ${styles.card__side__front}`}>
        <img src={imgSrc} alt="project" className={styles.img}/>
        <h2 className={styles.header}>{name}</h2>
        <p className={styles.stage}>{stage}</p>
      </div>
      <div className={`${styles.card__side} ${styles.card__side__back}`}>
        <Link className={styles.link} to={`/current-project/${id}`}>Get more information</Link>
      </div>
    </div>
  )
}

export default ProjectCard;