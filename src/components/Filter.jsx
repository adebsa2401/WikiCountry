import React from 'react';
// import {FaGreaterThanEqual, FaLessThanEqual} from 'react-icons/fa';
import {Button, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {filterItems} from '../redux/filter/filter';

export default function Filter() {
  const {limit, ge} = useSelector(state => state.itemsFilter);
  const dispatch = useDispatch();

  return (
    <View className="filter-container">
      <Text>Population</Text>
      <Button
        title="Filter"
        className="filter-sign-button"
        type="button"
        onClick={() => dispatch(filterItems(limit, !ge))}>
        {/* {ge ? <FaGreaterThanEqual /> : <FaLessThanEqual />} */}
      </Button>
      {/* <TextInput
        className="filter-input"
        // type="number"
        value={limit / 1000}
        min={0}
        onChange={event => dispatch(filterItems(event.target.value * 1000, ge))}
      /> */}
      <Text>000</Text>
    </View>
  );
}
