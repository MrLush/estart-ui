import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import ProjectCard from '../components/ProjectCard';

import classes from './AboutUs.module.scss';

function AboutUs() {

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
        {
      id: "9cf2c046-279a-11ec-9621-0242ac130002",
      name: "project 3",
      owner_id: "9cf2c046-279a-11ec-9621-0242ac130002",
      stage: "IDEA",
      stack: "lorem ipsum",
      about_project: "lorem ipsum",
      tags: ["tag1", "tag2", "tag3"],
      vacant_places: ["Frontend Dev", "Backend Dev"],
    },
    {
      id: "another id",
      name: "another 4",
      owner_id: "another owner id",
      stage: "CLOSED",
      stack: "lorem ipsum",
      about_project: "lorem ipsum",
      tags: ["tag1", "tag2", "tag3"],
      vacant_places: ["Frontend Dev", "Backend Dev"],
    },
  ];
  return (
    <>
      {/* <Header/> */}
      <p className={classes.text}>Lorem ipsum dolor sit amet, sale oporteat mea ea. Quo at purto nulla inciderint, dissentiunt voluptatibus qui ex, duo insolens neglegentur eu. Ex ius dicit vocent assentior, mel rebum brute ea. Ut eros tincidunt vis, error facilis consequat id eam. Ut duo vitae albucius mandamus.</p>
      <div className={classes.imgContainer}>
          <Link className={classes.btn} to='/create-project'>Create a project</Link>
      </div>
      <p className={classes.text}>Vim quem insolens disputationi ei, no vix choro aperiri, ex nostrum voluptua interpretaris sea. Cum illud doming dissentiunt ut, ad sit quot euismod disputationi. Veniam consul vis ne, nam te mazim assueverit. Errem mandamus ea vix.
        Ut inani minim sed, eu modo putent interpretaris eum, tempor eripuit argumentum in sed. Noster discere quo ut, harum similique reformidans qui in. At veniam lobortis pri, ius nobis putant vituperatoribus an. Qui ad dicat ullamcorper, delicata quaerendum vel at, ei facete deterruisset duo.</p>
      <div className={classes.imgContainer}>
          <Link className={classes.btn} to='/projects'>Find a project</Link>
      </div>
      <h2 className={classes.heading}> Our projects</h2>
      <Carousel className={classes.carousel}>
        {
          projectPlaceholders.map((project, i) => {
            return (
              <Link to={`/current-project/${project.id}`}>
              <div className={classes.card} key={i} project={project}>
                <p className={classes.card__heading}>{project.name}</p>
                <p className={classes.card__stage}>{project.stage}</p>
              </div>
              </Link>
            );
          })
        }
      </Carousel>
    </>
  );
}

export default AboutUs;
