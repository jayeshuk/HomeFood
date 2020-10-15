import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from '../../screens/MakerScreens/menu';

const {Navigator, Screen} = createStackNavigator();

export default class MenuNavigator extends Component {
  render() {
    return (
      <Navigator headerMode={false} initialRouteName="InboxScreen">
        <Screen name="MenuScreen" component={MenuScreen} />
      </Navigator>
    );
  }
}
