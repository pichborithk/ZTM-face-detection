import React from 'react';

const FaceRecognition = ({ boxes, imageUrl }) => {
  return (
    <>
      <div className='center ma'>
        <div className='absolute mt2'>
          <img
            alt=''
            src={imageUrl}
            width='500px'
            heigh='auto'
            id='input-image'
          />
          {boxes.map((box, i) => (
            <div
              key={i}
              className='bounding-box'
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FaceRecognition;
