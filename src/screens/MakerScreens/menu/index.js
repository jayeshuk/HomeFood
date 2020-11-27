import React, {Component} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  CheckBox,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button,
  Input,
  List,
  MenuItem,
  Card,
  Modal,
} from '@ui-kitten/components';

import {
  selectDish,
  deselectDish,
  addCategory,
  toggleCategoryModal,
  checkDish,
  categoryInput,
} from '_redux_store/actions';

import {add, cos} from 'react-native-reanimated';
import {connect} from 'react-redux';
// import {useDispatch, useSelector} from 'react-redux';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const {width: screenWidth} = Dimensions.get('window');

const ForwardIcon = (props) => (
  <Icon {...props} name="arrow-ios-forward" pack="eva" />
);
const DiningIcon = (props) => (
  <Icon
    {...props}
    style={{fontSize: 25, color: 'grey'}}
    name="local-dining"
    pack="material"
  />
);
const PlusIcon = (props) => {
  return (
    <Icon
      {...props}
      style={[
        props.style,
        {
          marginHorizontal: 0,
        },
      ]}
      name="plus-circle"
      pack="eva"
    />
  );
};
const CrossIcon = (props) => {
  return (
    <Icon
      {...props}
      style={[
        props.style,
        {
          marginHorizontal: 0,
          backgroundColor: 'red',
          size: 20,
        },
      ]}
      name="close-circle"
      pack="eva"
    />
  );
};

// Do this creating a new ACTION
const setActiveChecked = (check) => {
  this.setState({activeChecked: check});
};

class Menu extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   // activeChecked: false,
    //   // modal: false,
    //   newCategoryTitle: '',
    // };
  }

  render() {
    // console.log(this.props);

    const NewCategory = () => {
      return (
        <Button
          accessoryLeft={PlusIcon}
          onPress={() => this.props.changeCategoryModal(true)}
          appearance="filled"
          status="control">
          New Category
        </Button>
      );
    };

    const renderCard = (menu) => {
      return (
        <Card
          style={styles.item}
          status="warning"
          header={(headerProps) => (
            <View
              style={{
                backgroundColor: '#DDDDDD',
              }}>
              <MenuItem
                accessoryLeft={DiningIcon}
                accessoryRight={ForwardIcon}
                onPress={() =>
                  this.props.navigation.navigate('CategoryDetailsScreen', {
                    categoryName: menu.item.categoryName,
                    dishes: menu.item.dishes || null,
                  })
                }
                title={(evaProps) => (
                  <Text
                    {...evaProps}
                    category="h5"
                    style={{
                      padding: 6,
                      color: 'grey',
                      width: '80%',
                    }}>
                    {menu.item.categoryName}
                  </Text>
                )}
              />
            </View>
          )}>
          <View style={styles.listcontainer}>
            {menu.item.dishes ? (
              menu.item.dishes.map((dish, index) => {
                return (
                  <CheckBox
                    key={index}
                    status="success"
                    style={styles.checkbox}
                    checked={dish.available}
                    onChange={this.props.checkDish({catId: 0, dishId: dish.id})}
                    // {...dish.available}
                  >
                    {(evaProps) => (
                      <Text
                        category="s2"
                        style={{
                          marginLeft: 6,
                          color: 'grey',
                        }}>
                        {dish.name}
                      </Text>
                    )}
                  </CheckBox>
                );
              })
            ) : (
              <Text>No Dishes Added</Text>
            )}
          </View>
        </Card>
      );
    };

    return (
      <Layout style={styles.container} level="1">
        <TopNavigation
          style={{
            maxHeight: '10%',
          }}
          title={(TextProps) => {
            return (
              <Text
                style={{
                  marginLeft: 10,
                }}
                category="h2"
                status="primary">
                Menu
              </Text>
            );
          }}
          accessoryRight={NewCategory}
          alignment="start"
        />
        <Divider />
        <Modal
          visible={this.props.CategoryModal}
          // visible={true}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => this.props.changeCategoryModal(false)}>
          <Card disabled={true} status="warning">
            <View
              style={{
                // backgroundColor: 'blue',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '15%',
                alignSelf: 'flex-end',
                position: 'absolute',
                marginRight: 0,
              }}>
              <Icon
                style={{
                  height: 25,
                  width: 25,
                  tintColor: '#808080',
                  margin: 10,
                  marginRight: 20,
                }}
                name="close"
                pack="eva"
                onPress={() => this.props.changeCategoryModal(false)}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                height: ITEM_HEIGHT,
                width: ITEM_WIDTH,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: 'center',
                  color: 'grey',
                  fontWeight: 'bold',
                }}>
                Add New Category
              </Text>
              <Input
                textStyle={{color: 'grey'}}
                // caption={(evaProps) => <Text {...evaProps}>Caption</Text>}
                status="basic"
                placeholder="Name"
                value={this.props.newCategoryTitle}
                onChangeText={(value) => this.props.categoryInput(value)}
              />
              <Button
                onPress={() => {
                  this.props.addCategory(this.props.newCategoryTitle);
                  this.props.changeCategoryModal(false);
                }}>
                ADD
              </Button>
            </View>
          </Card>
        </Modal>
        <Layout
          style={{
            flex: 1,
            width: '100%',
          }}
          level="1">
          <List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={this.props.menu}
            renderItem={renderCard}
          />
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.maker_menu.menu,
    newCategoryTitle: state.maker_menu.newCategoryTitle,
    CategoryModal: state.maker_menu.CategoryModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (name) => dispatch(addCategory(name)),
    categoryInput: (name) => dispatch(categoryInput(name)),
    changeCategoryModal: (item) => dispatch(toggleCategoryModal(item)),
    checkDish: (ids) => dispatch(checkDish(ids)),
  };
  // deleteItem: id => dispatch(ACTIONS.deleteItem(id))
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'red',
    // alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
    borderRadius: 10,
  },
  checkbox: {
    width: '100%',
    padding: 4,
  },
  listcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-around',
    // backgroundColor: 'red',
    flexWrap: 'wrap',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
