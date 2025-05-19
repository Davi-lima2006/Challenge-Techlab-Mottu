import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BikeContext = createContext();

export function BikeProvider({ children }) {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const carregarBikes = async () => {
      try {
        const bikesSalvas = await AsyncStorage.getItem('bikes');
        if (bikesSalvas) {
          setBikes(JSON.parse(bikesSalvas));
        } else {
          setBikes([
            { placa: 'ABC1234', status: 'Disponível', servicos: ['Manutenção (pontual)'] },
            { placa: 'XYZ5678', status: 'Em Manutenção', servicos: ['Revisão'] },
          ]);
        }
      } catch (error) {
        console.log('Erro ao carregar motos:', error);
      }
    };
    carregarBikes();
  }, []);

  useEffect(() => {
    const salvarBikes = async () => {
      try {
        await AsyncStorage.setItem('bikes', JSON.stringify(bikes));
      } catch (error) {
        console.log('Erro ao salvar motos:', error);
      }
    };
    salvarBikes();
  }, [bikes]);

  const updateBike = (placa, dadosAtualizados) => {
    setBikes((prevBikes) =>
      prevBikes.map((bike) =>
        bike.placa === placa ? { ...bike, ...dadosAtualizados } : bike
      )
    );
  };

  const addBike = (novaBike) => {
    const existe = bikes.some((bike) => bike.placa === novaBike.placa);
    if (existe) {
      Alert.alert('Atenção', 'Já existe uma moto cadastrada com essa placa.');
      return;
    }
    setBikes((prevBikes) => [...prevBikes, novaBike]);
  };

  const removeBike = (placa) => {
    Alert.alert(
      'Excluir Moto',
      'Tem certeza que deseja excluir esta moto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setBikes((prevBikes) => prevBikes.filter((bike) => bike.placa !== placa));
          },
        },
      ]
    );
  };

  return (
    <BikeContext.Provider value={{ bikes, updateBike, addBike, removeBike }}>
      {children}
    </BikeContext.Provider>
  );
}
