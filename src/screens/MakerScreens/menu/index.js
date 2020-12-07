import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Divider,
  Layout,
  CheckBox,
  Text,
  TopNavigation,
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
  checkDish,
} from '_redux_store/actions';
import {ForwardIcon, DiningIcon, PlusIcon, CloseIcon} from './extras/icons';
import {ITEM_WIDTH, ITEM_HEIGHT, width} from '_utils/dimensions';
import {useSelector, useDispatch} from 'react-redux';

// Do this creating a new ACTION

function Menu({navigation}) {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.maker_menu.menu);

  const addNewCategory = (name) => dispatch(addCategory(name));
  const doCheckDish = (ids) => dispatch(checkDish(ids));
  const [categoryModal, setCategoryModal] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');

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
              onPress={() => {
                navigation.navigate('CategoryDetailsScreen', {
                  categoryName: menu.item.categoryName,
                  dishes: menu.item.dishes || null,
                });
              }}
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
                  onChange={() => doCheckDish({catId: 0, dishId: dish.id})}
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

  const NewCategoryButton = () => {
    return (
      <Button
        accessoryLeft={PlusIcon}
        onPress={() => setCategoryModal(true)}
        appearance="filled"
        status="control">
        New Category
      </Button>
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
        accessoryRight={NewCategoryButton}
        alignment="start"
      />
      <Divider />
      <Modal
        visible={categoryModal}
        // visible={true}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setCategoryModal(false)}>
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
            <CloseIcon setModal={setCategoryModal} />
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
              value={categoryTitle}
              onChangeText={(value) => setCategoryTitle(value)}
            />
            <Button
              onPress={() => {
                addNewCategory(categoryTitle);
                setCategoryModal(false);
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
          data={menu}
          renderItem={renderCard}
        />
      </Layout>
    </Layout>
  );
}

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

export default Menu;
