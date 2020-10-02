import React from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import {Button, Divider, Layout, TopNavigation} from '@ui-kitten/components';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const HomeScreen = ({navigation}) => {
  console.log(`${windowWidth},${windowHeight}`);
  const navigateDetails = () => {
    navigation.navigate('AppTabNavigator');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/start_stove.jpg')}
        style={{
          ...styles.backgroundImage,
        }}>
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 4,
            alignItems: 'center',
            borderRadius: 25,
          }}>
          <Button
            onPress={navigateDetails}
            style={styles.button}
            status="primary">
            Log In
          </Button>
        </Layout>
      </ImageBackground>
    </SafeAreaView>
  );
};

let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    position: 'relative',
  },
  button: {
    borderRadius: 25,
  },
});
