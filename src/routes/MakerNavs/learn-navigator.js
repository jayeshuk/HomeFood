import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InsightsScreen from '../../screens/MakerScreens/insights';
import LearnScreen from '../../screens/MakerScreens/learn';
import PlayerScreen from '../../screens/MakerScreens/learn/learnplayer-screen';

const {Navigator, Screen} = createStackNavigator();

export default class LearnNavigator extends Component {
  render() {
    return (
      <Navigator headerMode={false} initialRouteName="InsightsScreen">
        <Screen name="LearnScreen" component={LearnScreen} />
        <Screen name="PlayerScreen" component={PlayerScreen} />
      </Navigator>
    );
  }
}
