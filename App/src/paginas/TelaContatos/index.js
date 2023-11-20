import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Routes from '../../componentes/menu/routes';

const contacts = [
  { id: 1, name: 'Parque 1' },
  { id: 2, name: 'Parque 2' },
  // Adicione mais contatos conforme necessário
];


export default function TelaContatos(){
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.botaopular} onPress={ () => navigation.navigate('TelaInicial')} >
            <Text style={{color: '#000',fontSize: 35, left: -75, marginTop: 60}}> <Icon name="leftcircle" size={40} color='#17A558'/> Contatos</Text>
        </TouchableOpacity>
      <FlatList
       style={{marginTop: 130,}}
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem} onPress={() => navigation.navigate('TelaChat', { contact: item })}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

          <Routes></Routes>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 350
  },
});


