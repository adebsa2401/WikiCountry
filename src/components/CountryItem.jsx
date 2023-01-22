import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CountryItem({
  navigation,
  name,
  statistic,
  flag,
  map,
  iso2,
  index,
}) {
  return (
    <TouchableOpacity
      style={styles.countryItem(index)}
      onPress={() =>
        navigation.navigate('Details', {
          name,
          iso2,
          statistic,
          map,
          flag,
        })
      }>
      <ImageBackground
        source={{uri: map}}
        style={styles.backgroundImageContainer}
        imageStyle={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.countryItemHeader}>
          <Image
            style={styles.countryFlag}
            source={{uri: flag, crossOrigin: 'anonymous'}}
          />
          <Text style={styles.countryName}>{name}</Text>
        </View>
        <Text style={styles.countryStatistic}>
          {new Intl.NumberFormat().format(statistic)}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

CountryItem.propTypes = {
  name: PropTypes.string.isRequired,
  statistic: PropTypes.number.isRequired,
  flag: PropTypes.string.isRequired,
  map: PropTypes.string.isRequired,
  iso2: PropTypes.string.isRequired,
  index: PropTypes.number,
};

CountryItem.defaultProps = {
  index: 0,
};

const styles = StyleSheet.create({
  countryItem: index => {
    const style = {
      aspectRatio: '1/1',
      flex: 1,
      maxWidth: '50%',
      padding: 10,
      overflow: 'hidden',
    };

    if ([1, 2].includes((index % 4) % 3)) {
      style.backgroundColor = '#ce4478';
    }

    return style;
  },

  backgroundImage: {
    opacity: 0.3,
    margin: '25%',
  },

  backgroundImageContainer: {
    flex: 1,
  },

  countryItemHeader: {
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
