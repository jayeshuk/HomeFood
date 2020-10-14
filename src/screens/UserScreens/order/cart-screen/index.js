import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  Button,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';
import {CartItem} from './extra/cart-item.component';
import {Product} from './extra/data';

const initialProducts = [Product.pinkChair(), Product.blackLamp()];

export default ({navigation}) => {
  const styles = useStyleSheet(themedStyle);
  const [products, setProducts] = React.useState(initialProducts);

  const totalCost = () => {
    return products.reduce((acc, product) => acc + product.totalPrice, 0);
  };

  const onItemRemove = (product, index) => {
    products.splice(index, 1);
    setProducts([...products]);
  };

  const onItemChange = (product, index) => {
    products[index] = product;
    setProducts([...products]);
  };

  const renderFooter = () => (
    <Layout style={styles.footer}>
      <Text category="h5">Total Cost:</Text>
      <Text category="h5">{`Rs.${totalCost()}`}</Text>
    </Layout>
  );

  const renderProductItem = (info) => (
    <CartItem
      style={styles.item}
      index={info.index}
      product={info.item}
      onProductChange={onItemChange}
      onRemove={onItemRemove}
    />
  );

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
    <Layout style={styles.container} level="2">
      <TopNavigation
        title={(TextProps) => {
          return (
            <Text category="h4" status="primary">
              Your Cart
            </Text>
          );
        }}
        accessoryLeft={renderLeftActions}
        accessoryRight={renderRightActions}
        alignment="start"
      />
      <List
        data={products}
        renderItem={renderProductItem}
        ListFooterComponent={renderFooter}
      />
      <Button style={styles.checkoutButton} size="giant">
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
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});
