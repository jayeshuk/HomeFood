import React, {Component} from 'react';
import {Dimensions, View, StyleSheet, ScrollView} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Toggle,
} from '@ui-kitten/components';

const OrderIcon = (props) => {
  return <Icon {...props} name="home" pack="eva" />;
};
function SearchIcon(props) {
  return <Icon {...props} name="search-outline" pack="eva" />;
}

export default () => {
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
  const {width: screenWidth} = Dimensions.get('window');

  const [shopEnabled, setShopEnabled] = React.useState(false);

  const toggleShop = () => {
    setShopEnabled(!shopEnabled);
  };

  const renderRightActions = () => (
    <Toggle
      status="success"
      style={{paddingRight: 15, paddingTop: 5}}
      checked={shopEnabled}
      onPress={toggleShop}
      onChange={toggleShop}
    />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation
        style={{paddingLeft: 20}}
        title={(TextProps) => {
          return (
            <Text category="h2" status="primary">
              Khamang's &nbsp; Cook
            </Text>
          );
        }}
        accessoryRight={renderRightActions}
        alignment="start"
      />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category="h5">Waiting for Orders to Recieve...</Text>
        <Text category="h5">{String(shopEnabled)} </Text>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
