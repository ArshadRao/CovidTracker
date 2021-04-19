import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  textStyle: {
    fontSize: 20,
  },
});

const Header = (props) => (
  <View style={styles.container}>
    <Text style={styles.textStyle}>{props.title}</Text>
  </View>
);

export default Header;
