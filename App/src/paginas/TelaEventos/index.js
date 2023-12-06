import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import Routes from '../../componentes/menu/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

export default function TelaLazer({ route }){
  const navigation = useNavigation();
  const [dados, setDados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showLocalModal, setShowLocalModal] = useState(false);
  const [locaisDisponiveis, setLocaisDisponiveis] = useState([]);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [updatedData, setupdatedData] = useState(null);


  const currentDate = new Date(); // Data atual

const filtrarEventosPassados = () => {
  const eventosFuturos = dados.filter(evento => {
    const ano = parseInt(evento.dataInicio.slice(0, 4), 10);
    const mes = parseInt(evento.dataInicio.slice(4, 6), 10) - 1; // Mês começa do zero (janeiro é 0)
    const dia = parseInt(evento.dataInicio.slice(6, 8), 10);
    
    const eventoDate = new Date(ano, mes, dia);

    return eventoDate >= currentDate;
  });
  setFilteredData(eventosFuturos);
};

useEffect(() => {
  fazerSolicitacaoComToken();
}, []);

useEffect(() => {
  filtrarEventosPassados(); // Chama a função de filtro quando os dados são atualizados
}, [dados]); 

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
    
    if (value === 'data') {
      filtrarPorData();
    } else if (value === 'distanciaProxima') {
      filtrarPorDistancia('distanciaProxima');
    } else if (value === 'distanciaLonge') {
      filtrarPorDistancia('distanciaLonge');
    } else if (value === 'local') {
      setShowLocalModal(true); // Exibir o modal de locais ao selecionar "Local"
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
  
  const filtrarPorDistancia = (selectedFilter) => {
    let dadosOrdenados;
    
    if (selectedFilter === 'distanciaProxima') {
      dadosOrdenados = [...dados].sort((a, b) => parseFloat(a.distanciaUsuario) - parseFloat(b.distanciaUsuario));
    } else if (selectedFilter === 'distanciaLonge') {
      dadosOrdenados = [...dados].sort((a, b) => parseFloat(b.distanciaUsuario) - parseFloat(a.distanciaUsuario));
    } else {
      dadosOrdenados = [...dados];
    }
    
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

      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.botaopular} onPress={() => navigation.navigate('TelaInicial')}>
              <Text style={{ color: '#000', fontSize: 35, left: 30, marginTop: 60 }}>
                <Icon name="leftcircle" size={40} color='#17A558' />  Eventos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: '#17A558', borderRadius: 25, padding: 5, width: '25%', color: '#FFF', left: 100, height:35, marginTop: 65 }} onPress={() => setShowModal(true)}>
            <Text style={{color: '#FFF', fontSize: 17, marginTop: 1, left: 12  }}>
            <Icon name="filter" size={25} color='#FFF' style={{right: 15}} />Filtro</Text>
          </TouchableOpacity>
      </View>
      
        

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 25, padding: 20, width: '80%' }}>
            <FlatList
              data={[
                { label: 'Data mais próxima', value: 'data' },
                { label: 'Local mais próximo', value: 'distanciaProxima' },
                { label: 'Local mais longe', value: 'distanciaLonge' },
                { label: 'Local', value: 'local' },
              ]}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#E5E5E5',
                    padding: 15,
                    borderRadius: 8,
                    marginBottom: 10,
                    alignItems: 'center',
                  }}
                  onPress={() => handleFilterSelect(item.value)}
                >
                  <Text style={{ fontSize: 16 }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#FF6347',
                padding: 15,
                borderRadius: 8,
                marginTop: 10,
                alignItems: 'center',
              }}
              onPress={() => setShowModal(false)}
            >
              <Text style={{ fontSize: 16, color: '#FFF' }}>Fechar</Text>
            </TouchableOpacity>
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
    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, width: '80%' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Escolha um Local</Text>
      <FlatList
        data={locaisDisponiveis}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: '#E5E5E5',
              padding: 15,
              borderRadius: 8,
              marginBottom: 10,
              alignItems: 'center',
            }}
            onPress={() => handleLocalSelect(item)}
          >
            <Text style={{ fontSize: 16 }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#FF6347',
          padding: 15,
          borderRadius: 8,
          marginTop: 10,
          alignItems: 'center',
        }}
        onPress={() => setShowLocalModal(false)}
      >
        <Text style={{ fontSize: 16, color: '#FFF' }}>Fechar</Text>
      </TouchableOpacity>
    </View>
  </View>
      </Modal>

        <ScrollView>

        {(filteredData.length > 0 ? filteredData : dados).map((evento, index) => (
          <TouchableOpacity
            key={evento.id} // ou qualquer propriedade única do evento
            style={{ marginBottom: 20 }}
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
              <Image source={{ uri: evento.imagem }} style={styles.Imagens} />
              <View style={{ marginLeft: 10, flexShrink: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                    flexShrink: 1,
                    flexWrap: 'wrap',
                    fontWeight: 'bold' // Permite que o texto quebre em várias linhas
                  }}
                >
                  {evento.nomeEvento}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    flexShrink: 1,
                    flexWrap: 'wrap',
                    fontWeight: 'bold' // Permite que o texto quebre em várias linhas
                  }}
                >
                 Descrição: {evento.descricao}
                </Text>
                <Text style={{ fontSize: 10, marginTop: 5, fontWeight: 'bold' }}>
                  Distância: {evento.distanciaUsuario} km da sua residência
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                  Data de Início: {moment(evento.dataInicio, "YYYYMMDD").format("DD/MM/YYYY")}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                  Data de Término: {moment(evento.dataTermino, "YYYYMMDD").format("DD/MM/YYYY")}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
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