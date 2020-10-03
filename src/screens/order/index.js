import React from 'react';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const OrderIcon = (props) => <Icon {...props} name="home" pack="material" />;
const SearchIcon = (props) => <Icon {...props} name="search" pack="material" />;

const OrderScreen = () => (
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
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">ORDER</Text>
    </Layout>
  </>
);

export default OrderScreen;
