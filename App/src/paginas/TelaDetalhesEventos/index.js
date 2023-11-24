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
              borderRadius: 20
            }}
          />
        </View>

        <View style={{ flexDirection: 'row'}}>
              <Text>    Data de Início:        {route.params.dataInicio}</Text>
          <Text style={{marginLeft: 32}}>Tenho interesse em ir</Text>
            <TouchableOpacity>
              <Icon name="like2" size={27} style={{ marginTop: -11, left: 10 }} />
            </TouchableOpacity>
        </View>
        <Text>    Data de Término:   {route.params.dataTermino}</Text>

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
