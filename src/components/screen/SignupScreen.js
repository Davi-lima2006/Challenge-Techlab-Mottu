  import React, { useState, useContext, useEffect } from 'react';
  import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, Animated, ImageBackground 
  } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { LinearGradient } from 'expo-linear-gradient';
  import { ThemeContext } from '../screen/ThemeContext';
  import { MaterialIcons } from '@expo/vector-icons';
  import * as LocalAuthentication from 'expo-local-authentication';

  export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [biometriaAtiva, setBiometriaAtiva] = useState(false);

    const { isDark } = useContext(ThemeContext);
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () =>
      Animated.spring(scaleValue, { toValue: 0.95, useNativeDriver: true }).start();
    const handlePressOut = () =>
      Animated.spring(scaleValue, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    useEffect(() => {
      const checkBiometria = async () => {
        const flag = await AsyncStorage.getItem('biometriaAtiva');
        setBiometriaAtiva(flag === 'true'); // só ativa se marcado no cadastro
      };
      checkBiometria();
    }, []);

    // Login normal
    const handleLogin = async () => {
      if (!email || !senha) {
        setError('Todos os campos são obrigatórios.');
        return;
      }
      if (!validateEmail(email)) {
        setError('Email inválido.');
        return;
      }

      try {
        const savedEmail = await AsyncStorage.getItem('email');
        const savedSenha = await AsyncStorage.getItem('senha');

        if (email === savedEmail && senha === savedSenha) {
          navigation.navigate('Home');
        } else {
          setError('Email ou senha incorretos.');
        }
      } catch (err) {
        console.error('Erro ao acessar os dados:', err);
        setError('Erro ao acessar os dados. Tente novamente.');
      }
    };

    // Login biometria
    const handleBiometriaLogin = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        alert('Seu dispositivo não suporta autenticação biométrica.');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        alert('Nenhuma biometria cadastrada no dispositivo.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentique-se para entrar',
        fallbackLabel: 'Use a senha',
        disableDeviceFallback: false,
      });

      if (result.success) {
        navigation.navigate('Home');
      } else {
        alert('Autenticação falhou. Tente novamente.');
      }
    };

    const backgroundColors = isDark ? ['#000000CC', '#0d0d0dCC'] : ['#FFFFFFCC', '#f0f0f0CC'];
    const textColor = isDark ? '#fff' : '#000';
    const inputBg = isDark ? '#222' : '#eee';
    const inputText = isDark ? '#fff' : '#000';
    const placeholderColor = isDark ? '#aaa' : '#555';
    const linkGreen = '#32CD32';
    const errorBg = isDark ? '#330000' : '#ffe6e6';
    const errorText = isDark ? '#ff4d4d' : '#cc0000';

    const bgImage = require('../../../assets/foto.moto.png');

    return (
      <ImageBackground source={bgImage} style={styles.bgImage} resizeMode="cover">
        <LinearGradient colors={backgroundColors} style={styles.container}>
          <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

          <View style={styles.header}>
            <Image source={require('../../../assets/logo.png')} style={styles.logo} />
            <Text style={[styles.title, { color: textColor }]}>Faça seu login</Text>
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

            {/* Login normal */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            {/* Só aparece se biometria estiver ativa */}
            {biometriaAtiva && (
              <>
                <Text style={{ color: textColor, marginVertical: 8, fontSize: 16 }}>ou</Text>
                <TouchableOpacity
                  style={[styles.buttonFace, { backgroundColor: isDark ? '#444' : '#eee', borderColor: linkGreen, borderWidth: 2 }]}
                  onPress={handleBiometriaLogin}
                >
                  <Text style={[styles.buttonFaceText, { color: isDark ? '#fff' : '#000' }]}>
                    Entrar com Biometria
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <Text style={styles.linkText}>
                  <Text style={{ color: textColor }}>Não tem cadastro? </Text>
                  <Text style={{ color: linkGreen, fontWeight: '700' }}>Faça seu cadastro agora</Text>
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    bgImage: { flex: 1 },
    container: { flex: 1, paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center' },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    logo: { width: 50, height: 50, resizeMode: 'contain', marginRight: 12 },
    title: { fontSize: 28, fontWeight: '700' },
    form: { width: '100%', alignItems: 'center' },
    input: { height: 50, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 20, borderWidth: 2, width: '100%' },
    button: { backgroundColor: '#32CD32', paddingVertical: 16, borderRadius: 10, alignItems: 'center', elevation: 6, width: '100%', marginBottom: 20 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: '700', letterSpacing: 1 },
    buttonFace: { paddingVertical: 16, borderRadius: 10, alignItems: 'center', elevation: 3, width: '100%', marginBottom: 20 },
    buttonFaceText: { fontSize: 18, fontWeight: '700', letterSpacing: 1 },
    linkText: { fontSize: 16, textDecorationLine: 'underline', textAlign: 'center' },
    errorBox: { flexDirection: 'row', padding: 10, borderRadius: 10, borderWidth: 1, marginBottom: 20, alignItems: 'center' },
    errorText: { fontSize: 14, flex: 1 }
  });
