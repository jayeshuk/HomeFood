import React, {useEffect} from 'react';
import {ListRenderItemInfo, View, ScrollView} from 'react-native';
import {
  Button,
  ButtonGroup,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
  TopNavigation,
  TopNavigationAction,
  Icon,
  ListItem,
  Divider,
} from '@ui-kitten/components';
import {Product} from './extra/data';
import axios from 'react-native-axios';

const initialProducts = [Product.pinkChair(), Product.blackLamp()];

export default ({route, navigation}) => {
  const order = route.params.order;
  const makerid = route.params.makerid;
  const styles = useStyleSheet(themedStyle);
  const [reboot, setReboot] = React.useState(false);
  const [products, setProducts] = React.useState(initialProducts);
  const [orderId, setOrderId] = React.useState();
  const [orderDetails, setOrderDetails] = React.useState();
  const [total, setTotal] = React.useState();

  const totalCost = () => {
    return order.reduce((acc, product) => acc + product.price * product.qty, 0);
  };

  const renderDishItem = (info) => {
    let i = info.index;
    // console.log('INFO:', info);
    return (
      <Layout
        style={{
          flexDirection: 'row',
          padding: 15,
          alignItems: 'flex-end',
          alignContent: 'space-between',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            color: 'black',
            alignSelf: 'flex-start',
          }}>
          {info.item.name}
        </Text>
        <ButtonGroup
          size="small"
          style={{
            alignSelf: 'center',
            textAlign: 'right',
            marginHorizontal: 15,
            borderRadius: 10,
          }}
          appearance="outline">
          <Button
            onPress={() => {
              if (info.item.qty > 0) info.item.qty = info.item.qty - 1;
              setReboot(!reboot);
              console.log('ORDER', order);
            }}
            accessoryLeft={(props) => (
              <Icon {...props} name="minus" pack="eva" />
            )}
          />
          <Button onPress={() => {}}>
            {(props) => (
              <Text style={[props.style, {fontSize: 16}]}>{info.item.qty}</Text>
            )}
          </Button>
          <Button
            onPress={() => {
              info.item.qty = info.item.qty + 1;
              setReboot(!reboot);
              console.log('ORDER', order);
            }}
            accessoryLeft={(props) => (
              <Icon {...props} name="plus" pack="eva" />
            )}
          />
        </ButtonGroup>
        <Text
          category="h5"
          style={{
            flex: 1,
            color: 'black',
            alignSelf: 'center',
            textAlign: 'right',
          }}>
          {info.item.qty} X {info.item.price}
        </Text>
      </Layout>
    );
  };
  function BackIcon(props) {
    return (
      <Icon
        {...props}
        name="arrow-back"
        pack="material"
        style={{color: 'grey', fontSize: 25}}
      />
    );
  }
  const renderLeftActions = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );

  const amount = totalCost();

  var create_order_data = JSON.stringify({
    amount: amount * 100,
    currency: 'INR',
    receipt: 'Receipt no. 2',
    payment_capture: 1,
    notes: {
      notes_key_1: 'Tea, Earl Grey, Hot',
      notes_key_2: 'Tea, Earl Grey… decaf.',
    },
  });

  var create_order_config = {
    method: 'post',
    url: 'https://api.razorpay.com/v1/orders',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic cnpwX3Rlc3Rfb3lDTjc0NUhQUWtXUkk6OGZWbDF6QjUxTmd3QlJEdVFYUVdkSXll',
    },
    data: create_order_data,
  };

  const HandleOrderPlace = async () => {
    await axios(create_order_config)
      .then(function (response) {
        console.log('ORDER RECEIVED');
        console.log(JSON.stringify(response.data));
        setOrderId(response.id);
        setOrderDetails(response.data);
      })
      .catch(function (error) {
        console.log('ERROR', error.message);
      });
  };

  const GoToPay = () => {
    navigation &&
      navigation.navigate('Pay', {
        order: order,
        id: orderId,
        order_details: orderDetails,
        makerid: makerid,
      });
  };

  useEffect(() => {
    HandleOrderPlace();
  }, [amount]);

  return (
    <Layout style={styles.container}>
      <TopNavigation
        title={(TextProps) => {
          return (
            <Text category="h4" status="primary">
              Your Cart
            </Text>
          );
        }}
        accessoryLeft={renderLeftActions}
        alignment="start"
      />
      <Layout
        style={{
          flexDirection: 'row',
          padding: 15,
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
        {['Item', 'Quantity', 'Cost'].map((item, index) => (
          <Text
            key={index}
            style={{
              fontSize: 22,
              color: 'black',
              fontWeight: 'bold',
            }}>
            {item}
          </Text>
        ))}
      </Layout>
      <Divider
        style={{backgroundColor: 'grey', width: '90%', alignSelf: 'center'}}
      />
      <List data={order} renderItem={renderDishItem} />
      <Layout style={styles.footer}>
        <Text category="h5" style={{color: 'grey'}}>
          Total Amount:
        </Text>
        <Text
          category="h5"
          style={{color: 'grey'}}>{`Rs. ${totalCost()}`}</Text>
      </Layout>
      <Button onPress={GoToPay} style={styles.checkoutButton} size="large">
        CHECKOUT
      </Button>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.5,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});
