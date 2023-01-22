import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CityItem from '../components/CityItem';
import {loadCities} from '../redux/cities/cities';
import {FlatList, StyleSheet, View} from 'react-native';
import CitiesListHeader from '../components/CitiesListHeader';

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

  const citiesListHeader = () => <CitiesListHeader country={country} />;

  return (
    <View style={styles.detailsContainer}>
      <View>
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
          ListHeaderComponent={citiesListHeader}
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
});
