import React, {Component} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import CardOne from '../../components/atoms/CardOne';
import Carousel from '../../components/atoms/Carousel';
import SwiperCard from '../../components/atoms/Swiper/index';

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
      <>
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
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Divider />
          {/* <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: 'red',
              ...styles.item,
            }}> */}
          <CardOne />
          {/* </View> */}
        </Layout>
      </>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: SLIDER_WIDTH,
    height: ITEM_HEIGHT,
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});

export default OrderScreen;
