import React from 'react';
import './LoadingAnimation.css'; 

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <div id="loop" className="center"></div>
      <div id="bike-wrapper" className="center">
        <div id="bike" className="centerBike"></div>
        
      </div>
      <div className="loadingtext">Fetching your stock data, hang tight...</div>
    </div>
  );
};

export default LoadingAnimation;
