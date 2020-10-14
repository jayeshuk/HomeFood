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
import CardOne from '../../../components/atoms/CardOne';
// import Carousel from '../../../components/atoms/Carousel';
import SwiperCard from '../../../components/atoms/Swiper/index';
import TinyCard from '../../../components/atoms/TinyCard';
import ListCard from '../../../components/atoms/ListCard';

const CartIcon = (props) => {
  return (
    <Icon
      {...props}
      name="shopping-cart"
      style={{color: 'black', fontSize: 25}}
      pack="material"
    />
  );
};
function SearchIcon(props) {
  return (
    <Icon
      {...props}
      style={{color: 'black', fontSize: 25}}
      name="search"
      pack="material"
    />
  );
}

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const {width: screenWidth} = Dimensions.get('window');

class OrderScreen extends Component {
  render() {
    const handleCartPress = ({navigation}) => {
      this.props.navigation && this.props.navigation.navigate('CartScreen');
    };

    const renderRightActions = () => (
      <React.Fragment>
        <TopNavigationAction icon={SearchIcon} />
        <TopNavigationAction icon={CartIcon} onPress={handleCartPress} />
      </React.Fragment>
    );

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
          accessoryRight={renderRightActions}
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
            <ListCard nav={this.props.navigation} />
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
