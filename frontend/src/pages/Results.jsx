import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//custom imports
import Sidebar from '../components/Sidebar';
import Survey from '../components/Survey';

// css
import '../css/Survey.scss';

function Results() {
  const [message, setMessage] = useState();
  const [surveyList, setSurveyList] = useState([]);

  var user_data = JSON.parse(localStorage.getItem('user_data'));

  useEffect(() => {
    const get_surveys = async (event) => {
      try {
        //IN - userName, page (optional = 0), per_page (optional = 10)

        const obj = {
          userName: user_data.userName,
        };

        var js = JSON.stringify(obj);

        const response = await fetch('http://localhost:5000/list_user_survey', {
          method: 'POST',
          body: js,
          headers: { 'Content-Type': 'application/json' },
        });

        let res = JSON.parse(await response.text());
        console.log(res);

        if (res.error && res.error !== '') {
          console.log(message);
          setMessage(message);
        } else {
          setMessage('');
          setSurveyList(res.info);
          console.log(surveyList);
        }
      } catch (e) {
        alert(e.toString());
      }
    };
    get_surveys();
  }, [surveyList]);

  function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <>
      <div>
        <Sidebar />
        <div className="survey">
          <h1 className="m-5"> List of your Active Surveys</h1>
          <ul className="list-group">
            {surveyList.map((data) => (
              <li
                className="list-group-item"
                key={data.id}
              >
                <Link
                  className="text-dark survey-link"
                  to={`/Results/${data.title}`}
                >
                  {data.title}
                </Link>
                <p>Description: {data.description}</p>
                <p>Start: {formatDate(data.period_start)}</p>
                <p>End: {formatDate(data.period_end)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Results;
