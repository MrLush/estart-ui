import ProjectCard from "../components/ProjectCard";

import classes from "./Projects.module.scss";

function Projects() {
  const projectPlaceholders = [
    {
      id: "9cf2c046-279a-11ec-9621-0242ac130002",
      name: "project name",
      owner_id: "9cf2c046-279a-11ec-9621-0242ac130002",
      stage: "IDEA",
      stack: "lorem ipsum",
      about_project: "lorem ipsum",
      tags: ["tag1", "tag2", "tag3"],
      vacant_places: ["Frontend Dev", "Backend Dev"],
    },
    {
      id: "another id",
      name: "another project name",
      owner_id: "another owner id",
      stage: "CLOSED",
      stack: "lorem ipsum",
      about_project: "lorem ipsum",
      tags: ["tag1", "tag2", "tag3"],
      vacant_places: ["Frontend Dev", "Backend Dev"],
    },
  ];

  let projects;

  const getProjects = async () => {
    try {
      projects = await fetch('https://es-be-dev.herokuapp.com/projects');
      const jsonRes = await projects.json();
      console.log(jsonRes);
    } catch(err) {
      console.log(err);
    }

  }

  getProjects();

  return (
    <ul className={classes.list}>
      {projectPlaceholders.map((projectObj) => {
        return (
          <li key={projectObj.id}>
            <ProjectCard project={projectObj} />
          </li>
        );
      })}
    </ul>
  );
}

export default Projects;
