import React, { useState } from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import styles from './style';
import * as yup from 'yup';



const schema = yup.object({
  email: yup.string().email("Email inválido").required("Informe seu Email"),
  password: yup.string().min(8, "A senha deve ter pelo menos 8 dígitos").required("Informe sua senha")
})

export default function Cadastro(){ 
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const navigation = useNavigation();

      const {control, handleSubmit, formState: {errors} } = useForm({
      resolver: yupResolver(schema)
})


function handleSignIn(data, lat, lon) {
  const headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  const dataToPost = {
    nome: nome, // Utiliza o nome vindo do formulário
    email: email,
    senha: senha,
    cep: data.cep, // Utiliza o CEP vindo do formulário
    bairro: data.bairro, // Substitua 'data.bairro' pelo valor apropriado
    localidade: data.localidade, // Substitua 'data.localidade' pelo valor apropriado
    logradouro: data.logradouro, // Substitua 'data.logradouro' pelo valor apropriado
    uf: data.uf, // Substitua 'data.uf' pelo valor apropriado
    latitude: lat, // Utiliza a latitude vinda do formulário
    longetude: lon, // Utiliza a longitude vinda do formulário
  };

  // Converte o objeto em JSON
  const jsonData = JSON.stringify(dataToPost);
  console.log("oi")
  fetch('https://tcc-production-e100.up.railway.app/api/usuario', {
    method: 'POST',
    body: jsonData,
    headers: headers
  })
    .then(response => {
      if (response.status == 400) {
        Alert.alert("Ops!", "Esse e-mail já está em uso");
      } else if (response.status == 201) {
        Alert.alert("Sucesso!", "Cadastrado com sucesso");
      } else {
        Alert.alert("Ops!", "Erro no servidor. Verifique o e-mail e tente novamente!");
      }
    })
    .catch(errors => {
      console.error("Erro durante a requisição:", errors);
      Alert.alert("Erro", "Ocorreu um erro durante a requisição");
    });
}

const [latitude, setLatitude] = useState('');
const [longitude, setLongitude] = useState('');

const [cep, setCep] = useState('');
    const [mensagemError, setMensagemError] = useState('');
    const [endereco, setEndereco] = useState('');

    const buscarCep = () => {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            const enderecoCompleto = `${data.logradouro}, ${data.localidade}, ${data.uf}, Brazil`;
    
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}`)
              .then((response) => response.json())
              .then((geoData) => {
                if (geoData.length > 0) {
                  const { lat, lon } = geoData[0];
                  setEndereco(`CEP: ${data.cep} - ${data.logradouro}, ${data.localidade} - ${data.uf}`);
                  setLatitude(lat);
                  setLongitude(lon);
                  console.log(`Latitude: ${lat}, Longitude: ${lon}`);
                  handleSignIn(data, lat, lon);
                  // Após obter a latitude e a longitude, chame a função para cadastrar os dados do formulário

                 } else {
                  setEndereco('Endereço não encontrado');
                }
              })
              .catch((error) => {
                console.error('Erro ao obter coordenadas:', error);
              });
          } else {
            setEndereco('CEP não encontrado');
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar CEP:', error);
        });
    };
    



    const handleInputChange = (text) => {
    // Remove caracteres não numéricos e define o estado do cep
    const formattedCep = text.replace(/[^0-9]/g, '');
    setCep(formattedCep);
    setMensagemError('Por favor, digite apenas números.');
};

    const handleInputChangee = (text) => {
    // Expressão regular para verificar se o texto contém apenas letras e espaços
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(text)) {
      setNome(text);
      setMensagemErro('');
    } else {
      setMensagemErro('Por favor, digite apenas letras e espaços.');
    }
  };

  const handleInputChangeee = (text) => {
    // Expressão regular para verificar se o texto contém apenas letras e espaços

 
      setEmail(text);


  };

  

  const handleInputChangeeee = (text) => {
    // Expressão regular para verificar se o texto contém apenas letras e espaços

 
      setSenha(text);
     


   
  };



      return(
        <View style= {{flex:1, backgroundColor: '#FFF'}}>
            <TouchableOpacity style={styles.botaopular} onPress={ () => navigation.navigate('Iniciar')} >
                <Text style={{color: '#000',fontSize: 35, left: 30, marginTop: 60}}><Icon name="leftcircle" size={40} color='#17A558'/>  Cadastro</Text>
            </TouchableOpacity>
            
            <ScrollView>

            <Text style={styles.Textocadas}>Vamos realizar seu cadastro, precisamos apenas de algumas informações:</Text>


            <Text style={{fontSize: 20, left: 20, marginTop: 50}}>Nome Completo:</Text>

                    <TextInput 
                    style={[styles.Inputs, {
                      border: mensagemErro && 2,
                       borderColor: mensagemErro && '#ff375b'
                    }]} 
                    placeholder='  Digite seu Nome Completo'
                    onChangeText={handleInputChangee}
                    value={nome}
                  />
             {mensagemErro !== '' && <Text style={{ color: '#ff375b', marginTop: 10, left: 10 }}>{mensagemErro}</Text>}

            <Text style={{fontSize: 20, left: 20, marginTop: 30}}>CEP:</Text>

              <TextInput
                style={[styles.Inputs, {
                  border: mensagemError && 2,
                  borderColor: mensagemError && 'black'
                }]}
                placeholder="Digite o CEP da sua residência"
                keyboardType="numeric"
                onChangeText={handleInputChange}
                value={cep} 
              />


           {endereco !== '' && <Text style={{ marginTop: 20 }}>{endereco}</Text>}

            <Text style={{fontSize: 20, left: 20, marginTop: 50}}>E-mail:</Text>

              <Controller
                  control={control}
                  name="email"
                  render={({field: {onChange, onBlur, value}}) => (

                    <TextInput 
                    style={[styles.Inputs, {
                      border: errors.email && 2,
                      borderColor: errors.email && '#ff375b'
                    } ]} 

                    onChangeText={handleInputChangeee}
                    onBlur={onBlur}
                    value={email}
                    placeholder='  Digite seu E-mail'
                  />
                )}
              />
              {errors.email && <Text style={styles.Error}>{errors.email?.message}</Text>}

              <Text style={{fontSize: 20, left: 20, marginTop: 30}}>Senha:</Text>

              <Controller
                  control={control}
                  name="password"
                  render={({field: {onChange, onBlur, value}}) => (

                    <TextInput
                     style={[styles.Inputs, {
                      border: errors.password && 2,
                      borderColor: errors.password && '#ff375b'
                    } ]} 

                    onChangeText={handleInputChangeeee}
                    onBlur={onBlur}
                    value={senha}
                    placeholder='  Digite sua Senha'
                    secureTextEntry={true}
                  />
                )}
              />
              {errors.password && <Text style={styles.Error}>{errors.password?.message}</Text>}

            <TouchableOpacity style={styles.Botao} onPress={buscarCep} >
            <Text style={{color: '#FFF'}}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaofazerlogin} onPress={ () => navigation.navigate('Login')}>
            <Text style={{color: '#000', fontSize: 15}}>Já tem conta?<Text style={{color: '#17A558' }}> - Faça o Login</Text></Text>
          </TouchableOpacity>
          </ScrollView>

        </View>
        
      );
      
}