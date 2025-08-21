import React, { useState, useContext } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, Animated 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../screen/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const { isDark } = useContext(ThemeContext);
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => Animated.spring(scaleValue, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleValue, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    if (nome.length < 3) {
      setError('O nome deve ter pelo menos 3 caracteres.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Email inválido.');
      return;
    }
    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      await AsyncStorage.setItem('nome', nome);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('senha', senha);
      navigation.navigate('Signup');
    } catch (err) {
      setError('Erro ao salvar os dados. Tente novamente.');
    }
  };

  const backgroundColors = isDark ? ['#000', '#0d0d0d'] : ['#fff', '#f0f0f0'];
  const textColor = isDark ? '#fff' : '#000';
  const inputBg = isDark ? '#222' : '#eee';
  const inputText = isDark ? '#fff' : '#000';
  const placeholderColor = isDark ? '#aaa' : '#555';
  const linkGreen = '#32CD32';
  const errorBg = isDark ? '#330000' : '#ffe6e6';
  const errorText = isDark ? '#ff4d4d' : '#cc0000';

  return (
    <LinearGradient colors={backgroundColors} style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={backgroundColors[0]} />

      <View style={styles.header}>
        <Image
          source={isDark ? require('../../../assets/Login.png') : require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: textColor }]}>Cadastro</Text>
      </View>

      {error ? (
        <View style={[styles.errorBox, { backgroundColor: errorBg, borderColor: linkGreen }]}>
          <MaterialIcons name="error-outline" size={20} color={errorText} style={{ marginRight: 8 }} />
          <Text style={[styles.errorText, { color: errorText }]}>{error}</Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <TextInput
          style={[styles.input, { backgroundColor: inputBg, color: inputText, borderColor: linkGreen }]}
          placeholder="Nome"
          placeholderTextColor={placeholderColor}
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={[styles.input, { backgroundColor: inputBg, color: inputText, borderColor: linkGreen }]}
          placeholder="Email"
          placeholderTextColor={placeholderColor}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { backgroundColor: inputBg, color: inputText, borderColor: linkGreen }]}
          placeholder="Senha"
          placeholderTextColor={placeholderColor}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Text style={styles.linkText}>
              <Text style={{ color: textColor }}>Já tem cadastro? </Text>
              <Text style={{ color: linkGreen, fontWeight: '700' }}>Faça login agora</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  logo: { width: 50, height: 50, resizeMode: 'contain', marginRight: 12 },
  title: { fontSize: 28, fontWeight: '700' },
  form: { width: '100%', alignItems: 'center' },
  input: { height: 50, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 20, borderWidth: 2, width: '100%' },
  button: { backgroundColor: '#32CD32', paddingVertical: 16, borderRadius: 10, alignItems: 'center', elevation: 6, width: '100%', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700', letterSpacing: 1 },
  linkText: { fontSize: 16, textDecorationLine: 'underline', textAlign: 'center' },
  errorBox: { flexDirection: 'row', padding: 10, borderRadius: 10, borderWidth: 1, marginBottom: 20, alignItems: 'center' },
  errorText: { fontSize: 14, flex: 1 }
});
