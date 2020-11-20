import React, {Component} from 'react';
import {Dimensions, View, StyleSheet, ScrollView} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  List,
  ListItem,
  Avatar,
} from '@ui-kitten/components';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const {width: screenWidth} = Dimensions.get('window');

const DeleteIcon = (props) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Icon {...props} name="edit" pack="eva" />
      <Icon {...props} name="trash-2" pack="eva" />
    </View>
  );
};

const Thumbnail = (props) => {
  return (
    <Avatar
      style={styles.avatar}
      shape="square"
      source={require('../../../../assets/images/halwa.jpg')}
    />
  );
};

const AddDish = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      {/* <Icon name="trash-2" pack="eva" /> */}
      <Text category="h5"> + Add a Dish </Text>
    </View>
  );
};

class CategoryDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.route.params.title,
      dishes: this.props.route.params.dishes,
    };

    console.log(this.props.route.params);
  }

  render() {
    const renderItem = ({item, index}) => (
      <ListItem
        accessoryLeft={Thumbnail}
        accessoryRight={DeleteIcon}
        title={item.name}
        description={item.description}
      />
    );

    return (
      <Layout style={styles.container}>
        <TopNavigation
          // style={{paddingLeft: 20}}
          title={(TextProps) => {
            return (
              <Text
                // style={{backgroundColor: 'red'}}
                category="h2"
                status="primary">
                {this.state.title}
              </Text>
            );
          }}
          accessoryRight={AddDish}
          alignment="start"
        />
        <Divider />
        <Layout>
          <List
            style={styles.listcontainer}
            data={this.state.dishes}
            ItemSeparatorComponent={Divider}
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
  },
  listcontainer: {},
  avatar: {
    margin: 4,
  },
});

export default CategoryDetails;
