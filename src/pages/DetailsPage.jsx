import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Filter from '../components/Filter';
import CityItem from '../components/CityItem';
import {loadCities} from '../redux/cities/cities';
import {FlatList, Image, Text, View} from 'react-native';

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
    <View className="details-content">
      <View>
        <Filter />
        {/* <style>
          {`#country-headline-${country.iso2}::before {
            background-image: url(${country.map});
          }`}
        </style> */}
        <View
          id={`country-headline-${country.iso2}`}
          className="country-headline">
          <View className="country-headline-header">
            <Image
              className="country-flag"
              crossOrigin="anonymous"
              src={country.flag}
              alt={`${country.name} flag`}
            />
            <Text className="country-name">{country.name}</Text>
          </View>
          <Text className="country-statistic">
            {new Intl.NumberFormat().format(country.statistic)}
          </Text>
        </View>
        <FlatList
          className="cities-list"
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
