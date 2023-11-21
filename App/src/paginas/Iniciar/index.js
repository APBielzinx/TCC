import React,{useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Iniciar(){ 
    const navigation = useNavigation();

AsyncStorage.clear.apply


      return(
        <View style= {{flex:1, backgroundColor: '#2F4F4F'}}>

          <View>
            <Image source= {require('../../Imagens/arvoresdefundo.jpg')} style={styles.image} />

            <Image source= {require('../../Imagens/logoarvore.jpg')} style={styles.image2} />
          </View>
          
          
          <Text style={{fontSize: 45, left:85, color: '#FFF' }}>Linked Park</Text>
          <Text style={{fontSize: 20, left:106, color: '#FFF'}}>O lazer ligado a você</Text>

          <TouchableOpacity style={styles.Botao}  onPress={ () => navigation.navigate('Login') }>
            <Text style={{color: '#FFF'}}>Fazer login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Segundobotao} onPress={ () => navigation.navigate('Cadastro') }>
            <Text style={{color: '#2F4F4F'}}>Não tem conta? - Cadastre-se</Text>
          </TouchableOpacity>
        </View>
        
      );
}

