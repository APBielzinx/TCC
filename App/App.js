import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import Iniciar from './src/paginas/Iniciar';
import Cadastro from './src/paginas/Cadastro';
import Login from './src/paginas/Login';
import TelaParques from './src/paginas/TelaParques';
import TelaInicial from './src/paginas/Telainicial';
import TelaLazer from './src/paginas/TelaLazer';
import TelaDetalhes from './src/paginas/TelaDetalhes';
import Usuario from './src/paginas/Usuario';
import TelaEventos from './src/paginas/TelaEventos';
import Favoritos from './src/paginas/Favoritos';
import TelaSobreoApp from './src/paginas/TelaSobreoApp';
import TelaContatos from './src/paginas/TelaContatos';
import TelaChat from './src/paginas/TelaChat';
import Pesquisa from './src/componentes/pesquisa'
import TelaMaps from './src/paginas/TelaMaps';
import TelaDetalhesEventos from './src/paginas/TelaDetalhesEventos';
import TelaInteresse from './src/paginas/TelaInteresse'

const Stack = createNativeStackNavigator()

export default function App(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
          name='Iniciar' 
          component={Iniciar}
          options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='Cadastro'
           component={Cadastro}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='Login'
           component={Login}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='TelaInicial'
           component={TelaInicial}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='TelaParques'
           component={TelaParques}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='TelaLazer'
           component={TelaLazer}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='TelaDetalhes'
           component={TelaDetalhes}
           options={{
            headerShown: false
          }}
          />

          <Stack.Screen
           name='Usuario'
           component={Usuario}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='TelaEventos'
           component={TelaEventos}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='Favoritos'
           component={Favoritos}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='TelaSobreoApp'
           component={TelaSobreoApp}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='TelaContatos'
           component={TelaContatos}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='TelaChat'
           component={TelaChat}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='Pesquisa'
           component={Pesquisa}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='TelaMaps'
           component={TelaMaps}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='TelaDetalhesEventos'
           component={TelaDetalhesEventos}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name='TelaInteresse'
           component={TelaInteresse}
           options={{
            headerShown: false
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
}
