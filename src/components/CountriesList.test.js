import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import { PureCountriesList as CountriesList } from './CountriesList';
import { FlatList } from 'react-native';
import SearchBar from './SearchBar';

const mockUseEffectOnce = () => {
  jest.spyOn(React, 'useEffect').mockImplementationOnce((fn) => fn());
};

const mockUseStateOnce = (state, setState = jest.fn()) => {
  jest.spyOn(React, 'useState').mockImplementationOnce(() => [state, setState]);
};

const data = [
  {
    updated: 1587140875474,
    country: 'Italy',
    cases: 168941,
    todayCases: 3786,
    deaths: 22170,
    todayDeaths: 525,
    recovered: 40164,
    active: 106607,
    critical: 2936,
    tests: 1178403,
    population: 60390869,
    continent: 'Europe',
  },
  {
    updated: 1618868527825,
    country: 'Brazil',
    cases: 13973695,
    todayCases: 30624,
    deaths: 374682,
    todayDeaths: 1240,
    recovered: 12391599,
    todayRecovered: 0,
    active: 1207414,
    critical: 8318,
    tests: 28600000,
    population: 213761802,
    continent: 'South America',
  },
];

jest.mock('axios', () => ({
  get: async () => ({ data }),
}));

describe('CountriesList component', () => {
  it('should render component properly', () => {
    const wrapper = shallow(<CountriesList />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with Flatlist', async () => {
    await mockUseEffectOnce();
    const setLoading = jest.fn();
    mockUseStateOnce(false, setLoading);
    mockUseStateOnce(data);
    mockUseStateOnce(data);
    const wrapper = shallow(<CountriesList />);
    expect(wrapper).toMatchSnapshot();
    expect(setLoading).toHaveBeenCalled();
  });

  it('should render listItem', () => {
    mockUseEffectOnce();
    mockUseStateOnce(false);
    mockUseStateOnce(data);
    mockUseStateOnce(data);
    const wrapper = shallow(<CountriesList />);
    const listItem = wrapper.find(FlatList).props().renderItem({ item: data[0] });
    expect(React.isValidElement(listItem)).toBe(true);
  });

  it('should call keyExtractor', () => {
    mockUseEffectOnce();
    mockUseStateOnce(false);
    mockUseStateOnce(data);
    mockUseStateOnce(data);
    const wrapper = shallow(<CountriesList />);
    const index = wrapper.find(FlatList).props().keyExtractor('', 0);
    expect(index).toBe('0');
  });

  it('should filter list on search', () => {
    const setFilteredData = jest.fn();
    mockUseEffectOnce();
    mockUseStateOnce(false);
    mockUseStateOnce(data);
    mockUseStateOnce(data, setFilteredData);
    const wrapper = shallow(<CountriesList />);
    wrapper.find(SearchBar).props().onSearch('Brazil');
    expect(setFilteredData).toHaveBeenCalledWith([data[1]]);
  });
});
