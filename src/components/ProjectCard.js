import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.scss';

function ProjectCard({project}) {

  const { image, id, name, stage } = project;
  const { card, card__side, card__side__front, img, header, stage: stageStyle, link, card__side__back } = styles;

  const randomImg = Math.floor(Math.random() * 10);
  const imgSrc = image && image.length ? image : `https://raw.githubusercontent.com/MrLush/estart-ui/main/src/img/${randomImg}.jpg`;

  return (
    <div className={card}>
      <div className={`${card__side} ${card__side__front}`}>
        <img src={imgSrc} alt="project" className={img}/>
        <h2 className={header}>{name}</h2>
        <p className={stageStyle}>{stage}</p>
      </div>
      <div className={`${card__side} ${card__side__back}`}>
        <Link className={link} to={`/current-project/${id}`}>Get more information</Link>
      </div>
    </div>
  )
}

export default ProjectCard;