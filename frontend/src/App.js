// React Components
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import CreateSurvey from './pages/CreateSurvey';
import TakeSurvey from './pages/TakeSurvey';
import Results from './pages/Results';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import EditSurveyPage from './pages/EditSurveyPage';
import Survey from './components/Survey';
import SurveyDisplay from './components/SurveyDisplay';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/Home"
            element={<Home />}
          />
          <Route
            path="/CreateSurvey"
            element={<CreateSurvey />}
          />
          <Route
            path="/TakeSurvey"
            element={<TakeSurvey />}
          />
          <Route
            path="/TakeSurvey/:id"
            element={<SurveyDisplay />}
          />
          <Route
            path="/Results"
            element={<Results />}
          />
          <Route
            exact
            path="/"
            element={<Register />}
          />
          <Route
            path="/LogIn"
            element={<LogIn />}
          />
          <Route
            path="/EditSurveyPage"
            element={<EditSurveyPage />}
          />
          <Route
            path="/Results/:id"
            element={<Survey />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
