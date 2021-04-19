import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import searchLogo from '../assets/search.png';
import logo from '../assets/logo.png';


const deviceSize = Dimensions.get('window');
const colors = {
  gray: 'gray',
  searchBackColor: '#eceff1',
  fontColor: 'black',
  tintColor: 'rgb(242, 63, 52)',
};

const styles = StyleSheet.create({
  iconImage: {
    margin: 5,
    width: deviceSize.width * 0.1,
    height: deviceSize.width * 0.1,
    tintColor: colors.tintColor,
  },
  container: {
    alignSelf: 'center',
    height: 30,
    flex: 1,
    margin: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: colors.searchBackColor,
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 1,
    padding: 0,
    color: colors.fontColor,
  },
  logo: {
    width: deviceSize.width * 0.04,
    height: deviceSize.height * 0.03,
    resizeMode: 'contain',
    tintColor: colors.gray,
  },
});

const SearchBar = (props) => (
  <View style={{ flexDirection: 'row' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        style={styles.iconImage}
        source={logo}
      />
    </View>

    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder={props.label}
        placeholderTextColor={colors.gray}
        onChangeText={props.onSearch}
      />
      <Image source={searchLogo} style={styles.logo} />
    </View>
  </View>
);

export default SearchBar;
