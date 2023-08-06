// import React, { useState, useEffect } from 'react';
// import SplashScreen from './src/SplashScreen';
// // import CameraScreen from './src/CameraScreen';

// const App: React.FC = () => {
//   const [showCamera, setShowCamera] = useState<boolean>(false);

//   const handleSplashTimeout = () => {
//     setShowCamera(true);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       handleSplashTimeout();
//     }, 3000); // 3 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   // return showCamera ? <CameraScreen /> : <SplashScreen onTimeout={handleSplashTimeout} />;
//   return <SplashScreen onTimeout={handleSplashTimeout} />;

// };

// export default App;

import React, { useState, useEffect } from 'react';
import SplashScreen from './src/SplashScreen';
import HomeScreen from './src/HomeScreen';
import CameraScreen from './src/CameraScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);



const Stack = createStackNavigator();

const App: React.FC = () => {
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const handleSplashTimeout = () => {
    setShowCamera(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSplashTimeout();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SplashScreen"
      >
        {showCamera ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CameraScreen" component={CameraScreen} />
          </>
        ) : (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            initialParams={{ onTimeout: handleSplashTimeout }}
          />
        )}
        {/* Add more screens here as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
