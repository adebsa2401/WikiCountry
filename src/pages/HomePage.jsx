import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Filter from '../components/Filter';
import CountryItem from '../components/CountryItem';
import {loadCountries} from '../redux/countries/countries';
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';

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

  return (
    <View style={styles.homeContainer}>
      <View>
        <Filter />
        <View style={styles.headline}>
          <ImageBackground
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/en/1/11/World_map_black.png',
            }}
            style={styles.headlineBackgroundContainer}
            imageStyle={styles.headlineBackground}
            resizeMode="contain">
            <Text>World wide countries</Text>
            <Text style={styles.worldStatistic}>
              {new Intl.NumberFormat().format(worldPopulation)}
            </Text>
          </ImageBackground>
        </View>
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

  headline: {
    height: 150,
    padding: 10,
  },

  headlineBackground: {
    opacity: 0.3,
  },

  headlineBackgroundContainer: {
    flex: 1,
  },

  worldStatistic: {
    marginLeft: 'auto',
    marginTop: 'auto',
  },
});
