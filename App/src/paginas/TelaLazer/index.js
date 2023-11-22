import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import Routes from '../../componentes/menu/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

export default function TelaLazer(){
  const navigation = useNavigation();
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fazerSolicitacaoComToken();
  }, []);

  async function fazerSolicitacaoComToken() {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        };

        const response = await fetch('https://tcc-production-e100.up.railway.app/api/lazer/lazer', {
          method: 'GET',
          headers: headers
        });

        if (response.status === 200) {
          const data = await response.json();

          const userLatitude = parseFloat(await AsyncStorage.getItem('latitude'));
          const userLongetude = parseFloat(await AsyncStorage.getItem('longetude'));

          data.forEach(lazer => {
            if (lazer.latitude && lazer.longetude) {
              const distancia = calcularDistancia(userLatitude, userLongetude, lazer.latitude, lazer.longetude);
              lazer.distanciaUsuario = distancia.toFixed(2); // Adicionando a propriedade 'distanciaUsuario' ao objeto do parque
            } else {
              lazer.distanciaUsuario = 'Indisponível';
            }
          });

          const ordenarPorProximidade = (lazer) => {
            return lazer.sort((a, b) => {
              if (a.distanciaUsuario === 'Indisponível') return 1;
              if (b.distanciaUsuario === 'Indisponível') return -1;
              return parseFloat(a.distanciaUsuario) - parseFloat(b.distanciaUsuario);
            });
          };

          setDados(ordenarPorProximidade(data));
        } else {
          console.error('Erro na solicitação:', response.status);
        }
      } else {
        console.log('Token não encontrado em AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
    }
  }

  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    // Cálculo da distância entre as coordenadas lat1, lon1 e lat2, lon2
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515; // Distância em milhas
    dist = dist * 1.609344; // Converter milhas para quilômetros

    return dist;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      
        <TouchableOpacity style={styles.botaopular} onPress={() => navigation.navigate('TelaInicial')}>
          <Text style={{ color: '#000', fontSize: 35, left: 30, marginTop: 60 }}>
            <Icon name="leftcircle" size={40} color='#17A558' />  Locais
          </Text>
        </TouchableOpacity>

        <ScrollView>

        {dados.map((item, index) => (
          <TouchableOpacity
            key={item.idLazer}
            style={{ marginBottom: 20 }} // Espaço entre os parques
            onPress={() => navigation.navigate('TelaDetalhes', item)}
          >
            <View
              style={{
                backgroundColor: '#B1D3C1',
                borderRadius: 35,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <Image source={{ uri: item.imagem }} style={styles.Imagens} />
              <View style={{ marginLeft: 10, flexShrink: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                    flexShrink: 1,
                    flexWrap: 'wrap', // Permite que o texto quebre em várias linhas
                  }}
                >
                  {item.nome}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    flexShrink: 1,
                    flexWrap: 'wrap', // Permite que o texto quebre em várias linhas
                  }}
                >
                  {item.descricao}
                </Text>
                <Text style={{ fontSize: 10, marginTop: 5 }}>
                  Distância: {item.distanciaUsuario} km da sua residência
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text>{'\n'}{'\n'}{'\n'}{'\n'}</Text>
      <Routes></Routes>
    </View>
  );
}