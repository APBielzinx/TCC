import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CalendarioSelecionavel = () => {
  const [dataSelecionada, setDataSelecionada] = useState('');

  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const obterDataAtual = () => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  const renderizarDiasDoMes = () => {
    const diasNoMes = [];
    const dataAtual = new Date();
    const primeiroDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1).getDay();
    const ultimoDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= ultimoDiaDoMes; i++) {
      const dia = String(i).padStart(2, '0');
      const data = `${obterDataAtual().slice(0, 8)}${dia}`;
      const diaDaSemana = (i + primeiroDiaDoMes - 1) % 7;
      diasNoMes.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.dia,
            { backgroundColor: data === dataSelecionada ? '#17A558' : 'transparent' },
          ]}
          onPress={() => setDataSelecionada(data)}
        >
          <Text style={{ color: data === dataSelecionada ? '#fff' : '#000' }}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    return diasNoMes;
  };

  return (
    <View style={styles.container}>
      <View style={styles.diasDaSemana}>
        {diasDaSemana.map((dia) => (
          <Text key={dia} style={styles.diaDaSemanaTexto}>
            {dia}
          </Text>
        ))}
      </View>
      <View style={styles.diasDoMes}>{renderizarDiasDoMes()}</View>
      <Text>Data Selecionada: {dataSelecionada}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#B1D3C1',
    borderRadius:30,
    width:320,
    marginLeft:25,
    marginTop:25
  },
  diasDaSemana: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    
  },
  diaDaSemanaTexto: {
    fontWeight: 'bold',
    fontSize:20
    
  },
  diasDoMes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  },
  dia: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:20,
    marginLeft:1
  },
});

export default CalendarioSelecionavel;