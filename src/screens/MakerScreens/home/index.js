import React, {Component, useState, useEffect} from 'react';
import {Dimensions, View, StyleSheet, ScrollView} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Toggle,
} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'react-native-axios';

const OrderIcon = (props) => {
  return <Icon {...props} name="home" pack="eva" />;
};
function SearchIcon(props) {
  return <Icon {...props} name="search-outline" pack="eva" />;
}

const Home = () => {
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
  const {width: screenWidth} = Dimensions.get('window');
  const logged_user = useSelector((state) => state.main_app.logged_user);

  const [shopEnabled, setShopEnabled] = useState(false);
  // const [orderData, setOrderData] = useState({
  //   orders: [],
  // });
  // var orderData = [];
  // const setOrderData = (obj) => {
  //   orderData = obj;
  // };

  var config = {
    method: 'get',
    url: 'http://192.168.43.132:3000/api/v1/orders/',
    headers: {},
  };

  const GetOrders = async () => {
    await axios(config)
      .then(function (response) {
        const resp_arr = response.data.data.orderss;
        const md = new Array.from(resp_arr);
        setOrderData(md);
        console.log('ORDER DATA:', orderData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const toggleShop = () => {
    setShopEnabled(!shopEnabled);
  };

  const renderRightActions = () => (
    <Toggle
      status="success"
      style={{paddingRight: 15, paddingTop: 5}}
      checked={shopEnabled}
      onPress={toggleShop}
      onChange={toggleShop}
    />
  );

  useEffect(() => {
    GetOrders();
  }, []);

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.amount}`}
      // accessoryLeft={renderItemIcon}
      // accessoryRight={renderItemAccessory}
    />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation
        style={{paddingLeft: 20}}
        title={(TextProps) => {
          return (
            <Text category="h2" status="primary">
              Khamang's &nbsp; Cook
            </Text>
          );
        }}
        accessoryRight={renderRightActions}
        alignment="start"
      />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* {orderData.orders ? (
          orderData.orders.map((item, index) => <Text>{item.amount}</Text>)
        ) : ( */}
        {/* <Text>Nahi</Text> */}
        <Text category="h5">Waiting for Orders to Recieve...</Text>
        <Text category="h5">{String(shopEnabled)} </Text>

        {/* )} */}
      </Layout>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
