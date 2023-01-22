import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import Filter from './Filter';

export default function CountryListHeader({population}) {
  return (
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
            {new Intl.NumberFormat().format(population)}
          </Text>
        </ImageBackground>
      </View>
    </View>
  );
}

CountryListHeader.propTypes = {
  population: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
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
