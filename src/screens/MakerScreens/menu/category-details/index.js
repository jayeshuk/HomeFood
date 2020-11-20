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
  OverflowMenu,
  MenuItem,
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

class CategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.route.params.title,
      dishes: this.props.route.params.dishes,
      visible: false,
      index: null,
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
    const overFlowMenu = (props) => {
      return (
        <OverflowMenu
          anchor={moreVerticalIcon}
          visible={this.state.visible}
          selectedIndex={this.state.index}
          onSelect={onItemSelect}
          onBackdropPress={() => this.setState({visible: false})}>
          <MenuItem
            title={(TextProps) => {
              return (
                <Text style={[TextProps.style, styles.overflowItem]}>
                  Edit Category
                </Text>
              );
            }}
          />
          <MenuItem
            title={(TextProps) => {
              return (
                <Text style={[TextProps.style, styles.overflowItem]}>
                  Delete Category
                </Text>
              );
            }}
          />
        </OverflowMenu>
      );
    };

    const moreVerticalIcon = () => {
      return (
        <Icon
          style={{
            height: 25,
            width: 25,
            tintColor: '#808080',
            margin: 10,
          }}
          name="more-vertical"
          pack="eva"
          onPress={() => this.setState({visible: true})}
        />
      );
    };

    const backIcon = (props) => {
      return (
        <Icon
          style={{
            height: 30,
            width: 30,
            tintColor: '#808080',
            // backgroundColor: 'blue',
          }}
          onPress={() => this.props.navigation.goBack()}
          name="arrow-ios-back"
          pack="eva"
        />
      );
    };

    const onItemSelect = (ind) => {
      this.setState({index: ind, visible: false});
    };

    return (
      <Layout style={styles.container}>
        <TopNavigation
          style={{
            maxHeight: '10%',
            maxWidth: SLIDER_WIDTH,
          }}
          title={(TextProps) => {
            return (
              <Text category="h5" status="primary">
                {this.state.title}
              </Text>
            );
          }}
          accessoryRight={overFlowMenu}
          accessoryLeft={backIcon}
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
  overflowItem: {
    color: 'grey',
  },
});

export default CategoryDetails;
