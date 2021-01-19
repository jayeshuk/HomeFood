import React from 'react';
// import { ListItem, Text } from '@ui-kitten/components';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  ScrollView,
  View,
} from 'react-native';
import {
  Button,
  Card,
  Icon,
  List,
  StyleService,
  Avatar,
  ListItem,
  Text,
  useStyleSheet,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {Product, ProductOption} from './extra/data';

const product = Product.centralParkApartment();

export default ({route, navigation}) => {
  console.log(route.params.maker_data);
  var maker_data = route.params.maker_data;
  const styles = useStyleSheet(themedStyles);
  const onBookButtonPress = () => {};
  const renderImageItem = (info) => (
    <Image style={styles.imageItem} source={info.item} />
  );
  const renderOptionItemIcon = (style, icon) => <Icon {...style} name={icon} />;
  const renderOptionItem = (option, index) => (
    <Button
      key={index}
      style={styles.optionItem}
      appearance="ghost"
      size="small"
      icon={(style) => renderOptionItemIcon(style, option.icon)}>
      {option.title}
    </Button>
  );

  const renderDetailItem = (detail, index) => (
    <Button
      key={index}
      style={styles.detailItem}
      appearance="outline"
      size="tiny">
      {detail}
    </Button>
  );

  const renderBookingFooter = () => (
    <View style={{marginLeft: '8%'}}>
      <Text category="s1">Facilities</Text>
      <View style={styles.detailsList}>
        {product.details.map(renderDetailItem)}
      </View>
      <View style={styles.optionList}>
        {product.options.map(renderOptionItem)}
      </View>
    </View>
  );

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

  const renderRightActions = () => <TopNavigationAction icon={SearchIcon} />;
  const renderLeftActions = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );

  return (
    <ScrollView style={styles.container}>
      {/* <TopNavigation
        style={{
          position: 'absolute',
          margin: 10,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 10,
        }}
        accessoryLeft={renderLeftActions}
        accessoryRight={renderRightActions}
        alignment="start"
        icon={BackIcon}
      /> */}
      <ImageOverlay style={styles.image} source={product.primaryImage} />
      <Card
        style={styles.bookingCard}
        appearance="filled"
        disabled={true}
        footer={renderBookingFooter}>
        <Text style={styles.title} category="h4">
          {/* {product.title} */}
          {maker_data.firstName + ' ' + maker_data.lastName}
        </Text>
        <Text category="s2">{maker_data.address}</Text>
        <Text style={styles.rentLabel} appearance="hint" category="p1">
          Maharashtrian Food
        </Text>
        <Text style={styles.priceLabel} category="h6">
          {product.price.formattedValue}
          <Text>{product.price.formattedScale}</Text>
        </Text>
        <Button style={styles.bookButton} onPress={onBookButtonPress}>
          Order
        </Button>
      </Card>
      <Text style={styles.sectionLabel} category="s1">
        About
      </Text>
      <Text style={styles.description} appearance="hint">
        {/* {product.description} */}
        {maker_data.aboutme}
      </Text>
      <Text style={styles.sectionLabel} category="s1">
        Photos
      </Text>
      <List
        contentContainerStyle={styles.imagesList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={product.images}
        renderItem={renderImageItem}
        
      />
      <Text style={styles.sectionLabel} category="s1">
        Menu
      </Text>
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-2',
  },
  image: {
    height: 360,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  title: {
    width: '65%',
    color: 'black',
  },
  rentLabel: {
    marginTop: 15,
  },
  priceLabel: {
    marginTop: 8,
  },
  bookButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  detailsList: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  optionList: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
    fontSize: 25,
  },
  imagesList: {
    padding: 8,
    backgroundColor: 'background-basic-color-2',
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});
