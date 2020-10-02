import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Layout, Text} from '@ui-kitten/components';

const Header = (props) => (
  <View {...props}>
    <Text category="h6">Maldives</Text>
    <Text category="s1">By Wikipedia</Text>
  </View>
);

export const CardOne = () => (
  //   <React.Fragment>
  <Layout style={styles.topContainer} level="1">
    <Card style={styles.card} header={Header}>
      <Text>With Header</Text>
    </Card>
  </Layout>
  //   </React.Fragment>
);

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
});
