import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
import {useSelector} from 'react-redux';
import {SLIDER_WIDTH} from '_utils/dimensions';
import {BackIcon, MoreVerticalIcon, AddIcon} from '../extras/icons';
import axios from 'react-native-axios';
import DishModal from './dishModal';

function CategoryDetails({route, navigation}) {
  const ReRender = () => {
    LoadCategories();
  };
  const {categoryName, menu_id, onGoBack, maker_id} = route.params;
  //   console.log(categoryName, dishes);

  const menu = useSelector((state) => state.maker_menu.menu);
  const [cats, setCats] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [dishId, setDishId] = useState();
  const [dishModal, setDishModal] = useState(false);
  const [catMenu, setCatMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState();
  const [load, setLoad] = useState(false);

  var data = JSON.stringify({id: menu_id, title: categoryName});
  var del_cat_config = {
    method: 'delete',
    url: 'http://192.168.0.108:3000/api/v1/menus/',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  var load_config = {
    method: 'get',
    url: `http://192.168.0.108:3000/api/v1/menus/${maker_id}`,
    headers: {},
  };

  const DeleteCategory = async () => {
    await axios(del_cat_config)
      .then(function (response) {
        // console.log('Response Data:', JSON.stringify(response.data));
        onGoBack();
        navigation.goBack();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const LoadCategories = async () => {
    await axios(load_config)
      .then(function (res) {
        if (res.data.data) {
          setCats(res.data.data.menu);
          setDishes(
            res.data.data.menu.find((o) => o.title === categoryName).dishes,
          );
        } // console.log('Saved Value:', categories);
      })
      .catch(function (error) {
        console.log(error.message);
        // window.alert(error.message);
      });
  };

  // console.log('Component Rendered');
  const BackButton = () => {
    onGoBack();
    return <BackIcon navigation={navigation} />;
  };
  const EditMenuButton = () => {
    return (
      <TouchableOpacity onPress={() => setCatMenu(true)}>
        <OverflowMenu
          anchor={MoreVerticalIcon}
          visible={catMenu}
          selectedIndex={menuIndex}
          onSelect={setMenuIndex}
          onBackdropPress={() => setCatMenu(false)}>
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
            onPress={DeleteCategory}
            title={(TextProps) => {
              return (
                <Text style={[TextProps.style, styles.overflowItem]}>
                  Delete Category
                </Text>
              );
            }}
          />
        </OverflowMenu>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    LoadCategories();
  }, []);

  const EditDeleteIcon = (props, id) => {
    let dish_id = id;
    return (
      <View style={{flexDirection: 'row', height: '100%'}}>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => {
            setDishModal(true);
            setDishId(dish_id);
          }}>
          <Icon
            style={[props.style, {width: 32, height: 32}]}
            name="edit"
            pack="eva"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => console.log('Delete Pressed')}>
          <Icon
            style={[props.style, {width: 32, height: 32}]}
            name="trash-2"
            pack="eva"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderListItem = ({item, index}) => {
    // console.log(item);
    return (
      <ListItem
        accessoryLeft={Thumbnail}
        accessoryRight={(props) => EditDeleteIcon(props, item._id)}
        title={() => (
          <Text category="h5" style={{color: 'black', marginLeft: 8}}>
            {item.name}
          </Text>
        )}
        description={() => (
          <Text
            category="s2"
            style={{
              color: item.cuisine_type === 'Veg' ? 'green' : 'red',
              marginLeft: 8,
            }}>
            {item.cuisine_type}
          </Text>
        )}
      />
    );
  };

  const Thumbnail = (props) => {
    return (
      <Avatar
        style={styles.avatar}
        shape="square"
        source={require('_assets/images/halwa.jpg')}
      />
    );
  };

  console.log('List Displayed');

  return (
    <Layout style={styles.container}>
      <TopNavigation
        style={{
          maxHeight: '10%',
          maxWidth: SLIDER_WIDTH,
        }}
        title={() => {
          return (
            <Text category="h5" status="primary">
              {categoryName}
            </Text>
          );
        }}
        accessoryRight={EditMenuButton}
        accessoryLeft={BackButton}
        alignment="start"
      />

      <Divider />

      <Layout>
        {dishes.length ? (
          <List
            style={styles.listcontainer}
            data={dishes}
            ItemSeparatorComponent={Divider}
            renderItem={renderListItem}
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
          onPress={() => {
            // console.log('Add Button Pressed W/o Icon');
            setDishModal(true);
          }}
        />
      </TouchableOpacity>
      <DishModal
        dishId={dishId}
        menuId={menu_id}
        categoryName={categoryName}
        dishModal={dishModal}
        setDishModal={setDishModal}
        setDishId={setDishId}
        ReRender={ReRender}
        makerId={maker_id}
      />
    </Layout>
  );
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
  },
});

export default CategoryDetails;
