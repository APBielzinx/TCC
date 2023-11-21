import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const imagens = [
  { id: 1, source: require('../../Imagens/CENTROC.jpg') },
  { id: 2, source: require('../../Imagens/PQVilaRodeio.jpg') },
  { id: 3, source: require('../../Imagens/PQRSX.jpg') },
  // Adicione mais objetos de imagem conforme necessário
];

const CarrosselDeImagens = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={imagens}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={item.source} style={styles.imagem} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
    marginTop: 15
  },
  imagem: {
    width: 392,
    height: 200, // Altura desejada para as imagens no carrossel
    borderRadius: 17,
    marginRight:10
  },
});

export default CarrosselDeImagens;