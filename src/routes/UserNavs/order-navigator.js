import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OrderScreen from '../../screens/UserScreens/order';
import MakerDetailsScreen from '../../screens/UserScreens/order/maker-details-screen';
import CartScreen from '../../screens/UserScreens/order/cart-screen';
import Pay from '../../screens/UserScreens/order/place-order';

const {Navigator, Screen} = createStackNavigator();

export default class OrderNavigator extends Component {
  render() {
    return (
      <Navigator headerMode={false} initialRouteName="OrderScreen">
        <Screen name="OrderScreen" component={OrderScreen} />
        <Screen name="MakerDetailsScreen" component={MakerDetailsScreen} />
        <Screen name="CartScreen" component={CartScreen} />
        <Screen name="Pay" component={Pay} />
        {/* <Screen name="SettingsScreen" component={SettingsScreen} /> */}
      </Navigator>
    );
  }
}
