import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../screen/ThemeContext';

const gerarMotosMockadas = () => {
  const motos = [];
  for (let i = 1; i <= 600; i++) {
    motos.push({
      id: i.toString(),
      placa: `ABC-${(1000 + i).toString().slice(-4)}`,
      modelo: `Modelo ${i}`,
      cor: `Cor ${i % 10}`,
    });
  }
  return motos;
};

const AtualizarMotoScreen = () => {
  const navigation = useNavigation();
  const { isDark } = useContext(ThemeContext);

  const todasMotos = gerarMotosMockadas();
  const [filtroPlaca, setFiltroPlaca] = useState('');

  const motosFiltradas = todasMotos.filter((moto) =>
    moto.placa.toLowerCase().includes(filtroPlaca.toLowerCase())
  );

  // cores dinâmicas
  const overlayColor = isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.85)';
  const textColor = isDark ? '#00FF88' : '#006400';
  const inputBg = isDark ? '#1c1c1c' : '#f2f2f2';
  const inputText = isDark ? '#fff' : '#000';
  const itemBg = isDark ? '#2a2a2a' : '#fff';
  const itemText = isDark ? '#fff' : '#000';
  const placeholderColor = isDark ? '#888' : '#555';

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: itemBg }]}
      onPress={() => navigation.navigate('EditarMoto', { moto: item })}
    >
      <Text style={[styles.texto, { color: itemText }]}>{item.placa}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../../assets/motinho.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

        <Text style={[styles.titulo, { color: textColor }]}>
          Selecione a moto para atualizar
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: inputBg, color: inputText }]}
          placeholder="Digite a placa..."
          placeholderTextColor={placeholderColor}
          value={filtroPlaca}
          onChangeText={setFiltroPlaca}
        />

        {motosFiltradas.length === 0 ? (
          <View style={styles.semResultadosContainer}>
            <Text style={[styles.semResultados, { color: isDark ? '#ccc' : '#444' }]}>
              Nenhuma moto encontrada com essa placa.
            </Text>
          </View>
        ) : (
          <FlatList
            data={motosFiltradas}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            initialNumToRender={20}
            maxToRenderPerBatch={30}
            windowSize={21}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#28a745',
    marginBottom: 15,
  },
  item: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  texto: {
    fontSize: 16,
  },
  semResultadosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  semResultados: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default AtualizarMotoScreen;
