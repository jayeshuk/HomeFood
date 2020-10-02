import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/';
import {AppTabNavigator} from './app-tabnavigator';

const {Navigator, Screen} = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode={false} initialRouteName="HomeScreen">
      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="AppTabNavigator" component={AppTabNavigator} />
    </Navigator>
  </NavigationContainer>
);
