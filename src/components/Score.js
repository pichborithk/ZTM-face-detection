import React from 'react';

const Score = ({ name, entries }) => {
  return (
    <>
      <div className='f3 white'>{`${name}, your current score is...`}</div>
      <div className='f1 white'>{entries}</div>
    </>
  );
};

export default Score;
