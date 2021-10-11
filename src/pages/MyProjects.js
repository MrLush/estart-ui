import React, { useState, useEffect } from 'react';
import MyProjectCard from "../components/MyProjectCard";
import classes from "./Projects.module.scss";

function MyProjects() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      await fetch('https://es-be-dev.herokuapp.com/projects/owner', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
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
    return 'Sorry, but we don\'t found any of your projects! Try to create one!';
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
