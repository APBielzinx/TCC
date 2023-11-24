import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    Imagem: {
        width: 55,
        height: 55,
        left: 20,
        borderRadius: 30
    },

    Input: {
      borderWidth: 11,
      borderColor: '#B1D3C1',
      marginLeft: 40,
      marginRight: 30,
      borderRadius: 27,
      backgroundColor: '#B1D3C1',
      width: 250,
      padding: 3
      },

      view: {
        flexDirection: 'row', 
        paddingHorizontal: 1,
        marginTop: 60
      },
      viewmax: {
        flexDirection: 'row', 
        paddingHorizontal: 0,
        marginTop: 0,
        backgroundColor: '#B1D3C1',
        height:60
      },
      views: {
        flexDirection: 'row', 
        paddingHorizontal: 1,
        marginTop: -8,
        marginLeft: 5
      },
      vieww: {
        flexDirection: 'row', 
        paddingHorizontal: 1,
        marginTop: 5,
        marginLeft: 19
      },
      Imagens: {
        width: 135,
        height: 150,
        left: 1,
        borderRadius: 25

    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slideContent: {
      backgroundColor: '#B1D3C1',
      borderRadius: 35,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 25,
    },
    textContainer: {
      marginLeft: 10,
      flexShrink: 1,
    },
    nome: {
      fontSize: 18,
      marginBottom: 5,
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    descricao: {
      fontSize: 10,
      flexShrink: 1,
      flexWrap: 'wrap',
    },
  });
  

  
  export default styles;