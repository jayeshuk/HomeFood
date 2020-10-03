import React from 'react';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const HistoryScreen = () => (
  <>
    <TopNavigation
      style={{paddingLeft: 20}}
      title={(TextProps) => {
        return (
          <Text category="h2" status="primary">
            Order History
          </Text>
        );
      }}
      alignment="start"
    />
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">HISTORY</Text>
    </Layout>
  </>
);

export default HistoryScreen;
