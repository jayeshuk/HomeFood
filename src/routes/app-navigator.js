import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MakerTabNavigator} from './MakerNavs/maker-tabnavigator';
import {UserTabNavigator} from './UserNavs/user-tabnavigator';
import TempSwitch from './TempSwitch';
import LoginScreen from '_screens_login';
import SignupScreen from '_screens_signup';
import {useSelector, useDispatch} from 'react-redux';

const {Navigator, Screen} = createStackNavigator();

function AppNavigator() {
  const logged_user = useSelector((state) => state.main_app.logged_user);
  const isLoggedIn = logged_user.token !== '' ? false : true;
  console.log('USER DATA FROM MAIN NAV:', logged_user);
  return (
    <NavigationContainer>
      <Navigator headerMode={false} initialRouteName="LoginScreen">
        {isLoggedIn ? (
          <>
            <Screen name="LoginScreen" component={LoginScreen} />
            <Screen name="SignupScreen" component={SignupScreen} />
          </>
        ) : logged_user.role == 'maker' ? (
          <>
            <Screen name="MakerTabNavigator" component={MakerTabNavigator} />
            <Screen name="TempSwitch" component={TempSwitch} />
          </>
        ) : (
          <>
            <Screen name="UserTabNavigator" component={UserTabNavigator} />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
