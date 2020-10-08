import React, {Component} from 'react';
import {Dimensions, View, StyleSheet, ScrollView} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import CardOne from '../../components/atoms/CardOne';
// import Carousel from '../../components/atoms/Carousel';
import SwiperCard from '../../components/atoms/Swiper/index';
import TinyCard from '../../components/atoms/TinyCard';
import ListCard from '../../components/atoms/ListCard';

const OrderIcon = (props) => {
  return <Icon {...props} name="home" pack="eva" />;
};
function SearchIcon(props) {
  return <Icon {...props} name="search-outline" pack="eva" />;
}

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const {width: screenWidth} = Dimensions.get('window');

class OrderScreen extends Component {
  render() {
    return (
      <Layout style={styles.container}>
        <TopNavigation
          style={{paddingLeft: 20}}
          title={(TextProps) => {
            return (
              <Text category="h2" status="primary">
                Khamang
              </Text>
            );
          }}
          alignment="start"
        />
        <Divider />
        <ScrollView style={styles.Container}>
          <Layout style={{flex: 1}}>
            <CardOne />
          </Layout>
          <Layout style={{flex: 1}}>
            <TinyCard />
          </Layout>
          <Layout style={{flex: 1}}>
            <ListCard />
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default OrderScreen;
