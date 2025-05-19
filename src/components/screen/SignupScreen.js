import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('senha', senha);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  return (
    <LinearGradient colors={['#000', '#0d0d0d']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.header}>
        <Image
          source={require('../../../assets/Login.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Faça seu login</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#32CD32',
  },
  button: {
    backgroundColor: '#32CD32',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
