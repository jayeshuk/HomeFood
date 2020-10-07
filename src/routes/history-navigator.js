import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HistoryScreen from '../screens/history';
import orderdetails from '../screens/history';

const {Navigator, Screen} = createStackNavigator();

export default class HistoryNavigator extends Component {
  render() {
    return (
      <Navigator headerMode={false} initialRouteName="HistoryScreen">
        <Screen name="HistoryScreen" component={HistoryScreen} />
        {/* <Screen name="SettingsScreen" component={SettingsScreen} /> */}
        <Screen name="orderdetails" component={orderdetails} />
      </Navigator>
    );
  }
}
