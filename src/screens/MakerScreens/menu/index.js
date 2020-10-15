import React, {Component} from 'react';
import {Dimensions, View, StyleSheet, ScrollView} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button,
  List,
  ListItem,
} from '@ui-kitten/components';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const {width: screenWidth} = Dimensions.get('window');
const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const renderItemAccessory = (props) => <Button size="tiny">FOLLOW</Button>;

const renderItemIcon = (props) => <Icon {...props} name="person" pack="eva" />;

const renderItem = ({item, index}) => (
  <ListItem
    title={`${item.title} ${index + 1}`}
    description={`${item.description} ${index + 1}`}
    accessoryLeft={renderItemIcon}
    accessoryRight={renderItemAccessory}
  />
);

class Menu extends Component {
  render() {
    return (
      <Layout style={styles.container} level="1">
        <TopNavigation
          // style={{paddingLeft: 20}}
          title={(TextProps) => {
            return (
              <Text category="h2" status="primary">
                Menu
              </Text>
            );
          }}
          alignment="start"
        />
        <Divider />
        <Layout style={{flex: 1}} level="1">
          {/* <Text category="h5">This is your Menu!</Text> */}
          <List
            style={{
              flex: 1,
              width: '100%',
              position: 'absolute',
            }}
            data={data}
            renderItem={renderItem}
          />
        </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
  },
});

export default Menu;
