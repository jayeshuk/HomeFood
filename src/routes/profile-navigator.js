import React, { Component } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from '../screens/profile/profile-screen/index';
import {SettingsScreen} from '../screens/profile/settings-screen/index';
import {AppTabNavigator} from './app-tabnavigator';

const {Navigator, Screen} = createStackNavigator();


export default class ProfileNavigator extends Component {
    render() {
        return (
    <Navigator headerMode={false} initialRouteName="ProfileScreen">
      <Screen name="ProfileScreen" component={ProfileScreen} />
      {/* <Screen name="EditProfileScreen" component={EditProfileScreen} /> */}
      {/* <Screen name="SettingsScreen" component={SettingsScreen} /> */}
    </Navigator>
        )
    }
}
