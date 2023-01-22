import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Proptypes from 'prop-types';
import Filter from './Filter';

export default function CitiesListHeader({country}) {
  return (
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
    </View>
  );
}

CitiesListHeader.propTypes = {
  country: Proptypes.shape({
    name: Proptypes.string.isRequired,
    statistic: Proptypes.number.isRequired,
    flag: Proptypes.string.isRequired,
    map: Proptypes.string.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
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
