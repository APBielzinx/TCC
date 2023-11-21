import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const SeuComponente = ({ route }) => {
  const [favoritado, setFavoritado] = useState(false);

  const favoritos = () => {
    // Alternar o estado de favorito quando o botão for pressionado
    setFavoritado(!favoritado);
  };

  return (
    <TouchableOpacity onPress={favoritos}>
      <Icon
        name={favoritado ? 'heart' : 'hearto'} // Use 'heart' quando favoritado, 'hearto' quando não favoritado
        size={27}
        style={{ marginTop: -26, left: 350, color: favoritado ? 'red' : 'black' }} // Mude a cor para vermelho quando favoritado, preto quando não favoritado
      />
    </TouchableOpacity>
  );
};

export default SeuComponente;
