import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/';
import {AppTabNavigator} from './app-tabnavigator';
import SettingsScreen from '../screens/profile/settings-screen';


const {Navigator, Screen} = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode={false} initialRouteName="HomeScreen">
      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="AppTabNavigator" component={AppTabNavigator} />
      <Screen name="SettingsScreen" component={SettingsScreen} />

    </Navigator>
  </NavigationContainer>
);

