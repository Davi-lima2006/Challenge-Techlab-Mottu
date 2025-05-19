import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function GestaoPatioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gestão do Pátio</Text>
      <Image
        source={require('../../../assets/image.png')} 
        style={styles.imagem}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    marginBottom: 20,
    marginTop: -30, 
  },
  imagem: {
    width: '100%',
    height: 650,
  },
});
