import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Button, Card, Layout, Text} from '@ui-kitten/components';

const Header = (props) => <View {...props}></View>;

export const CardOne = () => (
  //   <React.Fragment>
  <Layout style={styles.topContainer} level="1">
    <Card style={styles.card} header={Header}>
      <ImageBackground
        source={{
          uri:
            'https://i.ndtvimg.com/i/2015-12/maharashtrian_625x350_61450870428.jpg',
        }}
        resizeMode={'cover'}
        style={styles.image}>
        <Text>With Headerd</Text>
      </ImageBackground>
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
    height: 200,
    flex: 1,
    margin: 60,
  },
  image: {
    ...StyleSheet.absoluteFill,
  },
});
