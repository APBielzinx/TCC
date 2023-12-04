import React,{useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import Routes from '../../componentes/menu/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

export default function TelaLazer(){
    const navigation = useNavigation();
    const [dados, setDados] = useState([]);

    async function ExcluirFavoritos(id){
      try {
        // Obtém o token de AsyncStorage
        const token = await AsyncStorage.getItem("token");
        console.log(id)

        if (token) {
          // Construa o cabeçalho Authorization
          const headers = {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          };

          // Faça a solicitação usando o cabeçalho personalizado
          const response = await fetch('https://tcc-production-e100.up.railway.app/api/favorito/' +id, {
            method: 'DELETE', // ou outro método HTTP
            headers: headers
          });

          if (response.status === 200) {
            alert("deletado com sucesso")
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
 

    useEffect(() => {
      async function fetchData() {
        try {
          // Obtém o token de AsyncStorage
          const idUsuario = await AsyncStorage.getItem("id");
          const token = await AsyncStorage.getItem("token");

  
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
    }, []); // O segundo argumento do useEffect é uma array de dependências, vazia significa que será executado uma vez na montagem
  
    return(
      <View style= {{flex:1, backgroundColor: '#FFF'}}>
     
                <TouchableOpacity style={styles.botaopular} onPress={ () => navigation.navigate('TelaInicial')} >
                <Text style={{color: '#000',fontSize: 35, left: 30, marginTop: 60}}><Icon name="leftcircle" size={40} color='#17A558'/>  Favoritos</Text>
            </TouchableOpacity>

            <ScrollView>

            {dados.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={{ marginBottom: 20 }}
          onPress={ () => navigation.navigate('TelaDetalhes',item)}
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
             <Image  source={{uri: item.lazer.imagem}} style={styles.Imagens} />
             <TouchableOpacity style={{marginTop: -100, left: 180}} onPress={() => ExcluirFavoritos(item.id)} >
            <Icon name="delete" size={30} color='#17A558'/>
            </TouchableOpacity>
             <View style={{ marginLeft: 10, flexShrink: 1 }}>
            <Text
              style={{
                fontSize: 18,
                    marginBottom: 5,
                    flexShrink: 1,
                    flexWrap: 'wrap',
              }}
            >
              {item.lazer.nome}
            </Text>

            <Text
              style={{
                fontSize: 10,
                flexShrink: 1,
                flexWrap: 'wrap',
              }}
            >
              {item.lazer.descricao}
            </Text>
          </View>
          </View>

        
        </TouchableOpacity>
      ))}


                </ScrollView>
                <Text>{'\n'}{'\n'}{'\n'}{'\n'}</Text>
 
            
        <Routes></Routes>
        </View>
        
    )
}