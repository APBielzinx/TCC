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
import { date } from 'yup';

export default function TelaDetalhesEventos({ route }) {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [parkLocation, setParkLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [dados, setDados] = useState([]);

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
  console.log(route.params)
  async function tenhoInteresse(){
   
   const idUsuario = await AsyncStorage.getItem("id")
   const token = await AsyncStorage.getItem("token");
    
 

    if(token){
      try{
        const dados = {
          "idEvento": route.params.idEvento,
          "nomeEvento": route.params.nomeEvento,
          "descricao": route.params.descricao,
          "local": route.params.local,
          "dataInicio": route.params.dataInicio,
          "dataTermino": route.params.dataTermino,
          "status": route.params.status,
          "imagem": route.params.imagem,
          "usuarios": [
            {
              "idUsuario": idUsuario,
            }
          ]
        }
        const headers = {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const jsonData = JSON.stringify(dados);
        const response = await fetch('https://tcc-production-e100.up.railway.app/api/evento/queroir/'+ idUsuario, {
          method: 'POST', // ou outro método HTTP
          headers: headers,
          body:jsonData
        });
  
        if (response.status === 201) {
          
          alert("Adicionado com sucesso")

        } else if(response.status === 400){
          alert("você já tem esse evento adicionado ao quero ir")

        }
      } catch(error){
        console.error("Erro ao fazer a solicitação:", error);

      }
    }else {
      console.log("Token não encontrado em AsyncStorage.");
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

        <View style={{ flexDirection: 'row'}}>
        <View style={{ flexDirection: 'list', justifyContent: 'left', alignItems: 'left', marginLeft: 20 ,marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <Text>Data de Início: {moment(route.params.dataInicio, "YYYYMMDD").format("DD/MM/YYYY")}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>Data de Término: {moment(route.params.dataTermino, "YYYYMMDD").format("DD/MM/YYYY")}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'list', justifyContent: 'left', alignItems: 'left', marginLeft: 20 ,marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
          <Text>Hora de Inicio: {route.params.horaInicio}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>Hora de Término: {route.params.horaTermino}</Text>
          </View>
        </View>

        <Text onPress={tenhoInteresse} style={{marginLeft: -355, marginTop: 60}}>Tenho interesse em ir</Text>
          <TouchableOpacity onPress={tenhoInteresse}>
            <Icon name="like2" size={27} style={{ marginTop: 50, left: 5 }} />
          </TouchableOpacity>
        </View>


       

        <View
          style={{
            backgroundColor: '#B1D3C1',
            marginTop: 10,
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
