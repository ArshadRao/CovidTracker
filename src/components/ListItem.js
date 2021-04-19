import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const fontColor = 'black';
const updateTimeColor = 'gray';
const warningSubtitleColor = 'orange';
const errorSubtitleColor = 'red';
const successSubtitleColor = 'green';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  countryName: {
    fontSize: 20,
    color: fontColor,
  },
  totalConf: {
    fontSize: 18,
    color: fontColor,

  },
  valueNum: {
    marginLeft: 5,
    fontSize: 12,
    color: fontColor,
  },
  valueNumInfo: {
    fontSize: 10,
    fontStyle: 'italic',
    marginLeft: 5,
  },
  valueColor: {
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  values: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  region: {
    marginLeft: 2,
    fontSize: 10,
    fontStyle: 'italic',
    color: fontColor,
  },
  updateTime: {
    fontSize: 10,
    marginLeft: 5,
    color: updateTimeColor,
  },
});


export const PureListItem = (props) => {
  const { item } = props;
  const percentConfirmed = ((item.cases * 100) / item.population);
  const percentDeath = ((item.deaths * 100) / item.cases);
  const percentRecovered = ((item.recovered * 100) / item.cases);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.countryName}>{item.country.trim()}</Text>
          <Text style={styles.region}>{item.continent}</Text>
          <Text style={styles.updateTime}>{moment(item.updated).fromNow()}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.totalConf}>{numeral(item.cases).format('0,0')}</Text>
          {item.todayDeaths ? <Text style={[styles.valueNumInfo, { color: errorSubtitleColor, fontStyle: 'normal' }]}>({item.todayDeaths})</Text> : null}
        </View>
      </View>
      <View style={styles.values}>

        <View style={[styles.valueContainer, { justifyContent: 'flex-start' }]}>
          <View style={[styles.valueColor, { backgroundColor: warningSubtitleColor }]} />
          <Text style={styles.valueNum}>{numeral(item.cases).format('0,0')}</Text>
          <Text style={[styles.valueNumInfo, { color: warningSubtitleColor }]}>(%{percentConfirmed.toFixed(5)})</Text>
        </View>

        <View style={[styles.valueContainer, { flexDirection: 'row' }]}>
          <View style={[styles.valueColor, { backgroundColor: errorSubtitleColor }]} />
          <Text style={styles.valueNum}>{numeral(item.deaths).format('0,0')}</Text>
          <Text style={[styles.valueNumInfo, { color: errorSubtitleColor }]}>(%{percentDeath.toFixed(2)})</Text>
        </View>

        <View style={styles.valueContainer}>
          <View style={[styles.valueColor, { backgroundColor: successSubtitleColor }]} />
          <Text style={styles.valueNum}>{numeral(item.recovered).format('0,0')}</Text>
          <Text style={[styles.valueNumInfo, { color: successSubtitleColor }]}>(%{percentRecovered.toFixed(2)})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PureListItem;
