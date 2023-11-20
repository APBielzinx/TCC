
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Product = ({ product, onAddToFavorites }) => {
  return (
    <View>
      <Text>{product.name}</Text>
      <TouchableOpacity onPress={() => onAddToFavorites(product)}>
        <Text>Adicionar aos Favoritos</Text>
      </TouchableOpacity>
    </View>
  );
};

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (product) => {
    // Verifique se o produto já está nos favoritos para evitar duplicatas
    if (!favorites.some((favProduct) => favProduct.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  return (
    <View>
      {/* Renderize a lista de produtos com o botão para adicionar aos favoritos */}
      {products.map((product) => (
        <Product key={product.id} product={product} onAddToFavorites={addToFavorites} />
      ))}

      <Text>Favoritos:</Text>
      {/* Renderize a lista de produtos favoritos */}
      {favorites.map((favProduct) => (
        <Text key={favProduct.id}>{favProduct.name}</Text>
      ))}
    </View>
  );
};

export default FavoritesScreen;