// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ onTimeout }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
    }, 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.logoText}>FaceCaptureApp</Text>
      </View>
      <View style={styles.sloganContainer}>
        <Text style={styles.sloganText}>INTELLIGENT CABIN MANAGEMENT SOLUTION</Text>
        <Text style={styles.poweredByText}>Powered By Cyient Ltd.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C3CAFA',
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
    color: '#43425D',
  },
  sloganContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  sloganText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#43425D',
    marginBottom: 5,
  },
  poweredByText: {
    fontSize: 12,
    color: '#43425D',
  },
});

export default SplashScreen;
