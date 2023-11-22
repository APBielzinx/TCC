import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../componentes/menu/routes';
import CalendarioSelecionavel from '../../componentes/calendario';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TelaCalendario = () => {
  const navigation = useNavigation();
  const [eventosDoDia, setEventosDoDia] = useState([]);
  const[dados,setDados] = useState([])

  async function buscarEventos(data) {
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
        const response = await fetch('https://tcc-production-e100.up.railway.app/api/evento/data/'+data, {
          method: 'GET', // ou outro método HTTP
          headers: headers
        });
  
        if (response.status === 200) {
          const data = await response.json();
          console.log("Dados da resposta:", data);
          setDados(data)
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
  

  // Função de exemplo para obter eventos do dia
  const obterEventosDoDia = (data) => {
    // Substitua esta lógica pela sua lógica real para obter eventos
    const eventosExemplo = [
      { nome: 'Evento 1', data: '2023-11-21' },
      { nome: 'Evento 2', data: '2023-11-21' },
      { nome: 'Evento 3', data: '2023-11-22' },
    ];

    return dados.filter((evento) => evento.dataInicio == '2023, 11, 21');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView>
        <TouchableOpacity style={styles.botaopular} onPress={() => navigation.navigate('TelaInicial')}>
          <Text style={{ color: '#000', fontSize: 35, left: 30, marginTop: 60 }}>
            <Icon name="leftcircle" size={40} color='#17A558' /> Calendário
          </Text>
        </TouchableOpacity>

        <CalendarioSelecionavel
          onDiaPress={(data) => {
            // Atualizar os eventos do dia ao pressionar um dia
            const eventosDoDiaAtual = buscarEventos(data);
            setEventosDoDia(eventosDoDiaAtual);
          }}
        />

        <Text style={{ fontSize: 30, marginTop: 30, marginLeft: 139 }}>Eventos</Text>

        <View
          style={{
            backgroundColor: '#B1D3C1',
            marginTop: 10,
            borderRadius: 35,
            width: 365,
            height: 150,
            marginLeft: 18,
          }}
        >
          {/* Renderizar eventos do dia */}
          {dados.map((evento, index) => (
            <Text key={index}>{evento.nomeEvento}</Text>
           
          ))}
        </View>
      </ScrollView>
      <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>

      <Routes />
    </View>
  );
};

export default TelaCalendario;
