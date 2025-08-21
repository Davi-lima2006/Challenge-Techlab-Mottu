import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../screen/ThemeContext';

const WelcomeScreen = ({ navigation }) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const handlePressStart = () => navigation.navigate('Signup');

  const backgroundColors = isDark ? ['#000000CC', '#0d0d0dCC'] : ['#FFFFFFCC', '#f0f0f0CC'];
  const textColor = isDark ? '#fff' : '#000';
  const subtitleColor = isDark ? '#ccc' : '#555';
  const statusBarStyle = isDark ? 'light-content' : 'dark-content';
  const statusBarBg = isDark ? '#000' : '#fff';

  const logoImage = require('../../../assets/Welcome.png');
  const bgImage = require('../../../assets/foto.moto.png');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: statusBarBg }}>
      <StatusBar
        translucent={false}
        backgroundColor={statusBarBg}
        barStyle={statusBarStyle}
      />

      <ImageBackground
        source={bgImage}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <LinearGradient colors={backgroundColors} style={styles.container}>
          
          {/* Botão de troca de tema no canto superior direito */}
          <TouchableOpacity style={styles.settingsIcon} onPress={toggleTheme}>
            {isDark ? (
              <Feather name="sun" size={30} color={textColor} />
            ) : (
              <Feather name="moon" size={30} color={textColor} />
            )}
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image source={logoImage} style={styles.logo} />
          </View>

          <View style={styles.contentContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: textColor,
                  fontWeight: isDark ? '900' : '600',
                  textShadowColor: isDark ? '#00000050' : 'transparent',
                  textShadowOffset: { width: 1, height: 2 },
                  textShadowRadius: 6,
                }
              ]}
            >
              Bem-vindo
            </Text>
            <Text style={[styles.subtitle, { color: subtitleColor }]}>
              Sistema de Gestão de Pátios
            </Text>

            <TouchableOpacity style={styles.button} onPress={handlePressStart}>
              <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 30 },
  bgImage: { flex: 1 },
  settingsIcon: { position: 'absolute', top: 50, right: 30, zIndex: 10 },
  logoContainer: { alignItems: 'center', justifyContent: 'flex-start', paddingTop: 60, flex: 0.3 },
  logo: { width: 300, height: 220, resizeMode: 'contain' },
  contentContainer: { flex: 0.7, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 36, textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 24, letterSpacing: 1, lineHeight: 24 },
  button: { backgroundColor: '#32CD32', paddingVertical: 16, paddingHorizontal: 100, borderRadius: 35, elevation: 6 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '800', letterSpacing: 1 },
});

export default WelcomeScreen;
