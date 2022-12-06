import React from 'react';

export const PrintComponent = React.forwardRef((props, ref) => {
  return <div ref={ref}>My cool content here!</div>;
});
