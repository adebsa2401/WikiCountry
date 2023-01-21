import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsPage from './src/pages/DetailsPage';
import HomePage from './src/pages/HomePage';
import store from './src/redux/configureStore';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Details" component={DetailsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
