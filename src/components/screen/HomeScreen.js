import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

export default function HomeScreen({ navigation }) {
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

  return (
    <LinearGradient colors={['#000000', '#0d0d0d']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.titleContainer}>
        <Image source={require('../../../assets/Motos.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Mottu</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuButton icon="clipboard" text="Gestão de Pátio" onPress={() => navigation.navigate('GestaoPatio')} />
        <MenuButton icon="plus-circle" text="Adicionar Motocicleta" onPress={() => navigation.navigate('AddBike')} />
        <MenuButton icon="edit" text="Atualizar Motocicleta" onPress={() => navigation.navigate('AtualizarMoto')} />
        <MenuButton icon="search" text="Consultar Motocicleta" onPress={() => navigation.navigate('VerMotos')} />
        <MenuButton
          icon="log-out"
          text="Sair"
          onPress={encerrarSessao}
          isExit
        />
      </View>
    </LinearGradient>
  );
}

const MenuButton = ({ icon, text, onPress, isExit }) => (
  <TouchableOpacity
    style={[styles.menuButton, isExit && styles.sairButton]}
    onPress={onPress}
  >
    <Feather name={icon} size={22} color="#fff" style={styles.icon} />
    <Text style={[styles.menuButtonText, isExit && styles.sairText]}>{text}</Text>
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
    color: '#32CD32',
    textShadowColor: 'rgba(50, 205, 50, 0.4)',
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
    backgroundColor: '#32CD32',
    paddingVertical: 16,
    paddingHorizontal: 68,
    borderRadius: 30,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#32CD32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sairButton: {
    backgroundColor: '#111',
    borderColor: '#fff',
    borderWidth: 2,
    paddingHorizontal: 40,       
    justifyContent: 'center',    
  },
  sairText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});
