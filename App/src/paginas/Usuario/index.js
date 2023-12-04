import React,{useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, Text, TextInput, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import Routes from '../../componentes/menu/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';


export default function Usuario(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    useEffect(() => {
      async function fetchUserData() {
        try {
          const storedEmail = await AsyncStorage.getItem('email');
          if (storedEmail) {
            setEmail(storedEmail);
          } else {
            // Trate o caso em que o email não está no AsyncStorage
            console.warn('Email não encontrado no AsyncStorage.');
          }
        } catch (error) {
          console.error('Erro ao obter dados do AsyncStorage:', error);
        }
      }
  
      fetchUserData();
    }, []);

    return(
        <View style= {{flex:1, backgroundColor: '#FFF'}}>
             <ScrollView>

 

            <TouchableOpacity style={styles.botaopular} onPress={ () => navigation.navigate('TelaInicial')} >

                <Text style={{color: '#000',fontSize: 35, left: 30, marginTop: 60}}><Icon name="leftcircle" size={40} color='#17A558'/>  Usuário</Text>
            </TouchableOpacity>


          <View
            style={{
              marginTop: 35,
              borderRadius: 60,
              width: 335,
              height: 100,
              marginLeft: 13,

              borderRadius: 35,
              marginLeft: 20,
              flex:4
            }}
            
          >
            <Image source= {require('../../Imagens/perfil-de-usuario.jpg')} style={styles.Imagem} />
            

            <Text style={{marginTop:-65, marginLeft:90, fontSize:19}}>{email}</Text>
          </View>

          <View
            style={{
              backgroundColor: '#B1D3C1',
              marginTop: 15,
              borderRadius: 20,
              width: 365,
              height: 150,
              marginLeft: 22,
            }}
          >
            <TouchableOpacity onPress={ () => navigation.navigate('Login')}><Text style={{marginTop:20, marginLeft:30, fontSize:20}}>Alterar conta</Text></TouchableOpacity>  
            <TouchableOpacity onPress={ () => navigation.navigate('TelaSobreoApp')}><Text style={{marginTop:20, marginLeft:30, fontSize:20}}>Sobre App</Text></TouchableOpacity>
            <TouchableOpacity onPress={ () => navigation.navigate('Iniciar')}><Text style={{marginTop:20, marginLeft:30, fontSize:20}}>Sair</Text></TouchableOpacity>

          </View>

          </ScrollView>
          

          <Routes></Routes>

        </View>
                

                        

    )
}