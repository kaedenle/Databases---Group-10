import Sidebar from '../components/Sidebar';
import EditComponent from '../components/EditComponent';
import { useLocation } from 'react-router-dom';

function EditSurveyPage() {
  const location = useLocation();

  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: '250px' }}>
        <EditComponent title={location.state.title} />
        <p>hello</p>
        <p></p>
      </div>
    </>
  );
}
export default EditSurveyPage;
