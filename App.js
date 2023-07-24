// App.js
import React, { useState, useEffect } from 'react';
import SplashScreen from './src/SplashScreen';
import CameraScreen from './src/CameraScreen';

const App = () => {
  const [showCamera, setShowCamera] = useState(false);

  const handleSplashTimeout = () => {
    setShowCamera(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSplashTimeout();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return showCamera ? <CameraScreen /> : <SplashScreen onTimeout={handleSplashTimeout} />;
};

export default App;
