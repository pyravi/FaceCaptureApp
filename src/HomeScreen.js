import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

const HomeScreen = () => {
  const [name, setName] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  const handleCaptureImage = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setCapturedImage(data.uri);
      } catch (error) {
        console.warn('Error capturing image:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to FaceCaptureApp</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={text => setName(text)}
      />
      {capturedImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <RNCamera
            ref={cameraRef}
            style={styles.cameraPreview}
            type={RNCamera.Constants.Type.front}
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <Button title="Capture Face Image" onPress={handleCaptureImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPreview: {
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capturedImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
