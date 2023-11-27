import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import Routes from '../../componentes/menu/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

export default function TelaLazer({ route }){
  const navigation = useNavigation();
  const [dados, setDados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showLocalModal, setShowLocalModal] = useState(false);
  const [locaisDisponiveis, setLocaisDisponiveis] = useState([]);
  const [selectedLocal, setSelectedLocal] = useState(null);



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

        const response = await fetch('https://tcc-production-e100.up.railway.app/api/evento', {
          method: 'GET',
          headers: headers
        });

        if (response.status === 200) {
          const data = await response.json();
          const userLatitude = parseFloat(await AsyncStorage.getItem('latitude'));
          const userLongitude = parseFloat(await AsyncStorage.getItem('longetude'));

          const locais = data.map(evento => evento.local);
          const locaisUnicos = [...new Set(locais)]; // Remover duplicatas
          setLocaisDisponiveis(locaisUnicos);

          console.log("Locais Disponíveis:", locaisDisponiveis);
          console.log("Dados Atualizados:", updatedData);


          await Promise.all(data.map(async (evento) => {
            const enderecoEvento = encodeURI(evento.local);

            const responseLocal = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${enderecoEvento}`);
            const dadosLocal = await responseLocal.json();

            if (dadosLocal && dadosLocal.length > 0) {
              const latitudeEvento = parseFloat(dadosLocal[0].lat);
              const longitudeEvento = parseFloat(dadosLocal[0].lon);

              const distancia = calcularDistancia(userLatitude, userLongitude, latitudeEvento, longitudeEvento);
              evento.distanciaUsuario = distancia.toFixed(2);

              return evento;
            } else {
              evento.distanciaUsuario = 'Indisponível';
              return evento;
            }
          })).then(updatedData => {
            setDados(updatedData);
          });
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


  const handleFilterSelect = (value) => {
    setSelectedFilter(value);
    setShowModal(false);
  
    // Lógica de aplicação do filtro com base no valor selecionado
    if (value === 'data') {
      filtrarPorData();
    } else if (value === 'distancia') {
      filtrarPorDistancia();
    } else if (value === 'local') {
      filtrarPorLocal();
    }
  };

  const filtrarPorData = () => {
    const dadosOrdenados = [...dados].sort((a, b) => {
      const dataA = new Date(a.data);
      const dataB = new Date(b.data);
      return dataA - dataB;
    });
    setFilteredData(dadosOrdenados);
  };
  
  const filtrarPorDistancia = () => {
    const dadosOrdenados = [...dados].sort((a, b) => parseFloat(a.distanciaUsuario) - parseFloat(b.distanciaUsuario));
    setFilteredData(dadosOrdenados);
  };
  
  const filtrarPorLocal = (localSelecionado) => {
    if (localSelecionado) {
      const eventosFiltrados = dados.filter(evento => evento.local === localSelecionado);
      setFilteredData(eventosFiltrados);
    } else {
      setFilteredData([...dados]);
    }
  };
  const handleLocalSelect = (local) => {
    setSelectedLocal(local);
    setShowLocalModal(false);
    filtrarPorLocal(local);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      
        <TouchableOpacity style={styles.botaopular} onPress={() => navigation.navigate('TelaInicial')}>
          <Text style={{ color: '#000', fontSize: 35, left: 30, marginTop: 60 }}>
            <Icon name="leftcircle" size={40} color='#17A558' />  Eventos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text>Selecione um filtro</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 20 }}>
          <FlatList
              data={[
                { label: 'Data mais próxima', value: 'data' },
                { label: 'Distância', value: 'distancia' },
                { label: 'Local', value: 'local' },
              ]}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleFilterSelect(item.value)}>
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
          />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showLocalModal}
        onRequestClose={() => setShowLocalModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 20 }}>
            <FlatList
              data={locaisDisponiveis}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleLocalSelect(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

        <ScrollView>

        {(filteredData.length > 0 ? filteredData : dados).map((evento, index) => (
          <TouchableOpacity
            key={evento}
            style={{ marginBottom: 20 }} // Espaço entre os parques
            onPress={() => navigation.navigate('TelaDetalhesEventos', evento)}
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
                  marginTop: 6,
              }}
            >
              <View style={{ marginLeft: 10, flexShrink: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                    flexShrink: 1,
                    flexWrap: 'wrap', // Permite que o texto quebre em várias linhas
                  }}
                >
                  {evento.nomeEvento}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    flexShrink: 1,
                    flexWrap: 'wrap', // Permite que o texto quebre em várias linhas
                  }}
                >
                  {evento.descricao}
                </Text>
                <Text style={{ fontSize: 10, marginTop: 5 }}>
                  Distância: {evento.distanciaUsuario} km da sua residência
                </Text>
                <Text style={{ fontSize: 12 }}>
                  Data de Início: {evento.dataInicio} {/* Adicione aqui a data de início */}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  Local: {evento.local} {/* Adicione aqui a data de início */}
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