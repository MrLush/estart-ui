import React, { useState, useEffect } from 'react';
import MyProjectCard from "../components/MyProjectCard";
import classes from "./Projects.module.scss";

function MyProjects() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      await fetch('https://es-be-dev.herokuapp.com/projects')
      .then((response) => response.json())
      .then((response) => setProjects(response.content.slice(1, 3))); // for demo purposes
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
      <ul className={classes.list}>
        {projects?.length && projects.map((projectObj) => {
          return (
            <li key={projectObj.id}>
              <MyProjectCard project={projectObj} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default MyProjects;
