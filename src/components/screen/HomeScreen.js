import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../screen/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { isDark } = useContext(ThemeContext); // tema global

  const encerrarSessao = () => {
    Alert.alert(
      'Encerrar Sessão',
      'Tem certeza que deseja encerrar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            }),
        },
      ]
    );
  };

  // cores dinâmicas
  const backgroundColors = isDark ? ['#000000', '#0d0d0d'] : ['#ffffff', '#f0f0f0'];
  const textColor = isDark ? '#32CD32' : '#28a745';
  const buttonTextColor = '#fff';
  const buttonBg = '#32CD32';
  const exitButtonBg = isDark ? '#111' : '#ddd';
  const exitTextColor = isDark ? '#fff' : '#000';
  const shadowColor = isDark ? '#32CD32' : '#28a745';

  return (
    <LinearGradient colors={backgroundColors} style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={backgroundColors[0]} />

      <View style={styles.titleContainer}>
        <Image source={require('../../../assets/Motos.png')} style={styles.logo} resizeMode="contain" />
        <Text style={[styles.title, { color: textColor } ]}>Mottu</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuButton icon="clipboard" text="Gestão de Pátio" onPress={() => navigation.navigate('GestaoPatio')} bg={buttonBg} color={buttonTextColor} shadow={shadowColor} />
        <MenuButton icon="plus-circle" text="Adicionar Motocicleta" onPress={() => navigation.navigate('AddBike')} bg={buttonBg} color={buttonTextColor} shadow={shadowColor} />
        <MenuButton icon="edit" text="Atualizar Motocicleta" onPress={() => navigation.navigate('AtualizarMoto')} bg={buttonBg} color={buttonTextColor} shadow={shadowColor} />
        <MenuButton icon="search" text="Consultar Motocicleta" onPress={() => navigation.navigate('VerMotos')} bg={buttonBg} color={buttonTextColor} shadow={shadowColor} />
        <MenuButton
          icon="log-out"
          text="Sair"
          onPress={encerrarSessao}
          bg={exitButtonBg}
          color={exitTextColor}
          isExit
        />
      </View>
    </LinearGradient>
  );
}

const MenuButton = ({ icon, text, onPress, isExit, bg, color, shadow }) => (
  <TouchableOpacity
    style={[
      styles.menuButton,
      isExit && styles.sairButton,
      { backgroundColor: bg, shadowColor: shadow }
    ]}
    onPress={onPress}
  >
    <Feather name={icon} size={22} color={color} style={styles.icon} />
    <Text style={[styles.menuButtonText, isExit && { color: color }]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 12,
  },
  menuContainer: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 68,
    borderRadius: 30,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sairButton: {
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
});
