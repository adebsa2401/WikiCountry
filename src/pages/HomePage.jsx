import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Filter from '../components/Filter';
import Header from '../components/Header';
import CountryItem from '../components/CountryItem';
import {loadCountries} from '../redux/countries/countries';
import {FlatList, Text, View} from 'react-native';

export default function HomePage() {
  const [countries, {limit, ge}] = useSelector(state => [
    state.countries,
    state.itemsFilter,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCountries());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries.length]);

  const filteredCountries = countries.filter(country => {
    if (ge) {
      return country.population >= limit;
    }
    return country.population <= limit;
  });

  const worldPopulation = countries.reduce(
    (acc, country) => acc + country.population,
    0,
  );

  return (
    <View className="home-content">
      <Header title={`Population/Countries (${filteredCountries.length})`} />
      <View>
        <Filter />
        <View className="headline">
          <Text className="world-name">World wide countries</Text>
          <Text className="world-statistic">
            {new Intl.NumberFormat().format(worldPopulation)}
          </Text>
        </View>
        <FlatList className="countries-grid">
          {filteredCountries.map((country, index) => (
            <CountryItem
              key={country.name}
              index={index}
              name={country.name}
              statistic={country.population}
              flag={country.flag}
              map={country.map}
              iso2={country.iso2}
            />
          ))}
        </FlatList>
      </View>
    </View>
  );
}
