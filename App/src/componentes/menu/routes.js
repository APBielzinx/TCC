import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Entypo';
import Iconss from 'react-native-vector-icons/FontAwesome';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../paginas/Telainicial/style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Routes(){ 
    const navigation = useNavigation();
    const latitude = AsyncStorage.getItem("latitude")
    const longetude = AsyncStorage.getItem("longetude")
      return(
        <View style= {{  
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#B1D3C1',
        right: 0,
        padding: 10,
        alignItems: 'center',
        margin: 0,
        }}>
            <View style={styles.viewmax}>
                <TouchableOpacity onPress={ () => navigation.navigate('TelaInicial') }>
                    <View 
                    style={{ 
                        marginTop: 15,
                        marginLeft: -5 , 
                        }}>
                    <Icons 
                        name="home"
                        size={40}
                        color='#526856'
                        />

                            </View>
                           </TouchableOpacity>
                           

                           <TouchableOpacity onPress={ () => navigation.navigate('TelaInteresse') }>
                    <View 
                    style={{ 
                        marginTop: 15,
                        marginLeft: 60 , 
                        }}>
                    <Icon 
                        name="like1"
                        size={40}
                        color='#526856'
                        />

                            </View>
                           </TouchableOpacity>


                        <TouchableOpacity onPress={ () => navigation.navigate('Favoritos') }>
                    <View 
                        style={{ 
                                marginTop: 15,
                                marginLeft: 60 , 
                                }}>
                            <Icons 
                                name="heart"
                                size={40}
                                color='#526856'
                                />
                    </View>
                </TouchableOpacity>
            </View>    
        </View>
      );
}

