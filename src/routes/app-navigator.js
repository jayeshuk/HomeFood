import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MakerTabNavigator} from './MakerNavs/maker-tabnavigator';
import {UserTabNavigator} from './UserNavs/user-tabnavigator';
import TempSwitch from './TempSwitch';
import LoginScreen from '_screens_login';
import SignupScreen from '_screens_signup';

const {Navigator, Screen} = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode={false} initialRouteName="LoginScreen">
      <Screen name="LoginScreen" component={LoginScreen} />
      <Screen name="SignupScreen" component={SignupScreen} />
      <Screen name="UserTabNavigator" component={UserTabNavigator} />
      <Screen name="MakerTabNavigator" component={MakerTabNavigator} />
      <Screen name="TempSwitch" component={TempSwitch} />
    </Navigator>
  </NavigationContainer>
);
