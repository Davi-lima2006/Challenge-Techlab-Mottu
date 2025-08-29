import React, { useState, useContext } from 'react';
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
  ImageBackground,
  StatusBar,
} from 'react-native';
import { ThemeContext } from '../screen/ThemeContext';

export default function EditarMotoScreen({ route, navigation }) {
  const { moto } = route.params;
  const { isDark } = useContext(ThemeContext);

  const [marca, setMarca] = useState(moto.marca || '');
  const [modelo, setModelo] = useState(moto.modelo || '');
  const [chassi, setChassi] = useState(moto.chassi || '');
  const [motor, setMotor] = useState(moto.motor || '');
  const [imeiIot, setImeiIot] = useState(moto.imeiIot || '');
  const [rfid, setRfid] = useState(moto.rfid || '');

  const overlayColor = isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.85)';
  const inputBg = isDark ? '#1c1c1c' : '#eee';
  const inputText = isDark ? '#fff' : '#000';
  const textColor = isDark ? '#00FF88' : '#006400';
  const placeholderColor = isDark ? '#888' : '#555';
  const buttonBg = '#28a745';
  const buttonTextColor = '#fff';

  const confirmarAtualizacao = () => {
    Alert.alert(
      'Confirmar atualização',
      'Tem certeza que deseja salvar a atualização?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: salvarAtualizacao },
      ]
    );
  };

  const salvarAtualizacao = () => {
    Alert.alert('Sucesso', `Moto com placa ${moto.placa} atualizada!`);
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../../../assets/motinho.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={[styles.titulo, { color: textColor }]}>Atualizar Moto</Text>

            <Text style={[styles.label, { color: textColor }]}>Placa</Text>
            <TextInput
              style={[styles.input, styles.inputDesabilitado, { backgroundColor: inputBg, color: inputText }]}
              value={moto.placa}
              editable={false}
            />

            <Text style={[styles.label, { color: textColor }]}>Marca</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: inputText }]}
              value={marca}
              onChangeText={setMarca}
              placeholder="Marca"
              placeholderTextColor={placeholderColor}
            />

            <Text style={[styles.label, { color: textColor }]}>Modelo</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: inputText }]}
              value={modelo}
              onChangeText={setModelo}
              placeholder="Modelo"
              placeholderTextColor={placeholderColor}
            />

            <Text style={[styles.label, { color: textColor }]}>Chassi</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: inputText }]}
              value={chassi}
              onChangeText={setChassi}
              placeholder="Chassi"
              placeholderTextColor={placeholderColor}
            />

            <Text style={[styles.label, { color: textColor }]}>Motor</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: inputText }]}
              value={motor}
              onChangeText={setMotor}
              placeholder="Motor"
              placeholderTextColor={placeholderColor}
            />

            <Text style={[styles.label, { color: textColor }]}>IMEI IoT</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: inputText }]}
              value={imeiIot}
              onChangeText={setImeiIot}
              placeholder="IMEI IoT"
              placeholderTextColor={placeholderColor}
            />

            <Text style={[styles.label, { color: textColor }]}>RFID</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: inputText }]}
              value={rfid}
              onChangeText={setRfid}
              placeholder="RFID"
              placeholderTextColor={placeholderColor}
            />

            <TouchableOpacity
              style={[styles.botaoSalvar, { backgroundColor: buttonBg }]}
              onPress={confirmarAtualizacao}
            >
              <Text style={[styles.textoBotao, { color: buttonTextColor }]}>
                Salvar Moto Atualizada
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, padding: 20 },
  container: { paddingBottom: 40 },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  label: { fontSize: 16, marginBottom: 5, marginTop: 10 },
  input: {
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  inputDesabilitado: { opacity: 0.6 },
  botaoSalvar: {
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
    alignItems: 'center',
    elevation: 5,
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
