import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MakerTabNavigator} from './MakerNavs/maker-tabnavigator';
import {AppTabNavigator} from './UserNavs/user-tabnavigator';
import LoginScreen from '../screens/login';
import SignupScreen from '../screens/signup';

const {Navigator, Screen} = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode={false} initialRouteName="HomeScreen">
      {/* <Screen name="LoginScreen" component={LoginScreen} />
      <Screen name="SignupScreen" component={SignupScreen} /> */}
      <Screen name="AppTabNavigator" component={AppTabNavigator} />
      {/* <Screen name="MakerTabNavigator" component={MakerTabNavigator} /> */}
    </Navigator>
  </NavigationContainer>
);
