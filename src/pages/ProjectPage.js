import React, { useEffect}from 'react';
import { useParams } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import style from './ProjectPage.module.scss'

function ProjectPage() {

  let { projectId } = useParams();
  let project;

  useEffect(() => {
    fetch(`https://es-be-dev.herokuapp.com//projects/${projectId}`)
    .then( response => response.json() )
    .then( response => {
        project = response;
        console.log(project);
    } );
  }, [projectId])

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
      {/* PROJECT PAGE FOR PROJECT WITH ID: {params.projectId} */}
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
          <p className={style.project__tag}>Angular</p>
          <p className={style.project__tag}>React</p>
          <p className={style.project__tag}>Vue</p>
          <p className={style.project__tag}>Java</p>
          <p className={style.project__tag}>TypeScript</p>
          <p className={style.project__tag}>Figma</p>
          <p className={style.project__tag}>MongoDB</p>
          <p className={style.project__tag}>JS</p>
          <p className={style.project__tag}>Docker</p>
        </div>
      </section>
      <section className={style.columnTwo}>
        <h1 className={style.project__header}>Name project</h1>
        <h2 className={style.header}>About project</h2>
        <p className={style.project__intro}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <h2 className={style.header}>About stack</h2>
        <p className={style.project__intro}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <h2 className={style.header}>Vacant places</h2>
        <ul className={style.vacantPlacesList}>
          <li className={style.vacantPlacesList__item}>
            <AssignmentIndIcon className={style.huntedIcon}/>
            <p>Front-end developer</p>
          </li>
          <li className={style.vacantPlacesList__item}>
            <AssignmentIndIcon className={style.huntedIcon}/>
            <p>Back-end developer</p>
          </li>
          <li className={style.vacantPlacesList__item}>
            <AssignmentIndIcon className={style.huntedIcon}/>
            <p>UX/UI Designer</p>
          </li>
          <li className={style.vacantPlacesList__item}>
            <AssignmentIndIcon className={style.huntedIcon}/>
            <p>Business Analyst</p>
          </li>
          <li className={style.vacantPlacesList__item}>
            <AssignmentIndIcon className={style.huntedIcon}/>
            <p>QA</p>
          </li>
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
