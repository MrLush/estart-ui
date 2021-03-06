import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import style from './ProjectPage.module.scss'
import classNames from 'classnames';
import { MAIL_TEXT } from '../utils/const';

function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState({});

  const fetchProject = async (projectId) => {
    try {
      await fetch('https://es-be-dev.herokuapp.com/projects/' + `${projectId}`)
      .then( (response) => response.json() )
      .then(( response ) => {
        setProject(response);
      })
    } catch(err) {
      console.log(err);
      alert('Something went wrong');
    }
  }

  useEffect(() => {
    fetchProject(projectId);
  }, [projectId])


  if (!project) {
    return 'loading...';
  }

  const {name, about_project, vacant_places, tags, image, stage, stack, phone, email, language } = project;

  const Stages = {
    IDEA: {
      title: 'Just in idea'
    },
    IN_PROGRESS: {
      title: 'In progress'
    },
    CLOSE_TO_THE_END: {
      title: 'Close to the end'
    },
    CLOSED: {
      title: 'Closed'
    },
  }

  return (
    <>
      <article className={style.project}>
      <section>
        {image && image.length && <img className={style.project__image} src={image} width="250" height="250" alt="project"/> }
          <div className={style.project__contactsWrapper}>
          <FaceIcon className={style.userIcon}/>
          <div className={style.project__contactsInnerWrapper}>
            <a className={style.project__emailLink} href={`mailto:${email}?subject=Apply to the project&body=${MAIL_TEXT}`}>{email}</a>
            <a className={style.project__phoneLink} href={email}>{phone}</a>
          </div>
        </div>
        <h2 className={style.header}>Required stack</h2>
        <div className={style.project__tagsContainer}>
          {tags?.length && tags.map((tag) => (
            <p className={style.project__tag}>{tag}</p>
          ))}
        </div>
      </section>
      <section className={style.columnTwo}>
        <h1 className={style.project__header}>{name}</h1>
        <h2 className={style.header}>About project</h2>
        <p className={style.project__intro}>
          {about_project}
        </p>
        <h2 className={style.header}>About stack</h2>
        <p className={style.project__intro}>{stack}</p>
        <h2 className={style.header}>Vacant places</h2>
        <ul className={style.vacantPlacesList}>
          {vacant_places?.map((member) => (
            <li className={style.vacantPlacesList__item}>
            <AssignmentIndIcon className={style.huntedIcon}/>
            <p>{member}</p>
          </li>
          ))}
        </ul>
        <h2 className={style.headerStage}>Current stage of project</h2>
        <div className={style.stagesWrapper}>
          <ul>
            {
            Object.values(Stages).map((stageItem) => (
              <li className={classNames(style.stage, { [style.stageActive]: stageItem === Stages[stage] })}>
                <span key={stageItem.title}>{stageItem.title}</span>
              </li>
            ))
          }
          </ul>
        </div>
        <h2>Project language: {language}</h2>
        <a href={`mailto:${email}?subject=Apply to the project&body=${MAIL_TEXT}`} className={style.knockButton}>Knock on the project</a>
      </section>
      </article>
    </>
  );
}

export default ProjectPage;
