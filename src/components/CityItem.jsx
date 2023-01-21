import React from 'react';
import PropTypes from 'prop-types';
// import {AiFillStar} from 'react-icons/ai';
import {Text, View} from 'react-native';

export default function CityItem({name, statistic, isCapital, index}) {
  return (
    <View className={`city-item ${index % 2 === 0 ? 'city-item-even' : ''}`}>
      <Text className="city-name">{name}</Text>
      {/* {isCapital && (
        <AiFillStar style={{color: 'yellow', marginRight: 'auto'}} />
      )} */}
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
