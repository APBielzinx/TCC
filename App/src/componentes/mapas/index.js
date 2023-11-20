import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const MapComponent = ({ latitude, longitude }) => {
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=600x600&maptype=roadmap&key=AIzaSyDLLFCYxuJxMsVpnIHEWsaXGsP1oAHQDLY`;

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: mapUrl }} style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapComponent;
