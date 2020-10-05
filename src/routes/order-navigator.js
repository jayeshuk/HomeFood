import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OrderScreen from '../screens/order';

const {Navigator, Screen} = createStackNavigator();

export default class OrderNavigator extends Component {
  render() {
    return (
      <Navigator headerMode={false} initialRouteName="OrderScreen">
        <Screen name="OrderScreen" component={OrderScreen} />
        {/* <Screen name="SettingsScreen" component={SettingsScreen} /> */}
      </Navigator>
    );
  }
}
