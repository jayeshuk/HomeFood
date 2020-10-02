import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '_screens/login';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      headerMode={false}
      initialRouteName="Login"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'My app'}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
