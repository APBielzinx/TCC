import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import Routes from '../menu/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pesquisa = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [dados, setDados] = useState([]);

  async function buscarParques() {
    try {
      // Obtém o token de AsyncStorage
      const token = await AsyncStorage.getItem("token");
    
    
      if (token) {
        // Construa o cabeçalho Authorization
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        };
  
        // Faça a solicitação usando o cabeçalho personalizado
        const response = await fetch('https://tcc-production-e100.up.railway.app/api/lazer' , {
          method: 'GET', // ou outro método HTTP
          headers: headers
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
  
  buscarParques()
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.idLazer}
      style={{ height: 160 }}
      onPress={() => navigation.navigate('TelaDetalhes', item)}
    >
      <View
        style={{
          backgroundColor: '#B1D3C1',
          marginTop: 15,
          borderRadius: 35,
          width: 340,
          height: 150,
          marginLeft: 13,
        }}
      >
        <Image source={{ uri: item.imagem }} style={styles.Imagens} />
        <Text
          style={{
            marginLeft: 140,
            marginTop: -145,
            fontSize: 18,
          }}
        >
          {item.nome}
        </Text>

        <Text
          style={{
            marginLeft: 140,
            marginTop: 10,
            fontSize: 10,
          }}
        >
          {item.descricao}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const filteredData = dados.filter((item) =>
    item.nome.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={{ flex: 1}}>
      <TextInput
        style={styles.Input}
        placeholder="Digite sua pesquisa"
        onChangeText={(text) => setQuery(text)}
        value={query}
      />

      <Text>{'\n'}</Text>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.idLazer}
        renderItem={renderItem}
      />

      <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>

      <Routes></Routes>
    </View>
  );
};

const styles = {
  Imagens: {
    width: 135,
    height: 150,
    left: 1,
    borderRadius: 25
  },
  Input: {
    borderWidth: 11,
    borderColor: '#B1D3C1',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderRadius: 27,
    backgroundColor: '#B1D3C1',
    width: 310,
    height: 40,
    padding: 3
    }
};

export default Pesquisa;
