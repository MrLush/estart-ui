import ProjectCard from "../components/ProjectCard";

function Projects() {

  const projectPlaceholder = {
    id: "9cf2c046-279a-11ec-9621-0242ac130002",
    name: "project name",
    owner_id: "9cf2c046-279a-11ec-9621-0242ac130002",
    stage: "MIDDLE",
    stack: "lorem ipsum",
    about_project: "lorem ipsum",
    tags : ["tag1", "tag2", "tag3"],
    vacant_places: ["Frontend Dev", "Backend Dev"], 
  };

  return (
    <ul>
      <li key={projectPlaceholder.id}>
        <ProjectCard project={projectPlaceholder}/>
      </li>
    </ul>
  );
}

export default Projects;