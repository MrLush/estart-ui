import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import style from './ProjectPage.module.scss'

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

  const {name, about_project, members_on_board, tags} = project;

  const Stages = {
    JUST_IN_IDEA: {
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
        <img className={style.project__image} src="../img/team.jpeg" width="250" height="250" alt="project image"/>
          <div className={style.project__contactsWrapper}>
          <FaceIcon className={style.userIcon}/>
          <div className={style.project__contactsInnerWrapper}>
            <a className={style.project__emailLink} href='mailto:test@mail.ru'>test@mail.ru</a>
            <a className={style.project__phoneLink} href='mailto:test@mail.ru'>+79991113423</a>
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
        <p className={style.project__intro}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <h2 className={style.header}>Vacant places</h2>
        <ul className={style.vacantPlacesList}>
          {members_on_board?.map((member) => (
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
            Object.values(Stages).map((stage) => (
              <li className={style.stage}>
                <span key={stage.title}>{stage.title}</span>
              </li>
            ))
          }
          </ul>
        </div>
        <a href='mailto:test@mail.ru' className={style.knockButton}>Knock on the project</a>
      </section>
      </article>
    </>
  );
}

export default ProjectPage;
