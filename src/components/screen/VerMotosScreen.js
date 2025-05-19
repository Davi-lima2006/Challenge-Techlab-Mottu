import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BikeContext } from '../../context/BikeContext';

export default function VerMotosScreen({ navigation }) {
  const { bikes, removeBike } = useContext(BikeContext);
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
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.placaRow}
        onPress={() => toggleExpand(index)}
      >
        <Text style={styles.placa}>{item.placa}</Text>
        <Ionicons
          name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      {expandedIndex === index && (
        <View style={styles.details}>
          <Text style={styles.detailText}>Marca: {item.marca || '-'}</Text>
          <Text style={styles.detailText}>Modelo: {item.modelo || '-'}</Text>
          <Text style={styles.detailText}>Chassi: {item.chassi || '-'}</Text>
          <Text style={styles.detailText}>Motor: {item.motor || '-'}</Text>
          <Text style={styles.detailText}>IMEI IoT: {item.imeiIot || '-'}</Text>
          <Text style={styles.detailText}>RFID: {item.rfid || '-'}</Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.servicoButton}
              onPress={() => verServicos(item.servicos)}
            >
              <Ionicons name="construct-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Ver Serviços</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
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
    <View style={styles.container}>
      <Text style={styles.title}>Motos Cadastradas</Text>
      <FlatList
        data={bikes}
        keyExtractor={(item, index) => item.placa || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma moto cadastrada ainda.</Text>
        }
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Serviços</Text>
            <ScrollView style={{ maxHeight: 250, marginVertical: 10 }}>
              {servicosModal.map((servico, i) => (
                <Text key={i} style={styles.modalText}>• {servico}</Text>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00FF00',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: '#00FF00',
    borderWidth: 1,
  },
  placaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placa: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  details: {
    marginTop: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#ccc',
    marginVertical: 2,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  servicoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cc0000',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#ccc',
    marginVertical: 4,
  },
  modalCloseButton: {
    backgroundColor: '#00FF00',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
