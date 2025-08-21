import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { ThemeContext } from '../screen/ThemeContext';

export default function GestaoPatioScreen() {
  const { isDark } = useContext(ThemeContext); // pega tema global

  // cores dinâmicas
  const backgroundColor = isDark ? '#000' : '#fff';
  const textColor = isDark ? '#00FF00' : '#28a745';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={backgroundColor} />
      <Text style={[styles.titulo, { color: textColor }]}>Gestão do Pátio</Text>
      <Image
        source={require('../../../assets/Gestão.png')} 
        style={styles.imagem}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -30, 
  },
  imagem: {
    width: '100%',
    height: 650,
  },
});
