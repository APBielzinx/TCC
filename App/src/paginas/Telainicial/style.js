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
        marginLeft: 13
      },
      vieww: {
        flexDirection: 'row', 
        paddingHorizontal: 1,
        marginTop: 5,
        marginLeft: 25
      },
      Imagens: {
        width: 125,
        height: 148,
        borderRadius: 25,
        marginTop: 1,
        marginLeft: 1,

    }
  })

  
  export default styles;