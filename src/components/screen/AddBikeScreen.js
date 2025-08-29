import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { BikeContext } from '../../context/BikeContext';
import { ThemeContext } from '../screen/ThemeContext';

const tiposDeServico = [
  'Manutenção (pontual)',
  'Revisão',
  'Conserto (algo quebrado)',
  'Danificada',
  'Outro',
];

const AddBikeScreen = () => {
  const navigation = useNavigation(); 
  const { addBike } = useContext(BikeContext);
  const { isDark } = useContext(ThemeContext);

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [chassi, setChassi] = useState('');
  const [motor, setMotor] = useState('');
  const [imeiIot, setImeiIot] = useState('');
  const [rfid, setRfid] = useState('');
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [outroServicoDescricao, setOutroServicoDescricao] = useState('');

  const toggleServico = (servico) => {
    if (servicosSelecionados.includes(servico)) {
      setServicosSelecionados(servicosSelecionados.filter(item => item !== servico));
      if (servico === 'Outro') setOutroServicoDescricao('');
    } else {
      setServicosSelecionados([...servicosSelecionados, servico]);
    }
  };

  const handleSalvar = () => {
    if (!marca || !modelo || !placa || !chassi || !motor || !imeiIot || !rfid) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    let servicos = [...servicosSelecionados];
    if (servicos.includes('Outro') && outroServicoDescricao.trim()) {
      servicos = servicos.map(servico =>
        servico === 'Outro' ? `Outro: ${outroServicoDescricao}` : servico
      );
    }

    const novaMoto = {
      marca,
      modelo,
      placa,
      chassi,
      motor,
      imeiIot,
      rfid,
      servicos,
    };

    addBike(novaMoto);

    Alert.alert('Sucesso', 'Moto cadastrada com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);

    setMarca('');
    setModelo('');
    setPlaca('');
    setChassi('');
    setMotor('');
    setImeiIot('');
    setRfid('');
    setServicosSelecionados([]);
    setOutroServicoDescricao('');
  };

  // cores dinâmicas
  const textColor = isDark ? '#28a745' : '#006400';
  const inputBg = isDark ? 'rgba(34,34,34,0.9)' : 'rgba(255,255,255,0.9)';
  const inputText = isDark ? '#fff' : '#000';
  const checkboxBorder = isDark ? '#28a745' : '#006400';
  const checkboxFill = isDark ? '#28a745' : '#006400';
  const buttonBg = '#28a745';
  const buttonTextColor = '#fff';
  const overlayBg = isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)';

  return (
    <ImageBackground
      source={require('../../../assets/motinho.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.overlay, { backgroundColor: overlayBg }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, { color: textColor }]}>Cadastro de Moto</Text>

          <TextInput style={[styles.input, { backgroundColor: inputBg, color: inputText }]} placeholder="Marca" placeholderTextColor="#aaa" value={marca} onChangeText={setMarca} />
          <TextInput style={[styles.input, { backgroundColor: inputBg, color: inputText }]} placeholder="Modelo" placeholderTextColor="#aaa" value={modelo} onChangeText={setModelo} />
          <TextInput style={[styles.input, { backgroundColor: inputBg, color: inputText }]} placeholder="Placa" placeholderTextColor="#aaa" value={placa} onChangeText={setPlaca} />
          <TextInput style={[styles.input, { backgroundColor: inputBg, color: inputText }]} placeholder="Chassi" placeholderTextColor="#aaa" value={chassi} onChangeText={setChassi} />
          <TextInput style={[styles.input, { backgroundColor: inputBg, color: inputText }]} placeholder="Motor" placeholderTextColor="#aaa" value={motor} onChangeText={setMotor} />
          <TextInput style={[styles.input, { backgroundColor: inputBg, color: inputText }]} placeholder="IMEI IoT" placeholderTextColor="#aaa" value={imeiIot} onChangeText={setImeiIot} />
          <TextInput style={[styles.input, { backgroundColor: inputBg, color: inputText }]} placeholder="RFID" placeholderTextColor="#aaa" value={rfid} onChangeText={setRfid} />

          <Text style={[styles.sectionTitle, { color: textColor }]}>Tipo de Serviço:</Text>
          {tiposDeServico.map((servico, index) => (
            <TouchableOpacity key={index} style={styles.checkboxContainer} onPress={() => toggleServico(servico)}>
              <View style={[styles.checkbox, { borderColor: checkboxBorder }]}>
                {servicosSelecionados.includes(servico) && <View style={[styles.checked, { backgroundColor: checkboxFill }]} />}
              </View>
              <Text style={[styles.checkboxLabel, { color: textColor }]}>{servico}</Text>
            </TouchableOpacity>
          ))}

          {servicosSelecionados.includes('Outro') && (
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: inputText }]}
              placeholder="Descreva o serviço"
              placeholderTextColor="#aaa"
              value={outroServicoDescricao}
              onChangeText={setOutroServicoDescricao}
            />
          )}

          <TouchableOpacity style={[styles.button, { backgroundColor: buttonBg }]} onPress={handleSalvar}>
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>Salvar Moto</Text>
          </TouchableOpacity>
        </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  input: {
    width: '100%',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 12,
    height: 12,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AddBikeScreen;
