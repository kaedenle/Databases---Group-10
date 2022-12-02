// React Components
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import CreateSurvey from './pages/CreateSurvey';
import TakeSurvey from './pages/TakeSurvey';
import Results from './pages/Results';
import Register from './pages/Register';

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
          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
