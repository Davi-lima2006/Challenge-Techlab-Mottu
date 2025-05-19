import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  const todasMotos = gerarMotosMockadas();
  const [filtroPlaca, setFiltroPlaca] = useState('');

  const motosFiltradas = todasMotos.filter((moto) =>
    moto.placa.toLowerCase().includes(filtroPlaca.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('EditarMoto', { moto: item })}
    >
      <Text style={styles.texto}>{item.placa}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecione a moto para atualizar</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a placa..."
        placeholderTextColor="#888"
        value={filtroPlaca}
        onChangeText={setFiltroPlaca}
      />

      {motosFiltradas.length === 0 ? (
        <View style={styles.semResultadosContainer}>
          <Text style={styles.semResultados}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    color: '#28a745',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#28a745',
    borderWidth: 1,
    marginBottom: 15,
  },
  item: {
    backgroundColor: '#1c1c1c',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  texto: {
    color: '#fff',
    fontSize: 16,
  },
  semResultadosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  semResultados: {
    color: '#ccc',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default AtualizarMotoScreen;
