import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, Image } from 'react-native'; // Import Image component
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


interface CameraScreenProps {
  route: {
    params: {
      name: string;
    };
  };
}

const CameraScreen: React.FC<CameraScreenProps> = ({ route }) => {
  const cameraRef = useRef<Camera | null>(null);
  const { name } = route.params;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<Camera['Constants']['Type']>(Camera.Constants.Type.front);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const navigation = useNavigation(); // Get the navigation object

  const handleCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleTakePicture = async () => {
    if (!cameraRef.current) return;
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo.uri); // Save the captured image URI
        Alert.alert('Success', 'Picture taken!');
        // navigation.navigate('WelcomeScreen', { name, capturedImage: photo.uri });
      } else {
        Alert.alert('Permission Denied', 'Camera permission is required to take pictures.');
      }
    } catch (error) {
      console.log('Error taking picture: ', error);
      Alert.alert('Error', 'Failed to take picture. Please try again later.');
    }
  };

  const handleSwapCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  useEffect(() => {
    handleCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Camera Preview */}
      <View style={styles.cameraContainer}>
        <Camera style={styles.cameraPreview} type={type} ref={cameraRef} />
        <View style={styles.cameraFrame} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {name}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSwapCamera} style={[styles.button, styles.swapButton]}>
          {/* Swap Camera Icon */}
          <FontAwesome5 name={type === Camera.Constants.Type.back ? 'camera' : 'sync'} size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTakePicture} style={[styles.button, styles.captureButton]}>
          {/* Register User Icon */}
          <FontAwesome5 name="user-plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Display Captured Image */}
      {capturedImage && (
        <View style={styles.capturedImageContainer}>
          <Text style={styles.thankYouText}>Thank you, {name}!</Text>
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  cameraPreview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  cameraFrame: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.1,
    left: Dimensions.get('window').width * 0.1,
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    borderWidth: 4,
    borderColor: '#00A1C9', // Change circle color here
    borderRadius: (Dimensions.get('window').width * 0.8) / 2,
  },
  header: {
    paddingVertical: 20,
    backgroundColor: '#00A1C9',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swapButton: {
    backgroundColor: '#43425D', // Change swap camera button color here
  },
  captureButton: {
    backgroundColor: '#FF7F50', // Change capture picture button color here
  },
  capturedImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thankYouText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  capturedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default CameraScreen;
