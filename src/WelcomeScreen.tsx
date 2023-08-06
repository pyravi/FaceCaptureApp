import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // State for the captured image URI
  const navigation = useNavigation();

  const handleNextPage = () => {
    if (name.trim() !== '') {
      navigation.navigate('CameraScreen', { name });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Urban Air Mobility Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleNextPage}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Display Captured Image and Thank You Message */}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3CAFA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#43425D',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#43425D',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#43425D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  // Display Captured Image Styles
  capturedImageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  capturedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default WelcomeScreen;
