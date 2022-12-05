import surveyImg from '../assets/surveyImg.png';

function LeftHomeSection() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-center mt-4 mb-4">Survey Studies</h1>

      <p className="text-center">
        Hello! Love taking studies, need to create one?
        <br /> This is the place for you!
      </p>
      <img
        src={surveyImg}
        className="w-50"
        alt="Survey cartoon"
      />
      <ul style={{ listStyle: 'none', fontSize: '20px' }}>
        <li className="custom-li">Create</li>
        <li className="custom-li">Take</li>
        <li className="custom-li">Results</li>
      </ul>
    </div>
  );
}

export default LeftHomeSection;
