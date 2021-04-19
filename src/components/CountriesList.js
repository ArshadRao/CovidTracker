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

export class PureCountriesList extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      dataList: [],
      filteredData: [],
    };
  }

  fetchData = async () => {
    this.setState({ loading: true });
    const response = await axios.get('https://corona.lmao.ninja/v2/countries');
    this.setState({
      loading: false,
      filteredData: response.data,
      dataList: response.data,
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  renderCountries = ({ item }) => <ListItem item={item} />;

  searchByName = (text) => {
    this.setState((prevState) => ({
      filteredData: prevState.dataList.filter((item) => {
        const itemData = item.country.toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      }),
    }));
  };

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const renderEmpty = (
      <View style={styles.center}>
        <Image source={searchLogo} style={styles.noResultImage} />
        <Text style={styles.noResultTitle}>List is Empty</Text>
      </View>
    );

    if (this.state.loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.mainContainer}>
        <Header title="Countries" />
        <SearchBar label="Search.." onSearch={this.searchByName} />
        <FlatList
          data={this.state.filteredData}
          refreshing={this.state.loading}
          initialNumToRender={10}
          onRefresh={this.fetchData}
          renderItem={this.renderCountries}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={{ flexGrow: 1 }}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(_, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

export default PureCountriesList;
