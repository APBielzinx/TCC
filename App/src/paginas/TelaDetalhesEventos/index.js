import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import Routes from '../../componentes/menu/routes';
import Icon from 'react-native-vector-icons/AntDesign';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Stars from 'react-native-stars';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Favoritar from '../../componentes/favoritar cor'
import MapView, { Marker, Polyline } from 'react-native-maps';
import moment from 'moment';

export default function TelaDetalhesEventos({ route }) {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [parkLocation, setParkLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [dados, setDados] = useState([]);
  const [idUsuario, setIdUsuario] = useState();

  const handleTextInputChange = (inputText) => {
    setText(inputText);
  };

 console.log(route.params.local)

  useEffect(() => {
    fetch(`https://nominatim.openstreetmap.org/search?q=${route.params.local}&format=json`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const parkCoordinates = {
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
          };
          setParkLocation(parkCoordinates);
        }
      })
      .catch(error => console.error('Erro ao obter informações de localização:', error));
  }, [route.params.nomeEvento]);

  useEffect(() => {
    fetch(`https://nominatim.openstreetmap.org/search?q=${route.params.local}&format=json`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const userCoordinates = {
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
          };

        }
      })
      .catch(error => console.error('Erro ao obter informações de localização:', error));
  }, [route.params.nomeEvento]);

  const maps = () => {
    if (!parkLocation) {
      Alert.alert('Erro', 'As informações de localização do parque não estão disponíveis.');
      return;
    }

    InAppBrowser.open(`https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${parkLocation.latitude},${parkLocation.longitude}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtém o token de AsyncStorage
        const token = await AsyncStorage.getItem("token");
        const idUsuario = await AsyncStorage.getItem("id");

        if (token) {
          // Construa o cabeçalho Authorization
          const headers = {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          };

          // Faça a solicitação usando o cabeçalho personalizado
          const response = await fetch('https://tcc-production-e100.up.railway.app/api/favorito/' + idUsuario, {
            method: 'GET', // ou outro método HTTP
            headers: headers
          });

          if (response.status === 200) {
            const data = await response.json();
            console.log("Dados da resposta:", data);
            setDados(data);
          } else {
            console.error("Erro na solicitação:", response.status, idUsuario);
          }
        } else {
          console.log("Token não encontrado em AsyncStorage.");
        }
      } catch (error) {
        console.error("Erro ao fazer a solicitação:", error);
      }
    }

    fetchData();
  }, []);

  const tenhoInteresse = () => {
    if (idUsuario) {
      alert("BOTÃO PRESSIONADO");
      console.log("ID DO USUÁRIO:" + idUsuario);
    } else {
      console.log("ID do usuário não está disponível.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView>
        <TouchableOpacity style={styles.botaopular} onPress={() => navigation.navigate("TelaEventos")}>
          <Text style={{ color: '#000', fontSize: 25, left: 15, marginTop: 60 }}>
            <Icon name="leftcircle" size={37} color='#17A558' /> {route.params.nomeEvento}
          </Text>
        </TouchableOpacity>

        <View>
          <Image
            source={{ uri: route.params.lazer && route.params.lazer.imagem
              ? route.params.lazer.imagem
              : route.params.imagem }}
            style={{
              width: 380,
              height: 180,
              marginTop: 9,
              marginLeft: 15,
              borderRadius: 20,
              justifyContent: 'center', 
              alignItems: 'center'
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 ,marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <Text>Data de Início: </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{moment(route.params.dataInicio, "YYYYMMDD").format("DD/MM/YYYY")}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>Data de Término: </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{moment(route.params.dataTermino, "YYYYMMDD").format("DD/MM/YYYY")}</Text>
          </View>
        </View>


        <View style={{ flexDirection: 'row'}}>
          <Text onPress={tenhoInteresse} style={{marginLeft: 32}}>Tenho interesse em ir</Text>
          <TouchableOpacity onPress={tenhoInteresse}>
            <Icon name="like2" size={27} style={{ marginTop: -11, left: 10 }} />
          </TouchableOpacity>
        </View>
       

        <View
          style={{
            backgroundColor: '#B1D3C1',
            marginTop: 15,
            borderRadius: 35,
            width: 365,
            height: 130,
            marginLeft: 19,
          }}
        >
          <Text
            style={{
              marginLeft: 20,
              marginTop: 15,
              fontSize: 15,
            }}
          > {route.params.descricao}
          </Text>
        </View>

        {/* Adicione o componente de mapa */}
        {parkLocation && (
          <MapView
            style={{ height: 200, marginVertical: 10 }}
            initialRegion={{
              latitude: parkLocation.latitude,
              longitude: parkLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={parkLocation} title={route.params.nomeEvento} />
            {userLocation && (
              <Polyline
                coordinates={[
                  { latitude: userLocation.latitude, longitude: userLocation.longitude },
                  { latitude: parkLocation.latitude, longitude: parkLocation.longitude },
                ]}
                strokeColor="#000" // cor da linha
                strokeWidth={2} // largura da linha
              />
            )}
          </MapView>
        )}

      </ScrollView>

      <Text>{'\n'}{'\n'}{'\n'}{'\n'}</Text>

      <Routes />
    </View>
  );
}
