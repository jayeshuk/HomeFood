import React from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
// import {NavigationContainer} from '@react-navigation/native';
import {Text, Layout} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OrderNavigator from './order-navigator';
import HistoryNavigator from './history-navigator';
import ProfileNavigator from './profile-navigator';

const OrderIcon = (props) => <Icon {...props} name="home" pack="material" />;
const HistoryIcon = (props) => <Icon {...props} name="clipboard" pack="eva" />;
const ProfileIcon = (props) => (
  <Icon {...props} name="person" pack="material" />
);

const {Navigator, Screen} = createBottomTabNavigator();

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return {selectedIndex, onSelect: setSelectedIndex};
};

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    appearance="noIndicator"
    style={styles.bottomNavigation}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="ORDER" icon={OrderIcon} />
    <BottomNavigationTab title="HISTORY" icon={HistoryIcon} />
    <BottomNavigationTab title="PROFILE" icon={ProfileIcon} />
  </BottomNavigation>
);

export const AppTabNavigator = () => {
  const topState = useBottomNavigationState();
  const bottomState = useBottomNavigationState();

  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen
        name="OrderNavigator"
        options={{title: 'Order Khamang'}}
        component={OrderNavigator}
      />
      <Screen
        name="HistoryNavigator"
        options={{title: 'Order History'}}
        component={HistoryNavigator}
      />

      <Screen name="ProfileNavigator" component={ProfileNavigator} />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 50,
  },
});
