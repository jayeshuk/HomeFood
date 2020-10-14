import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HistoryScreen from '../../screens/UserScreens/history/history-screen/';
// import OrderDetails from '../../screens/UserScreens/history/orderdetails/';

const {Navigator, Screen} = createStackNavigator();

export default class HistoryNavigator extends Component {
  render() {
    return (
      <Navigator headerMode={false} initialRouteName="HistoryScreen">
        <Screen name="HistoryScreen" component={HistoryScreen} />
        {/* <Screen name="OrderDetails" component={OrderDetails} /> */}
      </Navigator>
    );
  }
}
