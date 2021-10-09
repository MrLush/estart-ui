import { useParams } from 'react-router-dom';

function ProjectPage() {

  const params = useParams();
  return (
    <>
      {/* <Header/> */}
      PROJECT PAGE FOR PROJECT WITH ID: {params.projectId}
    </>
  );
}

export default ProjectPage;
