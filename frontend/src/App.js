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
          {/* <Route element={<LoggedIn />}>
            <Route
              path="/home"
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
          </Route> */}

          <Route
            path="/home"
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
            exact
            path="/"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<LogIn />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
