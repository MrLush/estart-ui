import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';

function ProjectPage() {

  const params = useParams();
  return (
    <>
      PROJECT PAGE FOR PROJECT WITH ID: {params.projectId}
    </>
  );
}

export default ProjectPage;
