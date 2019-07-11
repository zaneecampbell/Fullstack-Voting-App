import React from 'react';

const VotePage = ({ match }) => {
  const id = match.params.id;
  console.log(id)
  return (
    <div>
      <h1 style={{ fontSize: '100px' }}>hi</h1>
    </div>
  );
};

export default VotePage;
