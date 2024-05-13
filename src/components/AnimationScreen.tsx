import React, { useState } from 'react';

const AnimationScreen = () => {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle = {
    width: '200px',
    height: isHovered ? '250px' : '200px',
    backgroundColor: 'lightblue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'height 0.3s ease',
  };

  const buttonStyle = {
    backgroundColor: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
    opacity: isHovered ? '1' : '0',
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>Hover Me</h1>
        <button style={buttonStyle}>Click Me</button>
      </div>
    </div>
  );
};

export default AnimationScreen;
