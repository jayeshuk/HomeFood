import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Layout} from '@ui-kitten/components';

import SettingsScreen from '../../screens/MakerScreens/settings/settings-screen';
import ProfileScreen from '../../screens/MakerScreens/settings/profile-screen';
import EditScreen from '../../screens/MakerScreens/settings/edit-screen';
import LanguageScreen from '../../screens/MakerScreens/settings/language-screen';
import TimeSetScreen from '../../screens/MakerScreens/settings/timeset-screen';
import HistoryScreen from '../../screens/MakerScreens/settings/history-screen';
import FeedbacksScreen from '../../screens/MakerScreens/settings/feedback-screen';
import SupportScreen from '../../screens/MakerScreens/settings/support-screen';
import LoginScreen from '../../screens/login';

const {Navigator, Screen} = createStackNavigator();

export default class SettingsNavigator extends Component {
  render() {
    return (
      <Navigator initialRouteName="SettingsScreen">
        <Screen name="SettingsScreen" component={SettingsScreen} />
        <Screen name="EditScreen" component={EditScreen} />
        <Screen name="ProfileScreen" component={ProfileScreen} />
        <Screen name="LanguageScreen" component={LanguageScreen} />
        <Screen name="TimeSetScreen" component={TimeSetScreen} />
        <Screen name="HistoryScreen" component={HistoryScreen} />
        <Screen name="FeedbacksScreen" component={FeedbacksScreen} />
        <Screen name="SupportScreen" component={SupportScreen} />
        <Screen name="LogoutScreen" component={LoginScreen} />
      </Navigator>
    );
  }
}
