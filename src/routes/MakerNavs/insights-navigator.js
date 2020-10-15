import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InsightsScreen from '../../screens/MakerScreens/insights';

const {Navigator, Screen} = createStackNavigator();

export default class InsightsNavigator extends Component {
  render() {
    return (
      <Navigator headerMode={false} initialRouteName="InsightsScreen">
        <Screen name="InsightsScreen" component={InsightsScreen} />
      </Navigator>
    );
  }
}
