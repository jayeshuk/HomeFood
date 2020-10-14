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
// import OrderNavigator from './order-navigator';
// import HistoryNavigator from './history-navigator';
import ProfileNavigator from '../UserNavs/profile-navigator';
import Home from './Home';
import HomeScreen from '../../screens/MakerScreens/home';

const HomeIcon = (props) => <Icon {...props} name="home" pack="material" />;
const InboxIcon = (props) => <Icon {...props} name="inbox" pack="eva" />;
const LearnIcon = (props) => <Icon {...props} name="video" pack="eva" />;
// const LearnIcon = (props) => <Icon {...props} name="book-open" pack="eva" />;
const ProfileIcon = (props) => (
  <Icon {...props} name="person" pack="material" />
);

const {Navigator, Screen} = createBottomTabNavigator();

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return {selectedIndex, onSelect: setSelectedIndex};
};

const BottomTabBar = ({navigation, state}) => (
  <Layout>
    <BottomNavigation
      appearance="noIndicator"
      style={styles.bottomNavigation}
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title="HOME" icon={HomeIcon} />
      <BottomNavigationTab title="ORDERS" icon={InboxIcon} />
      <BottomNavigationTab title="LEARN" icon={LearnIcon} />
      <BottomNavigationTab title="PROFILE" icon={ProfileIcon} />
    </BottomNavigation>
  </Layout>
);

export const MakerTabNavigator = () => {
  const topState = useBottomNavigationState();
  const bottomState = useBottomNavigationState();

  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen
        name="HomeNavigator"
        options={{title: 'Order Khamang'}}
        component={HomeScreen}
      />
      <Screen
        name="InboxNavigator"
        options={{title: 'Orders Received'}}
        component={Home}
      />
      <Screen
        name="LearnNavigator"
        options={{title: 'Learn, Cook and Earn'}}
        component={Home}
      />
      <Screen name="ProfileNavigator" component={ProfileNavigator} />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    // position: 'absolute',
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 50,
    elevation: 5,
  },
});
