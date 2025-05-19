import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  const handlePressStart = async () => {
    await AsyncStorage.setItem('hasSeenWelcome', 'true');
    navigation.navigate('Signup');
  };

  return (
    <LinearGradient colors={['#000000', '#0d0d0d']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/Mottu.png')} style={styles.logo} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Sistema de Gestão de Pátios</Text>

        <TouchableOpacity style={styles.button} onPress={handlePressStart}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#000',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    flex: 0.3, 
  },
  logo: {
    width: 300,
    height: 220,
    resizeMode: 'contain',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  contentContainer: {
    flex: 0.7, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 60,
    letterSpacing: 1,
  },
  button: {
    backgroundColor: '#32CD32',
    paddingVertical: 16,
    paddingHorizontal: 100,
    borderRadius: 30,
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default WelcomeScreen;
