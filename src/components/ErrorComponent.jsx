

import React from 'react';

const ErrorComponent = ({ error }) => {

  return (
    <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>
      {error}
    </div>
  );
};

export default ErrorComponent;
