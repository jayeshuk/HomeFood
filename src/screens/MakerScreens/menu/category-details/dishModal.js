import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {CloseIcon} from '../extras/icons';
import {ITEM_WIDTH, ITEM_HEIGHT} from '_utils/dimensions';
import {Button, Card, Input, Modal, Text} from '@ui-kitten/components';
import axios from 'react-native-axios/lib/axios';

// DISH FETCHED NOT DISPLAYING THE PRICE FIELD : ISSUE
function dishMod(props) {
  const {
    dishId,
    menuId,
    makerId,
    categoryName,
    dishModal,
    setDishModal,
    setDishId,
    ReRender,
  } = props;
  const [dishTitle, setDishTitle] = useState('');
  const [dishCuisineType, setDishCuisineType] = useState('');
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState();

  console.log('MENU', menuId);

  var create_dish_data = JSON.stringify({
    name: dishTitle,
    cuisine_type: dishCuisineType,
    price: price,
    available: true,
    category_name: categoryName,
    maker_id: makerId,
  });

  var update_dish_data = JSON.stringify({
    // available: false,
    menu_id: menuId,
    category_name: categoryName,
    name: dishTitle,
    cuisine_type: dishCuisineType,
    price: price,
  });

  var update_config = {
    method: 'patch',
    url: `http://192.168.0.108:3000/api/v1/dishes/${dishId}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: update_dish_data,
  };
  var fetch_config = {
    method: 'get',
    url: `http://192.168.0.108:3000/api/v1/dishes/${dishId}`,
    headers: {},
  };
  var create_config = {
    method: 'post',
    url: 'http://192.168.0.108:3000/api/v1/dishes',
    headers: {
      'Content-Type': 'application/json',
    },
    data: create_dish_data,
  };

  const FetchDish = async () => {
    await axios(fetch_config)
      .then(function (response) {
        console.log('Fetched:', JSON.stringify(response.data));
        setDishCuisineType(response.data.data.dish.cuisine_type);
        setDishTitle(response.data.data.dish.name);
        setPrice(response.data.data.dish.price);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const UpdateDish = async () => {
    await axios(update_config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        ReRender();
        // setDishCuisineType('');
        // setDishTitle('');
        // setPrice(0);
      })
      .catch(function (error) {
        console.log(error);
        window.alert('Something went wrong in updating');
      });
  };

  const CreateDish = async () => {
    await axios(create_config)
      .then(function (response) {
        console.log('CREATED DISH', JSON.stringify(response.data));
        ReRender();
        setDishCuisineType('');
        setDishTitle('');
        setPrice(0);
      })
      .catch(function (error) {
        console.log(error);
        window.alert('Something went wrong in creating');
      });
  };

  const submitDish = (name) => {
    if (dishId) {
      UpdateDish();
    } else {
      CreateDish();
    }
    setDishModal(false);
  };

  useEffect(() => {
    if (dishId) {
      FetchDish();
    }
  }, [dishId]);

  return (
    <Modal
      visible={dishModal}
      // visible={true}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => {
        setDishModal(false);
        setDishId(null);
        setDishTitle('');
        setDishCuisineType('');
        setPrice(0);
      }}>
      <Card disabled={true} status="warning">
        <View style={styles.headview}>
          <CloseIcon
            setModal={() => {
              setDishModal(false);
              setDishId(null);
              setDishCuisineType('');
              setDishTitle('');
              setPrice(0);
            }}
          />
        </View>
        <View style={styles.mainview}>
          <Text style={styles.addNewView}>Add New Dish</Text>
          <Input
            textStyle={{color: 'black'}}
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
            textStyle={{color: 'black'}}
            status="basic"
            placeholder="Cuisine Type (Eg. Veg/Non-Veg)"
            value={dishCuisineType}
            onChangeText={setDishCuisineType}
          />
          <Input
            textStyle={{color: 'black'}}
            status="basic"
            placeholder="In Rs.(Eg. 40,120)"
            value={`${price ? price : ''}`}
            onChangeText={setPrice}
          />
          <Button onPress={submitDish}>ADD</Button>
        </View>
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headview: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '15%',
    alignSelf: 'flex-end',
    position: 'absolute',
    marginRight: 0,
  },
  mainview: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
  addNewView: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'grey',
    fontWeight: 'bold',
  },
});

export default dishMod;
