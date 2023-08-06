
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ImagePicker, { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';


interface CameraScreenProps {
  route: {
    params: {
      name: string;
    };
  };
}

const CameraScreen: React.FC<CameraScreenProps> = ({ route }) => {
  const { name } = route.params;
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  // const cameraRef = useRef<RNCamera>(null);

  // Function to handle capturing an image
  const handleCaptureImage = () => {
    console.log('options')

    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 400,
      quality: 0.5,
      includeBase64: false,
    };
    launchCamera(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.error) {
        setCapturedImages(prevImages => [...prevImages, response.uri]);
      } else {
        console.warn('Error capturing image:', response.error);
      }
    });
  };

  // Function to handle selecting an image from the gallery
  // const handleSelectImage = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     maxWidth: 300,
  //     maxHeight: 400,
  //     quality: 0.5,
  //     includeBase64: false,
  //   };

    // launchImageLibrary(options, (response: ImagePickerResponse) => {
    //   if (!response.didCancel && !response.error) {
    //     setCapturedImages(prevImages => [...prevImages, response.uri]);
    //   } else {
    //     console.warn('Error selecting image:', response.error);
    //   }
    // });
  // };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {name}</Text>
      </View>

      {/* Camera Preview */}
      <View style={styles.cameraContainer}>
        <View style={styles.captureButtons}>
          {/* Capture Face Button */}
          <TouchableOpacity style={styles.captureButton} onPress={handleCaptureImage}>
            <Text style={styles.buttonText}>Capture Face</Text>
          </TouchableOpacity> 

          {/* Select Image Button */}
          {/* <TouchableOpacity style={styles.captureButton} onPress={handleSelectImage}>
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Display Captured Images */}
      {capturedImages.length > 0 && (
        <View style={styles.imageContainer}>
          {capturedImages.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.capturedImage} />
          ))}
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
  header: {
    paddingVertical: 20,
    backgroundColor: '#43425D',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  captureButton: {
    backgroundColor: '#43425D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 20,
  },
  capturedImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 5,
  },
});

export default CameraScreen;
