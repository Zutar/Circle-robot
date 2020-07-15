/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Connection} from '../screens/Connection';
import {Controller} from '../screens/Controller';

const Stack = createStackNavigator();
export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'Connection'}
    screenOptions={{
      cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1,
      },
      headerShown: false,
      }}
    >
      <Stack.Screen name={'Connection'} component={Connection}/>
      <Stack.Screen name={'Controller'} component={Controller}/>
    </Stack.Navigator>
  );
};
