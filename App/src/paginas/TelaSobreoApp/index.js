import React,{useState} from 'react';
import {View,Image, TouchableOpacity, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import Routes from '../../componentes/menu/routes';
import Icon from 'react-native-vector-icons/AntDesign';

export default function TelaSobreoApp(){
    const navigation = useNavigation();

    return(
      <View style= {{flex:1, backgroundColor: '#FFF'}}>
      <ScrollView>
                <TouchableOpacity style={styles.botaopular} onPress={ () => navigation.navigate('Usuario')} >
                <Text style={{color: '#000',fontSize: 35, left: 30, marginTop: 60}}><Icon name="leftcircle" size={40} color='#17A558'/>  Sobre o App</Text>
            </TouchableOpacity>

            <Image source= {require('../../Imagens/sobreapp.jpg')} style={styles.imagem}/>

            <View
            style={{
              backgroundColor: '#B1D3C1',
              marginTop: 20,
              borderRadius: 20,
              width: 390,
              height: 250,
              marginLeft: 11,
              padding:3
            }}
          >

            <Text style={{fontSize: 20, left:5, marginTop: 15}}>A informaçao nao chega aos moradores da regiao como deveria (de forma rapida e eficaz).
                 Por essa razao, desenvolvemos um sistema chamado Linkerd Park, para que as pessoas 
                 fiquem por dentro de eventos realizados em áreas de lazer que acontecem em seus bairros
            </Text>

          </View>

                </ScrollView>
                <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
 
            
        <Routes></Routes>
        </View>
        
    )
}