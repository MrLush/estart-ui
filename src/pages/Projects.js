import React, { useState, useEffect } from 'react';
import ProjectCard from "../components/ProjectCard";
import FilterModal from "../components/FilterModal/FilterModal";
import classes from "./Projects.module.scss";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [filterModalIsVisible, setfilterModalVisible] = useState(false)

  const showFilterModal = () => (setfilterModalVisible(!filterModalIsVisible));

  const getProjects = async () => {
    try {
      await fetch('https://es-be-dev.herokuapp.com/projects')
      .then((response) => response.json())
      .then((response) => setProjects(response));
    } catch(err) {
      console.log(err);
    }

  }

  useEffect(() => {
    getProjects();
  }, [projects.length])

  if (!projects?.length) {
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
      {filterModalIsVisible && <FilterModal></FilterModal>}
    </section>
  );
}

export default Projects;
