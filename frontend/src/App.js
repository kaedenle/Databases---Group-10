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

//Custom Components
import Sidebar from './components/Sidebar';
import LoggedIn from './components/LoggedIn';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
