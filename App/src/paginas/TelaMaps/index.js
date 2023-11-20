import React from 'react';
import {View, Image, TouchableOpacity, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../componentes/menu/routes';
import Maps from '../../componentes/mapas'

export default function TelaMaps(){
    const navigation = useNavigation();
    return(
      <View style= {{flex:1, backgroundColor: '#FFF'}}>
      <ScrollView>

        <Maps></Maps>
                
     </ScrollView>
        <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>

            
        <Routes></Routes>
        </View>
        
    )
}