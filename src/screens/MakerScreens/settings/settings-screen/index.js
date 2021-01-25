import React from 'react';
import {StyleSheet} from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  Layout,
  Toggle,
  Text,
  Icon,
  Divider,
  Menu,
  MenuItem,
} from '@ui-kitten/components';
import {CommonActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {logUserOut} from '_redux_store/actions';

export default ({navigation}) => {
  const [soundEnabled, setSoundEnabled] = React.useState(false);
  const navigateBack = () => {
    navigation.goBack();
  };

  // const handlePress = (screenName) => {
  //   navigation.navigate(screenName);
  // };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const LogoutIcon = (props) => <Icon {...props} name="person" pack="eva" />;
  const ForwardIcon = (props) => (
    <Icon {...props} name="arrow-ios-forward" pack="eva" />
  );

  const dispatch = useDispatch();
  const LogUserOut = () => dispatch(logUserOut());

  const settingsIndex = [
    {
      name: 'My Profile',
      iconname: 'person',
      screen: 'ProfileScreen',
    },
    {
      name: 'Select Language',
      iconname: 'translate',
      screen: 'LanguageScreen',
    },
    {
      name: 'Schedule Order Time',
      iconname: 'hourglass-top',
      screen: 'TimeSetScreen',
    },
    {
      name: 'Order History',
      iconname: 'history',
      screen: 'HistoryScreen',
    },
    {
      name: 'Dark Mode',
      iconname: 'nights-stay',
      screen: null,
    },
    {
      name: 'Feedbacks',
      iconname: 'feedback',
      screen: 'FeedbacksScreen',
    },
    {
      name: 'Support',
      iconname: 'support-agent',
      screen: 'SupportScreen',
    },
    {
      name: 'Logout',
      iconname: 'directions-run',
      screen: 'LogoutScreen',
    },
  ];

  // const SettingsAction = () => <TopNavigationAction icon={SettingsIcon} />;
  return (
    <Layout style={styles.container} level="1">
      <TopNavigation
        title={(TextProps) => {
          return (
            <Text {...TextProps} category="h2" status="primary" style={{}}>
              Settings
            </Text>
          );
        }}
        // accessoryLeft={BackAction}
        alignment="start"
      />
      <Divider />
      <Layout style={{flex: 1}} level="1">
        <Menu style={styles.menu}>
          {settingsIndex.map((item, index) => {
            return (
              <MenuItem
                key={index}
                accessoryLeft={(props) => (
                  <Icon
                    {...props}
                    style={{fontSize: 25, color: 'grey'}}
                    name={item.iconname}
                    pack="material"
                  />
                )}
                accessoryRight={ForwardIcon}
                onPress={() =>
                  item.screen !== 'LogoutScreen'
                    ? navigation.navigate(item.screen)
                    : LogUserOut()
                }
                title={(evaProps) => (
                  <Text
                    {...evaProps}
                    category="h6"
                    style={{
                      padding: 6,
                      color: 'grey',
                      width: '80%',
                    }}>
                    {item.name}
                  </Text>
                )}
              />
            );
          })}
          <Divider />
        </Menu>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    marginLeft: 4,
    width: '100%',
    position: 'absolute',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
