import React from 'react'

const Loadingmodal = () => {
    return (
      <div className="loading-modal">
        <div className="loading-spinner">
          <div className="spinner-border text-primary text-center" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Please Wait...</p>

        </div>
      </div>
    );
  };

export default Loadingmodal
