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

export default function TelaDetalhes({ route }) {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [parkLocation, setParkLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [dados, setDados] = useState([]);


  const handleTextInputChange = (inputText) => {
    setText(inputText);
  };

  async function avaliacao() {
    try {
      const token = await AsyncStorage.getItem("token");
      const idUsuario = await AsyncStorage.getItem("id");

        console.log("oi")

      if (token) {
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        };

        const response = await fetch('https://tcc-production-e100.up.railway.app/api/avaliacao', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            "comentario": text,
            "pontuacao":5.0,
            "dataAvaliacao": "2023-01-31",
            "usuario": {
              "idUsuario": idUsuario,
            },
            "lazer": {
              "idLazer": route.params.idLazer
            }
          })
        });

        if (response.status === 200) {
          console.log("adicionado com sucesso");
        } else if (response.status === 400) {
          Alert.alert("isso já está na sua lista de favoritos");
          console.error("Erro na solicitação:", response.status);
        }
      } else {
        console.log("Token não encontrado em AsyncStorage.");
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }

  async function buscarAvaliacao() {
    try {
      const token = await AsyncStorage.getItem("token");

        console.log("oi")

      if (token) {
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        };

        const response = await fetch('https://tcc-production-e100.up.railway.app/api/avaliacao/parque/'+route.params.idLazer, {
          method: 'GET',
          headers: headers,
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log("Dados da resposta:", data);
          setDados(data)
        } else {
          console.error("Erro na solicitação:", response.status);
        }
      } else {
        console.log("Token não encontrado em AsyncStorage.");
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }

  buscarAvaliacao()

  useEffect(() => {
    fetch(`https://nominatim.openstreetmap.org/search?q=${route.params.nome}&format=json`)
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
  }, [route.params.nome]);

  useEffect(() => {
    fetch(`https://nominatim.openstreetmap.org/search?q=${route.params.nome}&format=json`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const userCoordinates = {
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
          };
        }
      })
      .catch();
  }, [route.params.nome]);

  const maps = () => {
    if (!parkLocation) {
      Alert.alert('Erro', 'As informações de localização do parque não estão disponíveis.');
      return;
    }

    InAppBrowser.open(`https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${parkLocation.latitude},${parkLocation.longitude}`);
  };

  async function favoritos(data) {
    console.log("oi");
    try {
      const token = await AsyncStorage.getItem("token");
      const idUsuario = await AsyncStorage.getItem("id");

      if (token) {
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        };

        const response = await fetch('https://tcc-production-e100.up.railway.app/api/favorito', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            "usuario": {
              "idUsuario": idUsuario,
            },
            "lazer": {
              "idLazer": data.idLazer
            }
          })
        });

        if (response.status === 200) {
          console.log("adicionado com sucesso");
        } else if (response.status === 400) {
          Alert.alert("isso já está na sua lista de favoritos");
          console.error("Erro na solicitação:", response.status);
        }
      } else {
        console.log("Token não encontrado em AsyncStorage.");
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }

  const handleBackNavigation = () => {
    if (route.params.categoria === 'parque') {
      navigation.navigate('TelaParques');
    } else {
      navigation.navigate('TelaLazer'); // Substitua 'TelaLazer' pelo nome correto da tela de lazer
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <TouchableOpacity style={styles.botaopular} onPress={handleBackNavigation}>
          <Text style={{ color: '#000', fontSize: 25, left: 15, marginTop: 60 }}>
            <Icon name="leftcircle" size={37} color='#17A558' /> {route.params.lazer && route.params.lazer.nome
            ? route.params.lazer.nome
            : route.params.nome}
          </Text>
        </TouchableOpacity>

        <ScrollView>

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


          <TouchableOpacity onPress={() => favoritos(route.params)}>
            <Icon name="hearto" size={27} style={{ marginTop: 6, left: 350 }} />
          </TouchableOpacity>


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
          > {route.params.lazer && route.params.lazer.descricao
            ? route.params.lazer.descricao
            : route.params.descricao}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#B1D3C1',
            marginTop: 8,
            borderRadius: 35,
            width: 365,
            height: 80,
            marginLeft: 19,
          }}
        >
          <Text
            style={{
              marginLeft: 20,
              marginTop: 15,
              fontSize: 15,
            }}
          >Digite sua opinião:</Text>
          <TextInput style={{ marginLeft: 20, marginTop: 7, width: 90 }} placeholder='Escreva aqui' onChangeText={handleTextInputChange} value={text} />
          <TouchableOpacity onPress={avaliacao}><Icon name="rightcircle" size={30} color='#17A558' style={{ marginLeft: 290, marginTop: -40 }} /></TouchableOpacity>
        </View>


          <Text
            style={{
              marginLeft: 140,
              marginTop: 22,
              fontSize: 25,
            }}
          >Avaliações</Text>

            {dados.map((avaliacao, index) => (
              <View  style={{
                backgroundColor: '#B1D3C1',
                borderRadius: 35,
                padding: 10,
                flexDirection: 'list',
                alignItems: 'center',
                marginLeft: 10,
                flexShrink: 1 ,
                marginTop: 10
              }}>
                 <Text key={index} style={{fontSize: 18}}>{avaliacao.usuario.email}</Text>
                 <Text style={{fontSize: 10,flexShrink: 1,flexWrap: 'wrap'}}>Comentario: {avaliacao.comentario}</Text>
              </View>
           
           
          ))}


        

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
            <Marker coordinate={parkLocation} title={route.params.nome} />
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
