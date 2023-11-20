import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

const TelaChat = ({ route }) => {
  const { contact } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage) {
      setMessages([...messages, { id: messages.length, text: newMessage }]);
      setNewMessage('');
    }
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.botaopular} onPress={ () => navigation.navigate('TelaContatos')} >
            <Text style={{color: '#000',fontSize: 35, left: 25, marginTop: 60}}> <Icon name="leftcircle" size={40} color='#17A558'/> {contact.name}</Text>
        </TouchableOpacity>
      <FlatList
       style={{marginTop: 45}}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <View style={styles.messageBubble}>
              <Text>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          placeholder="Digite sua mensagem..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}><Text style={{color: '#fff'}}>Enviar</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    messageContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      paddingHorizontal: 10,
      alignItems: 'flex-end',
    },
    messageBubble: {
      backgroundColor: '#B1D3C1',
      padding: 10,
      borderRadius: 10,
      
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
    },
    input: {
      flex: 1,
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      paddingHorizontal: 15,
      height: 45
    },
    sendButton: {
      color: '#fff', // cor do texto do botão
      backgroundColor: '#17A558', // cor de fundo do botão
      borderRadius: 20, // borda arredondada do botão
      paddingVertical: 10, // preenchimento vertical
      paddingHorizontal: 20, // preenchimento horizontal
      height: 40,
      width: 80
    },
});

export default TelaChat;
