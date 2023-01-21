import React from 'react';
import PropTypes from 'prop-types';
import {Image, Text, TouchableHighlight, View} from 'react-native';

export default function CountryItem({
  navigation,
  name,
  statistic,
  flag,
  map,
  iso2,
  index,
}) {
  const darkStyle = [1, 2].includes((index % 4) % 3);

  return (
    <>
      {/* <style>
        {`#country-item-${iso2}::before {
          background-image: url(${map});
        }`}
      </style> */}
      <TouchableHighlight
        id={`country-item-${iso2}`}
        className={`country-item ${darkStyle ? 'country-item-dark' : ''}`}
        role="presentation"
        onClick={() =>
          navigation.navigate('Details', {
            name,
            iso2,
            statistic,
            map,
            flag,
          })
        }>
        <View className="country-item-header">
          <Image
            className="country-flag"
            crossOrigin="anonymous"
            src={flag}
            alt={`${name} flag`}
          />
          <Text className="country-name">{name}</Text>
        </View>
        <Text className="country-statistic">
          {new Intl.NumberFormat().format(statistic)}
        </Text>
      </TouchableHighlight>
    </>
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
