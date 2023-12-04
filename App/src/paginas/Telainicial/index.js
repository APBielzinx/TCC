import React, { useState, useEffect } from 'react';
import {View, Image, TextInput, TouchableOpacity, Text, Alert, ScrollView} from 'react-native';
import Iconss from 'react-native-vector-icons/FontAwesome';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Carrosel from '../../componentes/carrosel';
import styles from './style';
import Routes from '../../componentes/menu/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';


export default function TelaInicial(){ 
  const navigation = useNavigation();


const [dados, setDados] = useState([]);

useEffect(() => {
  async function fetchData() {
    try {
      // Obtém o token de AsyncStorage
      const token = await AsyncStorage.getItem("token");

      if (token) {
        // Construa o cabeçalho Authorization
        const headers = {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // Faça a solicitação usando o cabeçalho personalizado
        const response = await fetch('https://tcc-production-e100.up.railway.app/api/lazer', {
          method: 'GET',
          headers: headers
        });

        if (response.status === 200) {
          const data = await response.json();
          setDados(data);
          console.log(data);
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

  fetchData();
}, []); // O segundo argument

      return(
        <View style= {{flex:1, backgroundColor: '#FFF'}}>
          <ScrollView>
          <View style={styles.view}>
                <TouchableOpacity onPress={ () => navigation.navigate('Usuario')}><Image source= {require('../../Imagens/perfil-de-usuario.jpg')} style={styles.Imagem} /></TouchableOpacity>
                <TouchableOpacity  style={{width: 30}} onPress={ () => navigation.navigate('Pesquisa')}><Icon name="search1"size={30} color='#17A558' style={{marginLeft: 300, marginTop: 11, width: 30}}/></TouchableOpacity>
            </View>

            <Carrosel></Carrosel> 

            <View style={styles.views}>
            <TouchableOpacity style={{backgroundColor: '#B1D3C1', width: 70, height: 65, marginLeft: 45, marginTop: 25, borderRadius: 20}} onPress={ () => navigation.navigate('TelaParques') }><Iconsss name="tree-outline" size={40} color='#526856' style={{marginLeft: 15, marginTop: 12}}/></TouchableOpacity> 
            <TouchableOpacity style={{backgroundColor: '#B1D3C1', width: 70, height: 65, marginLeft: 50, marginTop: 25, borderRadius: 20}} onPress={ () => navigation.navigate('TelaLazer') }><Iconss name="bicycle" size={40} color='#526856' style={{marginLeft: 10, marginTop: 12}}/></TouchableOpacity> 
            <TouchableOpacity style={{backgroundColor: '#B1D3C1', width: 70, height: 65, marginLeft: 50, marginTop: 25, borderRadius: 20}} onPress={ () => navigation.navigate('TelaEventos') }><Iconsss name="calendar-star" size={40} color='#526856' style={{marginLeft: 15, marginTop: 12}}/></TouchableOpacity>
            </View>

            <View style={styles.vieww}>
              <Text style={{marginLeft: 38}}>Parques</Text>
              <Text style={{marginLeft: 75}}>Locais</Text>
              <Text style={{marginLeft: 77}}>Eventos</Text>
            </View>

            <Text style={{fontSize:30, marginTop: 30, marginLeft: 55}}>Parques bem avaliados</Text>
 

            <Swiper autoplay loop autoplayTimeout={5} style={{height:250}}>
      {dados.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            height: 160,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 25,
          }}
          onPress={() => navigation.navigate('TelaDetalhes', item)}>
          <View
            style={{
              backgroundColor: '#B1D3C1',
              borderRadius: 35,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={{uri: item.imagem}} style={styles.Imagens} />
            <View style={{ marginLeft: 10, flexShrink: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 5,
                  flexShrink: 1,
                  flexWrap: 'wrap',
                }}>
                {item.nome}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  flexShrink: 1,
                  flexWrap: 'wrap',
                }}>
                {item.descricao}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </Swiper>
            
            <Text>{'\n'}{'\n'}{'\n'}</Text>
        

            </ScrollView>
            
            <Routes></Routes>
        </View>
      );
}

