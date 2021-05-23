import React, {useState, useEffect} from 'react';
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
import axios from 'react-native-axios';
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.',
  'Warning: Non-serializable values were found in the navigation state.',
]); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

function Menu({navigation}) {
  // console.log('Menu Rendered');
  const ReRender = () => {
    LoadCategories();
  };
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.maker_menu.menu);
  const maker_id = useSelector((state) => state.main_app.logged_user.id);
  const doCheckDish = (ids) => dispatch(checkDish(ids));
  const [categoryModal, setCategoryModal] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [loadedMenuId, setLoadedMenuId] = useState('');
  const [categories, setCategories] = useState([]);
  var update_data = JSON.stringify({title: categoryTitle, dishes: []});
  // console.log('Maker_ID:', maker_id);

  var load_config = {
    method: 'get',
    url: `http://192.168.0.108:3000/api/v1/menus/${maker_id}`,
    headers: {},
  };

  var update_config = {
    method: 'patch',
    url: `http://192.168.0.108:3000/api/v1/menus/${maker_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: update_data,
  };

  const ToggleDish = async (did, avail, catname) => {
    var update_dish_data = JSON.stringify({
      available: avail,
      menu_id: loadedMenuId,
      category_name: catname,
    });
    var update_config = {
      method: 'patch',
      url: `http://192.168.0.108:3000/api/v1/dishes/${did}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: update_dish_data,
    };

    await axios(update_config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        ReRender();
      })
      .catch(function (error) {
        console.log(error);
        window.alert('Something went wrong. Enter valid details');
      });
  };
  const LoadCategories = async () => {
    await axios(load_config)
      .then(function (res) {
        // console.log(JSON.stringify(res.data));
        // let json = res.json();
        // console.log('Menu Res.Data:- ', JSON.stringify(res.data.data.menu));
        if (res.data.data) {
          setLoadedMenuId(res.data.data.id);
          console.log('MENU_ID:', loadedMenuId);
          setCategories(res.data.data.menu);
          // console.log('LOADED:', res.data.data.menu);
        }
      })
      .catch(function (error) {
        console.log(error.message);
        // window.alert(error.message);
      });
  };
  const UpdateCategories = async () => {
    await axios(update_config)
      .then(function (res) {
        console.log('Hello I Reached Here');
        // console.log(JSON.stringify(res.data));
        // let json = res.json();
        // console.log(res);
        // console.log('Menu Res.Data:- ', JSON.stringify(res.data.data.menu));
        setCategories(res.data.data.menu.categories);
        console.log('UPDATED:', res.data.data.menu);
        // console.log('Saved Value:', categories);
      })
      .catch(function (error) {
        console.log(error);
        window.alert(error.message);
      });
  };

  const renderCard = (categories) => {
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
                  categoryName: categories.item.title,
                  dishes: categories.item.dishes || null,
                  menu_id: loadedMenuId,
                  maker_id: maker_id,
                  onGoBack: () => ReRender(),
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
                  {categories.item.title}
                </Text>
              )}
            />
          </View>
        )}>
        <View style={styles.listcontainer}>
          {categories.item.dishes.length ? (
            categories.item.dishes.map((dish, index) => {
              return (
                <CheckBox
                  key={index}
                  status="success"
                  style={styles.checkbox}
                  checked={dish.available}
                  onChange={() => {
                    ToggleDish(dish._id, !dish.available, dish.category_name);
                  }}
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

  const changeModal = () => {
    setCategoryModal(false);
  };

  useEffect(() => {
    LoadCategories();
  }, []);

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
        onBackdropPress={changeModal}>
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
              placeholder="Name (Eg: Breads, Starters,etc)"
              value={categoryTitle}
              onChangeText={setCategoryTitle}
            />
            <Button
              onPress={() => {
                UpdateCategories();
                setCategoryModal(false);
                setCategoryTitle('');
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
        {categories.length ? (
          <List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={categories}
            renderItem={renderCard}
          />
        ) : (
          <View>
            <Text
              category="s1"
              style={{alignSelf: 'center', margin: 10, fontSize: 20}}>
              No Categories Added
            </Text>
          </View>
        )}
      </Layout>
      <Text appearance="hint" style={{alignSelf: 'center', padding: 2}}>
        Note: Check dishes currently available with you.
      </Text>
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
