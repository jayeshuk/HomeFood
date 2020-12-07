import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from '_screens/MakerScreens/menu';
import CategoryDetailsScreen from '_screens/MakerScreens/menu/category-details';

const {Navigator, Screen} = createStackNavigator();

export default class MenuNavigator extends Component {
  render() {
    return (
      <Navigator headerMode={false} initialRouteName="MenuScreen">
        <Screen name="MenuScreen" component={MenuScreen} />
        <Screen
          name="CategoryDetailsScreen"
          component={CategoryDetailsScreen}
        />
      </Navigator>
    );
  }
}
