import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function EditarMotoScreen({ route, navigation }) {
  const { moto } = route.params;

  const [marca, setMarca] = useState(moto.marca || '');
  const [modelo, setModelo] = useState(moto.modelo || '');
  const [chassi, setChassi] = useState(moto.chassi || '');
  const [motor, setMotor] = useState(moto.motor || '');
  const [imeiIot, setImeiIot] = useState(moto.imeiIot || '');
  const [rfid, setRfid] = useState(moto.rfid || '');

  const confirmarAtualizacao = () => {
    Alert.alert(
      'Confirmar atualização',
      'Tem certeza que deseja salvar a atualização?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: salvarAtualizacao },
      ],
    );
  };

  const salvarAtualizacao = () => {
    Alert.alert('Sucesso', `Moto com placa ${moto.placa} atualizada!`);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Atualizar Moto</Text>

        <Text style={styles.label}>Placa</Text>
        <TextInput
          style={[styles.input, styles.inputDesabilitado]}
          value={moto.placa}
          editable={false}
        />

        <Text style={styles.label}>Marca</Text>
        <TextInput
          style={styles.input}
          value={marca}
          onChangeText={setMarca}
          placeholder="Marca"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Modelo</Text>
        <TextInput
          style={styles.input}
          value={modelo}
          onChangeText={setModelo}
          placeholder="Modelo"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Chassi</Text>
        <TextInput
          style={styles.input}
          value={chassi}
          onChangeText={setChassi}
          placeholder="Chassi"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Motor</Text>
        <TextInput
          style={styles.input}
          value={motor}
          onChangeText={setMotor}
          placeholder="Motor"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>IMEI IoT</Text>
        <TextInput
          style={styles.input}
          value={imeiIot}
          onChangeText={setImeiIot}
          placeholder="IMEI IoT"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>RFID</Text>
        <TextInput
          style={styles.input}
          value={rfid}
          onChangeText={setRfid}
          placeholder="RFID"
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.botaoSalvar} onPress={confirmarAtualizacao}>
          <Text style={styles.textoBotao}>Salvar Moto Atualizada</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 26,
    color: '#28a745',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    color: '#28a745',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  inputDesabilitado: {
    opacity: 0.6,
  },
  botaoSalvar: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
