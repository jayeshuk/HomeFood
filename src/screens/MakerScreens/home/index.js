import React, {Component, useState, useEffect} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  Toggle,
  ListItem,
  Button,
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
  const [orderData, setOrderData] = useState({
    orders: [],
  });

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetOrders();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  var config = {
    method: 'get',
    url: 'http://192.168.43.132:3000/api/v1/orders/',
    headers: {},
  };

  const GetOrders = async () => {
    const md = await axios(config)
      .then(function (response) {
        const md = response.data.data.orders;
        console.log(response.data.data.orders);
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    setOrderData(md);
    // console.log('Data', JSON.stringify(orderData.orders[0].dishes));
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

  const AcceptReject = (props) => {
    return (
      <>
        <Button status="success">Accept</Button>
        <Button status="danger">Reject</Button>
      </>
    );
  };

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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Layout style={{flex: 1}}>
          {orderData.orders ? (
            orderData.orders.map((item, index) => (
              <Layout key={index}>
                <ListItem
                  style={{margin: 10}}
                  title={(TextProps) => (
                    <Text category="h5" style={{color: 'grey'}}>
                      Order {index + 1}
                    </Text>
                  )}
                  description={(TextProps) => (
                    <Text category="h6" style={{color: 'grey'}}>
                      Rs. {item.amount}
                    </Text>
                  )}
                  // accessoryLeft={renderItemIcon}
                  accessoryRight={AcceptReject}
                />
                <Divider />
              </Layout>
            ))
          ) : (
            <Text>Nahi</Text>
            // <Text category="h5">Waiting for Orders to Recieve...</Text>
            // <Text category="h5">{String(shopEnabled)} </Text>
          )}
        </Layout>
      </ScrollView>
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
