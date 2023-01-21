import React from 'react';
import PropTypes from 'prop-types';
// import {FaMicrophone} from 'react-icons/fa';
// import {FiSettings} from 'react-icons/fi';
// import {IoIosArrowBack} from 'react-icons/io';
import {Text, View} from 'react-native';

export default function Header({navigation, title, showBackButton}) {
  return (
    <View>
      {/* {showBackButton && <IoIosArrowBack onClick={() => navigation.goBack()} />} */}
      <Text>{title}</Text>
      {/* <FaMicrophone /> */}
      {/* <FiSettings /> */}
    </View>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showBackButton: PropTypes.bool,
};

Header.defaultProps = {
  showBackButton: false,
};
