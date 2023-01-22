import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Icon} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {filterItems} from '../redux/filter/filter';

export default function Filter() {
  const {limit, ge} = useSelector(state => state.itemsFilter);
  const dispatch = useDispatch();

  return (
    <View style={styles.filterContainer}>
      <Text>Population</Text>
      <Icon
        name={ge ? 'angle-right' : 'angle-left'}
        type="font-awesome"
        onPress={() => dispatch(filterItems(limit, !ge))}
      />
      <TextInput
        value={`${limit / 1000 || 0}`}
        maxLength={7}
        keyboardType="numeric"
        onChangeText={text =>
          dispatch(filterItems(parseInt(text, 10) * 1000, ge))
        }
      />
      <Text>000</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 'auto',
    padding: 10,
  },
});
