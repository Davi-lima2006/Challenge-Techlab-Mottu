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
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BikeContext } from '../../context/BikeContext';
import { ThemeContext } from '../screen/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function VerMotosScreen({ navigation }) {
  const { bikes, removeBike } = useContext(BikeContext);
  const { isDark } = useContext(ThemeContext);

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [servicosModal, setServicosModal] = useState([]);

  const toggleExpand = (index) => setExpandedIndex(expandedIndex === index ? null : index);

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
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDark ? 'rgba(20,20,20,0.95)' : 'rgba(245,245,245,0.95)',
          borderColor: isDark ? '#00FF00' : '#006400',
          shadowColor: isDark ? '#00FF00' : '#000',
        },
      ]}
      onPress={() => toggleExpand(index)}
      activeOpacity={0.8}
    >
      <View style={styles.placaRow}>
        <Text style={[styles.placa, { color: isDark ? '#fff' : '#006400' }]}>{item.placa}</Text>
        <Ionicons
          name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={isDark ? '#fff' : '#006400'}
        />
      </View>

      {expandedIndex === index && (
        <View style={styles.details}>
          {['Marca','Modelo','Chassi','Motor','IMEI IoT','RFID'].map((label, i) => (
            <Text key={i} style={[styles.detailText, { color: isDark ? '#ccc' : '#333' }]}>
              {label}: {item[label.toLowerCase()] || '-'}
            </Text>
          ))}

          <View style={styles.buttonsRow}>
            <LinearGradient
              colors={isDark ? ['#0066ff','#3399ff'] : ['#3399ff','#66ccff']}
              style={styles.buttonGradient}
            >
              <TouchableOpacity style={styles.servicoButton} onPress={() => verServicos(item.servicos)}>
                <Ionicons name="construct-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Ver Serviços</Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={isDark ? ['#cc0000','#ff4444'] : ['#ff4444','#ff6666']}
              style={styles.buttonGradient}
            >
              <TouchableOpacity style={styles.deleteButton} onPress={() => removerMoto(item.placa)}>
                <Ionicons name="trash-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../../assets/motinho.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={[styles.overlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)' }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
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
            <View style={[styles.modalContent, { backgroundColor: isDark ? '#111' : '#fff', shadowColor: '#000' }]}>
              <Text style={[styles.modalTitle, { color: isDark ? '#00FF00' : '#006400' }]}>Serviços</Text>
              <ScrollView style={{ maxHeight: 250, marginVertical: 10 }}>
                {servicosModal.map((servico, i) => (
                  <Text key={i} style={[styles.modalText, { color: isDark ? '#ccc' : '#333' }]}>
                    • {servico}
                  </Text>
                ))}
              </ScrollView>
              <LinearGradient
                colors={isDark ? ['#00FF00','#66FF66'] : ['#339933','#66cc66']}
                style={styles.modalButtonGradient}
              >
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
                  <Text style={[styles.modalCloseButtonText, { color: isDark ? '#000' : '#fff' }]}>Fechar</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 4 },
  list: { paddingBottom: 20 },
  card: { borderRadius: 15, padding: 20, marginBottom: 15, borderWidth: 1, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  placaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  placa: { fontSize: 22, fontWeight: 'bold' },
  details: { marginTop: 12 },
  detailText: { fontSize: 16, marginVertical: 2 },
  emptyText: { fontSize: 16, textAlign: 'center', marginTop: 50 },
  buttonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  buttonGradient: { flex: 1, marginHorizontal: 5, borderRadius: 25 },
  servicoButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 25 },
  deleteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 25 },
  buttonText: { color: '#fff', marginLeft: 6, fontWeight: 'bold', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalContent: { borderRadius: 20, padding: 25, width: '100%', maxWidth: 400, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 10 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  modalText: { fontSize: 16, marginVertical: 4 },
  modalButtonGradient: { borderRadius: 25, marginTop: 15 },
  modalCloseButton: { paddingVertical: 12, borderRadius: 25, alignItems: 'center' },
  modalCloseButtonText: { fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
});
