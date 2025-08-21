import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BikeContext } from '../../context/BikeContext';
import { ThemeContext } from '../screen/ThemeContext';

export default function VerMotosScreen({ navigation }) {
  const { bikes, removeBike } = useContext(BikeContext);
  const { isDark } = useContext(ThemeContext);

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [servicosModal, setServicosModal] = useState([]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const removerMoto = (placa) => {
    removeBike(placa);
    setExpandedIndex(null);
  };

  const verServicos = (servicos) => {
    if (Array.isArray(servicos) && servicos.length > 0) {
      setServicosModal(servicos);
    } else {
      setServicosModal(['Nenhum serviço registrado.']);
    }
    setModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.card, { backgroundColor: isDark ? '#111' : '#ddd', borderColor: isDark ? '#00FF00' : '#006400' }]}>
      <TouchableOpacity
        style={styles.placaRow}
        onPress={() => toggleExpand(index)}
      >
        <Text style={[styles.placa, { color: isDark ? '#fff' : '#000' }]}>{item.placa}</Text>
        <Ionicons
          name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={isDark ? '#fff' : '#000'}
        />
      </TouchableOpacity>

      {expandedIndex === index && (
        <View style={styles.details}>
          <Text style={[styles.detailText, { color: isDark ? '#ccc' : '#333' }]}>Marca: {item.marca || '-'}</Text>
          <Text style={[styles.detailText, { color: isDark ? '#ccc' : '#333' }]}>Modelo: {item.modelo || '-'}</Text>
          <Text style={[styles.detailText, { color: isDark ? '#ccc' : '#333' }]}>Chassi: {item.chassi || '-'}</Text>
          <Text style={[styles.detailText, { color: isDark ? '#ccc' : '#333' }]}>Motor: {item.motor || '-'}</Text>
          <Text style={[styles.detailText, { color: isDark ? '#ccc' : '#333' }]}>IMEI IoT: {item.imeiIot || '-'}</Text>
          <Text style={[styles.detailText, { color: isDark ? '#ccc' : '#333' }]}>RFID: {item.rfid || '-'}</Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.servicoButton, { backgroundColor: isDark ? '#007bff' : '#3399ff' }]}
              onPress={() => verServicos(item.servicos)}
            >
              <Ionicons name="construct-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Ver Serviços</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.deleteButton, { backgroundColor: isDark ? '#cc0000' : '#ff3333' }]}
              onPress={() => removerMoto(item.placa)}
            >
              <Ionicons name="trash-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#000' : '#fff'} />
      <Text style={[styles.title, { color: isDark ? '#00FF00' : '#006400' }]}>Motos Cadastradas</Text>

      <FlatList
        data={bikes}
        keyExtractor={(item, index) => item.placa || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: isDark ? '#999' : '#666' }]}>
            Nenhuma moto cadastrada ainda.
          </Text>
        }
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDark ? '#111' : '#eee' }]}>
            <Text style={[styles.modalTitle, { color: isDark ? '#00FF00' : '#006400' }]}>Serviços</Text>
            <ScrollView style={{ maxHeight: 250, marginVertical: 10 }}>
              {servicosModal.map((servico, i) => (
                <Text key={i} style={[styles.modalText, { color: isDark ? '#ccc' : '#333' }]}>
                  • {servico}
                </Text>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.modalCloseButton, { backgroundColor: isDark ? '#00FF00' : '#339933' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalCloseButtonText, { color: isDark ? '#000' : '#fff' }]}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  list: { paddingBottom: 20 },
  card: { borderRadius: 10, padding: 15, marginBottom: 15, borderWidth: 1 },
  placaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  placa: { fontSize: 20, fontWeight: 'bold' },
  details: { marginTop: 10 },
  detailText: { fontSize: 16, marginVertical: 2 },
  emptyText: { fontSize: 16, textAlign: 'center', marginTop: 50 },
  buttonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  servicoButton: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 5 },
  deleteButton: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 5 },
  buttonText: { color: '#fff', marginLeft: 5, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalContent: { borderRadius: 10, padding: 20, width: '100%', maxWidth: 400 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  modalText: { fontSize: 16, marginVertical: 4 },
  modalCloseButton: { paddingVertical: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  modalCloseButtonText: { fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
});
