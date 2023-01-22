import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CountryItem from '../components/CountryItem';
import {loadCountries} from '../redux/countries/countries';
import {FlatList, StyleSheet, View} from 'react-native';
import CountryListHeader from '../components/CountryListHeader';

export default function HomePage({navigation}) {
  const [countries, {limit, ge}] = useSelector(state => [
    state.countries,
    state.itemsFilter,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCountries());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries.length]);

  useEffect(() => {
    navigation.setOptions({
      title: `Population/Countries (${countries.length})`,
    });
  }, [countries.length, navigation]);

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

  const listHeaderComponent = () => (
    <CountryListHeader population={worldPopulation} />
  );

  return (
    <View style={styles.homeContainer}>
      <View>
        <FlatList
          data={filteredCountries}
          keyExtractor={item => item.name}
          numColumns={2}
          renderItem={({item, index}) => (
            <CountryItem
              navigation={navigation}
              key={item.name}
              index={index}
              name={item.name}
              statistic={item.population}
              flag={item.flag}
              map={item.map}
              iso2={item.iso2}
            />
          )}
          ListHeaderComponent={listHeaderComponent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#fc5193',
    color: '#fff',
  },
});
