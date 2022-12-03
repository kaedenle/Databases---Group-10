//Bootstrap
import Button from 'react-bootstrap/esm/Button';

import '../css/create.scss';

function QuestionContainer() {
  return (
    <div style={{ marginLeft: '20px' }}>
      <h3>Questions:</h3>
      <Button
        variant="dark"
        className="w-75"
      >
        +
      </Button>
    </div>
  );
}

export default QuestionContainer;
