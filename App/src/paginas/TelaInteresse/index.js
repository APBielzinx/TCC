import React,{useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import Routes from '../../componentes/menu/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

export default function TelaInteresse() {
  const navigation = useNavigation();
  const [dados, setDados] = useState([]);
  const [reloadData, setReloadData] = useState(false); // Estado para controlar a recarga de dados

  async function retirarQueroIr(id) {
    const idUsuario = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch(`https://tcc-production-e100.up.railway.app/api/evento/usuario/${idUsuario}/evento/${id}`, {
        method: 'DELETE',
        headers: headers
      });

      if (response.status === 204) {
        alert("Deletado com sucesso");
        setReloadData(!reloadData); // Atualiza o estado para recarregar os dados
      } else {
        console.error("Erro na solicitação:", response.status, idUsuario);
      }
    } else {
      console.log("Token não encontrado em AsyncStorage.");
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem("token");
        const idUsuario = await AsyncStorage.getItem("id");

        if (token) {
          const headers = {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          };

          const response = await fetch('https://tcc-production-e100.up.railway.app/api/evento/usuario/' + idUsuario, {
            method: 'GET',
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
  }, [reloadData]);
  
    return(
      <View style= {{flex:1, backgroundColor: '#FFF'}}>
     
                <TouchableOpacity style={styles.botaopular} onPress={ () => navigation.navigate('TelaInicial')} >
                <Text style={{color: '#000',fontSize: 35, left: 30, marginTop: 60}}><Icon name="leftcircle" size={40} color='#17A558'/>  Quero ir</Text>
            </TouchableOpacity>

            <ScrollView>

            {dados.map((item, index) => (
        <TouchableOpacity
          key={item.idEvento}
          style={{ marginBottom: 20 }}
          onPress={ () => navigation.navigate('TelaDetalhesEventos',item)}
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
             <Image  source={{uri: item.imagem}} style={styles.Imagens} />
                         <TouchableOpacity style={{marginTop: -90, left: 170}} onPress={() => retirarQueroIr(item.idEvento)} >
            <Icon name="delete" size={35} color='#17A558'/>
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
              {item.nomeEvento}
            </Text>

            <Text
              style={{
                fontSize: 10,
                flexShrink: 1,
                flexWrap: 'wrap',
              }}
            >
              {item.descricao}
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