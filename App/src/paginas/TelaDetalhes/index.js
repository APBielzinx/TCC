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

  const handleTextInputChange = (inputText) => {
    setText(inputText);
  };

  async function avaliacao() {
    try {
      const token = await AsyncStorage.getItem("token");
      const idUsuario = await AsyncStorage.getItem("id");



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
          setParkLocation(parkCoordinates);
        }
      })
      .catch(error => console.error('Erro ao obter informações de localização:', error));
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

  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    // Recupere o estado do AsyncStorage ao iniciar o componente
    recuperarEstadoFavorito();
  }, []);

  const recuperarEstadoFavorito = async () => {
    try {
      const estadoFavorito = await AsyncStorage.getItem('estadoFavorito');

      if (estadoFavorito !== null) {
        setFavoritado(JSON.parse(estadoFavorito));
      }
    } catch (error) {
      console.error('Erro ao recuperar o estado favorito:', error);
    }
  };

  const salvarEstadoFavorito = async () => {
    try {
      // Salve o estado do favorito no AsyncStorage
      await AsyncStorage.setItem('estadoFavorito', JSON.stringify(favoritado));
    } catch (error) {
      console.error('Erro ao salvar o estado favorito:', error);
    }
  };

  const favorito = () => {
    // Alternar o estado de favorito quando o botão for pressionado
    setFavoritado(!favoritado);
  };

  // Chame a função de salvar sempre que o estado do favorito mudar
  useEffect(() => {
    salvarEstadoFavorito();
  }, [favoritado]);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView>
        <TouchableOpacity style={styles.botaopular} onPress={() => navigation.navigate("TelaInicial")}>
          <Text style={{ color: '#000', fontSize: 25, left: 15, marginTop: 60 }}>
            <Icon name="leftcircle" size={37} color='#17A558' /> {route.params.lazer && route.params.lazer.nome
            ? route.params.lazer.nome
            : route.params.nome}
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

        <View style={styles.container}>
          <Stars
            default={2.5}
            count={5}
            half={true}
            starSize={30}
            fullStar={<Iconsss name={'star'} style={[styles.myStarStyle]} />}
            emptyStar={<Iconsss name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
            halfStar={<Iconsss name={'star-half'} style={[styles.myStarStyle]} />}
          />

          <TouchableOpacity onPress={() => { favoritos(route.params); favorito();}}>

            <Icon
            name={favoritado ? 'heart' : 'hearto'} // Use 'heart' quando favoritado, 'hearto' quando não favoritado
            size={27}
            style={{ marginTop: -26, left: 350, color: favoritado ? 'red' : 'black' }} // Mude a cor para vermelho quando favoritado, preto quando não favoritado
          />
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

        <View
          style={{
            backgroundColor: '#B1D3C1',
            marginTop: 10,
            borderRadius: 35,
            width: 365,
            height: 230,
            marginLeft: 19
          }}
        >
          <Text
            style={{
              marginLeft: 120,
              marginTop: 22,
              fontSize: 25,
            }}
          >Avaliações</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#17A558',
            marginTop: 8,
            borderRadius: 35,
            width: 135,
            height: 60,
            marginLeft: 135
          }}
          onPress={maps}
        >
          <Text style={{ marginLeft: 20, marginTop: 18, fontSize: 18, color: '#fff' }}>Ir agora</Text>
          <Icon name="rightcircle" size={25} color='#fff' style={{ marginLeft: 90, marginTop: -20 }} />
        </TouchableOpacity>

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
