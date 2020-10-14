import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/UserScreens/profile/profile-screen/';
import SettingsScreen from '../../screens/UserScreens/profile/settings-screen/';
import EditScreen from '../../screens/UserScreens/profile/edit-screen';
import {AppTabNavigator} from './user-tabnavigator';

const {Navigator, Screen} = createStackNavigator();

export default class ProfileNavigator extends Component {
  render() {
    return (
      <Navigator initialRouteName="ProfileScreen">
        <Screen name="ProfileScreen" component={ProfileScreen} />
        <Screen name="SettingsScreen" component={SettingsScreen} />
        <Screen name="EditScreen" component={EditScreen} />
      </Navigator>
    );
  }
}
