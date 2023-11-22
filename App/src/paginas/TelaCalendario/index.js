import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../componentes/menu/routes';
import CalendarioSelecionavel from '../../componentes/calendario';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';


const TelaCalendario = () => {
  const navigation = useNavigation();
  const [eventosDoDia, setEventosDoDia] = useState([]);
  const [dados, setDados] = useState([]);

  async function buscarEventos(data) {
    try {
      // Obtém o token de AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const idUsuario = await AsyncStorage.getItem('id');

      if (token) {
        // Construa o cabeçalho Authorization
        const headers = {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        // Faça a solicitação usando o cabeçalho personalizado
        const response = await fetch(
          'https://tcc-production-e100.up.railway.app/api/evento/data/' + data,
          {
            method: 'GET', // ou outro método HTTP
            headers: headers,
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log('Dados da resposta:', data);
          // Ordena os dados por data
          const dadosOrdenados = data.sort(
            (a, b) => new Date(a.dataInicio) - new Date(b.dataInicio)
          );
          setDados(dadosOrdenados);
        } else {
          console.error('Erro na solicitação:', response.status, idUsuario);
        }
      } else {
        console.log('Token não encontrado em AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
    }
  }

  const formatDate = (dateString) => {
    try {
      // Tente criar um objeto Date diretamente
      const date = new Date(dateString);
  

      // Verifique se a data é válida
      if (!isNaN(date.getTime())) {
        // Se for válida, formate-a para o formato brasileiro usando date-fns
        return format(date, 'dd/MM/yyyy', { locale: ptBR });
      } else {
        // Se não for válida, retorne a string original
        return dateString;
      }
    } catch (error) {
      // Se ocorrer um erro, retorne a string original
      console.error('Erro ao formatar data:', error);
      return dateString;
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView>
        <TouchableOpacity
          style={styles.botaopular}
          onPress={() => navigation.navigate('TelaInicial')}
        >
          <Text style={{ color: '#000', fontSize: 35, left: 30, marginTop: 60 }}>
            <Icon name="leftcircle" size={40} color="#17A558" /> Calendário
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

          {/* Renderizar eventos do dia */}
          {dados.map((evento, index) => (
            <TouchableOpacity
              key={evento}
              style={{ marginBottom: 10 }}
              onPress={() => navigation.navigate('TelaDetalhes', evento)}
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
                  marginTop: 6,
                }}
              >
                <View style={{ marginLeft: 10, flexShrink: 1 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      marginBottom: 5,
                      flexShrink: 1,
                      flexWrap: 'wrap', // Permite que o texto quebre em várias linhas
                    }}
                  >
                    {evento.nomeEvento}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      flexShrink: 1,
                      flexWrap: 'wrap', // Permite que o texto quebre em várias linhas
                    }}
                  >
                    {evento.descricao}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      flexShrink: 1,
                      flexWrap: 'wrap', // Permite que o texto quebre em várias linhas
                    }}
                  >
                    {evento.local}
                  </Text>

                  <Text
                    style={{
                      fontSize: 10,
                      flexShrink: 1,
                      flexWrap: 'wrap', // Permite que o texto quebre em várias linhas
                    }}
                  >
                    {formatDate(evento.dataInicio)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      flexShrink: 1,
                      flexWrap: 'wrap', // Permite que o texto quebre em várias linhas
                    }}
                  >
                    {formatDate(evento.dataTermino)}
                  </Text>

                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>

      <Routes />
    </View>
  );
};

export default TelaCalendario;
