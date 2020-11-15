import React, {Component} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  CheckBox,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button,
  List,
  MenuItem,
  Card,
} from '@ui-kitten/components';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const {width: screenWidth} = Dimensions.get('window');
const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const ForwardIcon = (props) => (
  <Icon {...props} name="arrow-ios-forward" pack="eva" />
);

export default function Menu() {
  const DATA = [
    {
      title: 'Starters',
      data: ['Masala Papad', 'Oats', 'Banana Chips'],
    },
    {
      title: 'Pickels and Chutneys',
      data: ['Mango Pickle', 'Jawas Chutney', 'Groundnut Chutney'],
    },
    {
      title: 'Breads',
      data: ['Chapatai', 'Bhakri', 'Phulka'],
    },
    {
      title: 'Main Course',
      data: ['Bhendi Masala', 'Dal Curry'],
    },
    {
      title: 'Rice',
      data: ['Plain Rice', 'Pulao', 'Masala Rice'],
    },
    {
      title: 'Snacks',
      data: ['French Fries', 'Kaande Bhaje', 'Baked Papad'],
    },
    {
      title: 'Salads',
      data: ['Mix Salad', 'Onion Salad'],
    },
  ];
  const [activeChecked, setActiveChecked] = React.useState(false);
  const renderCard = (info) => {
    return (
      <Card
        style={styles.item}
        status="warning"
        header={(headerProps) => (
          <View style={{backgroundColor: '#DDDDDD'}}>
            <MenuItem
              accessoryLeft={(props) => (
                <Icon
                  {...props}
                  style={{fontSize: 25, color: 'grey'}}
                  name="local-dining"
                  pack="material"
                />
              )}
              accessoryRight={ForwardIcon}
              onPress={() => navigation.navigate.goBack()}
              title={(evaProps) => (
                <Text
                  {...evaProps}
                  category="h5"
                  style={{
                    padding: 6,
                    color: 'grey',
                    width: '80%',
                  }}>
                  {info.item.title}
                </Text>
              )}
            />
          </View>
        )}>
        <View style={styles.listcontainer}>
          {info.item.data.map((i, index) => {
            return (
              <CheckBox
                key={index}
                status="success"
                style={styles.checkbox}
                checked={activeChecked}
                onChange={(nextChecked) => setActiveChecked(nextChecked)}>
                {(evaProps) => (
                  <Text category="s2" style={{marginLeft: 6, color: 'grey'}}>
                    {i}
                  </Text>
                )}
              </CheckBox>
            );
          })}
        </View>
      </Card>
    );
  };

  return (
    <Layout style={styles.container} level="1">
      <TopNavigation
        title={(TextProps) => {
          return (
            <Text category="h2" status="primary">
              Menu
            </Text>
          );
        }}
        alignment="start"
      />
      <Divider />
      <Layout style={{flex: 1, width: '100%'}} level="1">
        <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={DATA}
          renderItem={renderCard}
        />
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'red',
    // alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
    borderRadius: 10,
  },
  checkbox: {
    width: '100%',
    padding: 4,
  },
  listcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-around',
    // backgroundColor: 'red',
    flexWrap: 'wrap',
  },
});
