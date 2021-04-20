import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import ListItem from './ListItem';
import Header from './Header';
import SearchBar from './SearchBar';
import searchLogo from '../assets/search.png';


const deviceSize = Dimensions.get('window');
const separatorColor = '#eceff1';
const surfaceColor = 'white';
const colorsGray = 'gray';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  separator: {
    borderColor: separatorColor,
    borderWidth: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: surfaceColor,
  },
  noResultImage: {
    width: deviceSize.width * 0.1,
    height: deviceSize.height * 0.1,
    resizeMode: 'contain',
    tintColor: colorsGray,
  },
  noResultTitle: {
    color: colorsGray,
    textAlign: 'center',
  },
});

export function PureCountriesList() {
  const [loading, setLoading] = React.useState(true);
  const [dataList, setDataList] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get('https://corona.lmao.ninja/v2/countries');
    setLoading(false);
    setDataList(response.data);
    setFilteredData(response.data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const renderCountries = ({ item }) => <ListItem item={item} />;

  const searchByName = (text) => {
    const filteredList = dataList.filter((item) => {
      const itemData = item.country.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(filteredList);
  };

  const renderSeparator = () => <View style={styles.separator} />;

  const renderEmpty = (
    <View style={styles.center}>
      <Image source={searchLogo} style={styles.noResultImage} />
      <Text style={styles.noResultTitle}>List is Empty</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title="Countries" />
      <SearchBar label="Search.." onSearch={searchByName} />
      <FlatList
        data={filteredData}
        refreshing={loading}
        initialNumToRender={10}
        onRefresh={fetchData}
        renderItem={renderCountries}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ flexGrow: 1 }}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

export default PureCountriesList;
