import React, { useState, useEffect } from 'react';
import ProjectCard from "../components/ProjectCard";
import FilterModal from "../components/FilterModal/FilterModal";
import classes from "./Projects.module.scss";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isProjectsLoaded, setProjectsLoaded] = useState(false);

  const [filterModalIsVisible, setfilterModalVisible] = useState(false)

  const showFilterModal = () => (setfilterModalVisible(!filterModalIsVisible));

  const getProjects = async () => {
    try {
      await fetch('https://es-be-dev.herokuapp.com/projects?size=12')
      .then((response) => response.json())
      .then((response) => setProjects(response.content))
      .then(() => setProjectsLoaded(true));
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProjects();
  }, [isProjectsLoaded])

  if (!isProjectsLoaded || !projects.length) {
    return 'loading...';
  }

  return (
    <section className={classes.wrapper}>
      <button
        className={classes.btn}
        type="button"
        onClick={showFilterModal}
      >
          Filter Projects
      </button>
      <ul className={classes.list}>
        {projects?.length && projects.map((projectObj) => {
          return (
            <li key={projectObj.id}>
              <ProjectCard project={projectObj} />
            </li>
          );
        })}
      </ul>
      {filterModalIsVisible && <FilterModal setProjects={setProjects} setfilterModalVisible={setfilterModalVisible}></FilterModal>}
    </section>
  );
}

export default Projects;
