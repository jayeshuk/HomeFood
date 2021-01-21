import React, {Component} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'react-native-axios';

function Pay({route, navigation}) {
  const {order, id, order_details, makerid} = route.params;
  const logged_user = useSelector((state) => state.main_app.logged_user);
  console.log('ORDER:', order);
  // const styles = useStyleSheet(themedStyles);

  const StoreOrder = async (orderId) => {
    console.log('Storing Order:', orderId);
    await axios({
      method: 'patch',
      url: `http://192.168.43.132:3000/api/v1/users/${logged_user.id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({orderId: orderId, makerId: makerid}),
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const RecordOrder = async (order_obj) => {
    const rec_data = JSON.stringify(order_obj);
    await axios({
      method: 'post',
      url: 'http://192.168.43.132:3000/api/v1/orders',
      headers: {
        'Content-Type': 'application/json',
      },
      data: rec_data,
    })
      .then(function (response) {
        console.log('Recorded Then');
        console.log(JSON.stringify(response.data));
        StoreOrder(response.data.data._id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const PayAmount = () => {
    var options = {
      description: 'Towards a Hygienic Food', // description
      image:
        'https://cdn3.iconfinder.com/data/icons/food-delivery-aesthetics-vol-2/256/Pay_on_Delivery-512.png', // image
      currency: 'INR',
      key: 'rzp_test_oyCN745HPQkWRI', // rzp_test_lpoFU3fTbYZDu3 Something of this type!
      amount: order_details.amount,
      name: 'Khamang Customer',
      order_id: id, //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
      prefill: {
        email: 'akshay@razorpay.com',
        contact: '8955806560',
        name: 'Akshay Bhalotia',
      },
      external: {
        wallets: ['paytm', 'phonepe', 'amazonpay'],
      },
      theme: {color: '#30B6FF'},
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        console.warn(`Success: ${data.razorpay_payment_id}`);
        RecordOrder({
          dishes: order,
          amount: order_details.amount / 100,
          payid: data.razorpay_payment_id,
          userid: logged_user.id,
          makerid: makerid,
          prepared: false,
        });
      })
      .catch((error) => {
        // handle failure
        console.warn(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <Button
      onPress={() => {
        PayAmount();
      }}
      style={styles.button}
      status="info"
      size="giant">
      Pay Rs. {order_details.amount / 100}
    </Button>
  );
}

export default Pay;

const styles = StyleSheet.create({
  button: {
    margin: 2,
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '90%',
  },
});
