import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    myStarStyle: {
        marginTop:10,
        color: 'yellow',
        fontSize: 25,
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 3,
        marginRight:7
      },
      myEmptyStarStyle: {
        color: 'white',
      }
})

export default styles;