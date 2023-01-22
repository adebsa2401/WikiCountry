import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from '@rneui/themed';
import {StyleSheet, Text, View} from 'react-native';

export default function CityItem({name, statistic, isCapital, index}) {
  return (
    <View style={styles.cityItem(index)}>
      <Text>{name}</Text>
      {isCapital && (
        <Icon iconStyle={styles.icon} type="font-awesome" name="star" />
      )}
      <Text>{new Intl.NumberFormat().format(statistic)}</Text>
    </View>
  );
}

CityItem.propTypes = {
  name: PropTypes.string.isRequired,
  statistic: PropTypes.number.isRequired,
  isCapital: PropTypes.bool,
  index: PropTypes.number,
};

CityItem.defaultProps = {
  isCapital: false,
  index: 0,
};

const styles = StyleSheet.create({
  cityItem: index => {
    const style = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      padding: 30,
    };

    if (index % 2 === 0) {
      style.backgroundColor = '#ce4478';
    }

    return style;
  },

  icon: {
    color: 'yellow',
  },
});
