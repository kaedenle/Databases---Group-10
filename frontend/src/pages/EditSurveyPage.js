import Sidebar from '../components/Sidebar';
import EditComponent from '../components/EditComponent';
import { useLocation } from 'react-router-dom';

function EditSurveyPage() {
  const location = useLocation();

  return (
    <>
      <div>
        <Sidebar />
        <div className="edit">
          <EditComponent title={location.state.title} />
        </div>
      </div>
    </>
  );
}
export default EditSurveyPage;
