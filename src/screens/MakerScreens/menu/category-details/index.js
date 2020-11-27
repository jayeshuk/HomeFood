import React, {Component} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Modal,
  MenuItem,
  OverflowMenu,
  Text,
  Tooltip,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {
  selectDish,
  deselectDish,
  addCategory,
  toggleDishModal,
  checkDish,
  dishInput,
  dishInput2,
  toggleCategoryMenu,
} from '_redux_store/actions';
import {connect} from 'react-redux';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const {width: screenWidth} = Dimensions.get('window');

class CategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null,
    };
    console.log(this.props.route.params);
  }

  render() {
    let index = null;
    const onItemSelect = (item) => {
      index = item;
      this.props.changeCategoryMenu(false);
    };

    const EditDeleteIcon = (props) => {
      return (
        <View style={{flexDirection: 'row'}}>
          <Icon {...props} name="edit" pack="eva" />
          <Icon {...props} name="trash-2" pack="eva" />
        </View>
      );
    };

    const AddIcon = (props) => {
      return (
        <Icon
          style={{
            height: 30,
            width: 30,
            tintColor: '#FEA12E',
            margin: 10,
          }}
          name="plus"
          pack="eva"
        />
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

    const moreVerticalIcon = () => {
      return (
        <Icon
          style={{
            height: 28,
            width: 28,
            tintColor: '#808080',
            margin: 10,
            // backgroundColor: 'red',
          }}
          name="more-vertical"
          pack="eva"
          onPress={() => this.props.changeCategoryMenu(true)}
        />
      );
    };

    const renderItem = ({item, index}) => (
      <ListItem
        accessoryLeft={Thumbnail}
        accessoryRight={EditDeleteIcon}
        title={item.name}
        description={item.description}
      />
    );

    const backDropPress = () => {
      this.props.changeCategoryMenu(false);
      this.props.changeDishModal(false);
    };

    const handleSubmitDish = () => {
      this.props.addCategory({
        title: this.props.newDishTitle,
        description: this.props.newDishDescription,
      });
      this.props.changeDishModal(false);
    };

    const overFlowMenu = (props) => {
      return (
        <OverflowMenu
          anchor={moreVerticalIcon}
          visible={this.props.CategoryMenu}
          selectedIndex={index}
          onSelect={onItemSelect}
          onBackdropPress={backDropPress}>
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

    // const handleAddDishButton = () => {
    //   this.props.changeDishModal(true);
    // };

    const renderAddButton = () => {
      return (
        <Button
          style={{
            width: '10%',
            height: '10%',
            borderRadius: 50,
            position: 'absolute',
          }}
          size="giant"
          appearance="filled"
          status="control"
          accessoryLeft={AddIcon}
          onPress={() => this.props.changeDishModal(true)}
        />
      );
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
                {this.props.route.params.categoryName}
              </Text>
            );
          }}
          accessoryRight={overFlowMenu}
          accessoryLeft={backIcon}
          alignment="start"
        />

        <Divider />

        <Modal
          visible={this.props.DishModal}
          // visible={true}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => this.props.changeDishModal(false)}>
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
                onPress={() => this.props.changeDishModal(false)}
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
                Add New Dish
              </Text>
              <Input
                textStyle={{color: 'grey'}}
                // caption={(evaProps) => <Text {...evaProps}>Caption</Text>}
                status="basic"
                placeholder="Dish Name"
                value={this.props.newDishTitle}
                onChangeText={(value) => this.props.dishInput(value)}
              />
              <Input
                multiline={true}
                textStyle={{color: 'grey'}}
                // caption={(evaProps) => <Text {...evaProps}>Caption</Text>}
                status="basic"
                placeholder="Description"
                value={this.props.newDishDescription}
                onChangeText={(value) => this.props.dishInput2(value)}
              />

              <Button onPress={handleSubmitDish}>ADD</Button>
            </View>
          </Card>
        </Modal>

        <Layout>
          {this.props.route.params.dishes ? (
            <List
              style={styles.listcontainer}
              data={this.props.route.params.dishes}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            />
          ) : (
            <View>
              <Text
                category="s1"
                style={{alignSelf: 'center', margin: 10, fontSize: 20}}>
                No Dishes Added
              </Text>
            </View>
          )}
        </Layout>
        <TouchableOpacity style={styles.addDishButton}>
          <Tooltip
            anchor={renderAddButton}
            visible={this.props.Tooltip}
            placement="left start"
            onBackdropPress={backDropPress}>
            Add New Dish
          </Tooltip>
        </TouchableOpacity>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.maker_menu.menu,
    newDishTitle: state.maker_menu.newDishTitle,
    newDishDescription: state.maker_menu.newDishDescription,
    DishModal: state.maker_menu.DishModal,
    Tooltip: state.maker_menu.Tooltip,
    CategoryMenu: state.maker_menu.CategoryMenu,
    // categoryName: this.props.route.params.categoryName,
    // dishes: this.props.route.params.dishes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDish: (name) => dispatch(addDish(name)),
    dishInput: (input) => dispatch(dishInput(input)),
    dishInput2: (input) => dispatch(dishInput2(input)),
    changeCategoryMenu: (item) => dispatch(toggleCategoryMenu(item)),
    changeDishModal: (item) => dispatch(toggleDishModal(item)),
  };
  // deleteItem: id => dispatch(ACTIONS.deleteItem(id))
};

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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  addDishButton: {
    position: 'absolute',
    zIndex: 11,
    right: '10%',
    bottom: '5%',
    width: '14%',
    height: '8%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    backgroundColor: 'red',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);
