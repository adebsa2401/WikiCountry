import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Filter from '../components/Filter';
import CityItem from '../components/CityItem';
import {loadCities} from '../redux/cities/cities';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function DetailsPage({navigation, route}) {
  const country = route.params;

  const [cities, {limit, ge}] = useSelector(state => [
    state.cities[country.iso2],
    state.itemsFilter,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCities(country.iso2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities && cities.length]);

  useEffect(() => {
    navigation.setOptions({
      title: `Population/Cities (${(cities && cities.length) || 0})`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities && cities.length, navigation]);

  const filteredCities =
    cities &&
    cities.filter(city => {
      if (ge) {
        return city.population >= limit;
      }
      return city.population <= limit;
    });

  return (
    <View style={styles.detailsContainer}>
      <View>
        <Filter />
        <View style={styles.countryHeadline}>
          <ImageBackground
            source={{uri: country.map}}
            style={styles.headlineBackgroundContainer}
            imageStyle={styles.headlineBackground}
            resizeMode="contain">
            <View style={styles.countryHeadlineHeader}>
              <Image style={styles.countryFlag} source={{uri: country.flag}} />
              <Text style={styles.countryName}>{country.name}</Text>
            </View>
            <Text style={styles.countryStatistic}>
              {new Intl.NumberFormat().format(country.statistic)}
            </Text>
          </ImageBackground>
        </View>
        <FlatList
          data={filteredCities || []}
          keyExtractor={item => item.name}
          renderItem={({item, index}) => (
            <CityItem
              key={item.name}
              index={index}
              name={item.name}
              statistic={item.population}
              isCapital={item.isCapital}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: '#fc5193',
    color: '#fff',
  },

  headlineBackground: {
    opacity: 0.3,
  },

  headlineBackgroundContainer: {
    flex: 1,
  },

  countryHeadline: {
    height: 150,
    padding: 10,
  },

  countryHeadlineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  countryFlag: {
    width: 50,
    height: 30,
  },

  countryStatistic: {
    marginTop: 'auto',
    marginLeft: 'auto',
  },

  countryName: {
    textTransform: 'uppercase',
  },
});
