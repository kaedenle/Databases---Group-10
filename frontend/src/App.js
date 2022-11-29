// React Components
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';

// Pages
import Home from './pages/Home';
import CreateSurvey from './pages/CreateSurvey';
import TakeSurvey from './pages/TakeSurvey';
import Results from './pages/Results';

//Custom Components
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/createsurvey"
            element={<CreateSurvey />}
          />
          <Route
            path="/takeSurvey"
            element={<TakeSurvey />}
          />
          <Route
            path="/results"
            element={<Results />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
