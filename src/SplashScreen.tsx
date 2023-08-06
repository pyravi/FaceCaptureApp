// import React, { useEffect } from 'react';
// import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';

// interface SplashScreenProps {
//   onTimeout: () => void;
// }

// const SplashScreen: React.FC<SplashScreenProps> = ({ onTimeout }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // aonTimeout();
//     }, 3000); // 3 seconds
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image source={require('../assets/logo.png')} style={styles.logo} />
//         <Text style={styles.logoText}>UAM Passenger Registration</Text>
//       </View>
//       <View style={styles.sloganContainer}>
//         <Text style={styles.sloganText}>INTELLIGENT CABIN MANAGEMENT SOLUTION</Text>
//         <Text style={styles.poweredByText}>Powered By Cyient Ltd.</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#C3CAFA',
//       },
//       logoContainer: {
//         alignItems: 'center',
//       },
//       logo: {
//         width: 200,
//         height: 200,
//         resizeMode: 'contain',
//       },
//       logoText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#00A1C9',
//       },
//       sloganContainer: {
//         position: 'absolute',
//         bottom: 20,
//         alignItems: 'center',
//       },
//       sloganText: {
//         fontSize: 15,
//         fontWeight: 'bold',
//         color: '#00A1C9',
//         marginBottom: 5,
//       },
//       poweredByText: {
//         fontSize: 12,
//         color: '#00A1C9',
//       },
//     });
    
// export default SplashScreen;


import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType, Animated } from 'react-native';

interface SplashScreenProps {
  onTimeout: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onTimeout }) => {
  const logoFadeAnimation = new Animated.Value(0);
  const sloganSlideAnimation = new Animated.Value(0);

  useEffect(() => {
    const logoAnimationDuration = 1000;
    const sloganAnimationDuration = 800;
    const animationDelay = 500;

    Animated.sequence([
      Animated.delay(animationDelay),
      Animated.timing(logoFadeAnimation, {
        toValue: 1,
        duration: logoAnimationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(sloganSlideAnimation, {
        toValue: 1,
        duration: sloganAnimationDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Call the onTimeout callback after the animations finish
      // onTimeout();
    });
  }, [logoFadeAnimation, sloganSlideAnimation, onTimeout]);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Animated.View style={[styles.logoContainer, { opacity: logoFadeAnimation }]}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.logoText}>UAM Passenger Registration</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.sloganContainer,
          { transform: [{ translateY: sloganSlideAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }) }],
        }]}
      >
        <Text style={styles.sloganText}>INTELLIGENT CABIN MANAGEMENT SOLUTION</Text>
        <Text style={styles.poweredByText}>Powered By Cyient Ltd.</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A1C9',
  },
  sloganContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  sloganText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00A1C9',
    marginBottom: 5,
  },
  poweredByText: {
    fontSize: 12,
    color: '#00A1C9',
  },
});

export default SplashScreen;
