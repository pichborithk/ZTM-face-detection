import React from 'react';

const ImageLinkForm = ({ onUrlInput, onDetectSubmit }) => {
  return (
    <>
      <p className='f3 white'>
        {'This Magic Brain will detect faces in your pictures. Git it a try.'}
      </p>
      <div className='center'>
        <div className='url-form my-color center pa4 br3 shadow-5 zindex'>
          <input
            className='f4 pa2 w-70 center'
            type='tex'
            onChange={onUrlInput}
          />
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-red'
            onClick={onDetectSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageLinkForm;
