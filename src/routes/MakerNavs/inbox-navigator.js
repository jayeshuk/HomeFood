import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/MakerScreens/home';

const {Navigator, Screen} = createStackNavigator();

export default class InboxNavigator extends Component {
  render() {
    return (
      <Navigator headerMode={false} initialRouteName="InboxScreen">
        <Screen name="InboxScreen" component={HomeScreen} />
      </Navigator>
    );
  }
}
