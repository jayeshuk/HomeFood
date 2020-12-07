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
import {useSelector, useDispatch} from 'react-redux';
import {SLIDER_WIDTH, ITEM_WIDTH, ITEM_HEIGHT, width} from '_utils/dimensions';
import {
  CloseIcon,
  EditDeleteIcon,
  BackIcon,
  MoreVerticalIcon,
  AddIcon,
} from '../extras/icons';

const renderListItem = ({item, index}) => (
  <ListItem
    accessoryLeft={Thumbnail}
    accessoryRight={EditDeleteIcon}
    title={item.name}
    description={item.description}
  />
);

const Thumbnail = (props) => {
  return (
    <Avatar
      style={styles.avatar}
      shape="square"
      source={require('_assets/images/halwa.jpg')}
    />
  );
};

function CategoryDetails({route, navigation}) {
  const {categoryName, dishes} = route.params;
  //   console.log(categoryName, dishes);
  const dispatch = useDispatch();
  const submitDish = (name) => {
    dispatch(addDish(name));
    setDishDescription('');
    setDishTitle('');
  };
  const menu = useSelector((state) => state.maker_menu.menu);

  const [dishModal, setDishModal] = useState(false);
  const [catMenu, setCatMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState();
  const [dishTitle, setDishTitle] = useState('');
  const [dishDescription, setDishDescription] = useState('');

  console.log('Component Rendered');
  const BackButton = () => <BackIcon navigation={navigation} />;
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
        {dishes ? (
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
      <Modal
        visible={dishModal}
        // visible={true}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setDishModal(false)}>
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
            <CloseIcon setModal={setDishModal} />
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
              status="basic"
              placeholder="Dish Name"
              value={dishTitle}
              onChangeText={(value) => {
                // console.log(value);
                setDishTitle(value);
              }}
            />
            <Input
              multiline={true}
              textStyle={{color: 'grey'}}
              status="basic"
              placeholder="Description"
              value={dishDescription}
              onChangeText={(value) => setDishDescription(value)}
            />

            <Button onPress={submitDish}>ADD</Button>
          </View>
        </Card>
      </Modal>
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
