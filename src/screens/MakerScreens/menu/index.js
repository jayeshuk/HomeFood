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

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const ForwardIcon = (props) => (
  <Icon {...props} name="arrow-ios-forward" pack="eva" />
);
const DiningIcon = (props) => (
  <Icon
    {...props}
    style={{fontSize: 25, color: 'grey'}}
    name="local-dining"
    pack="material"
  />
);

export default function Menu({navigation}) {
  const useCheckboxState = (initialCheck = false) => {
    const [checked, setChecked] = React.useState(initialCheck);
    return {checked, onChange: setChecked};
  };

  const MENU = [
    {
      title: 'Starters',
      dishes: [
        {
          id: 0,
          name: 'Masala Papad',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 1,
          name: 'Oats',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 2,
          name: 'Banana Chips',
          available: false,
          description: 'Made with love for foodies',
        },
      ],
    },
    {
      title: 'Pickels and Chutneys',
      dishes: [
        {
          id: 0,
          name: 'Mango Pickle',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 1,
          name: 'Jawas Chutney',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 2,
          name: 'Groundnut Chutney',
          available: false,
          description: 'Made with love for foodies',
        },
      ],
    },
    {
      title: 'Breads',
      dishes: [
        {
          id: 0,
          name: 'Chapati',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 1,
          name: 'Bhakri',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 2,
          name: 'Phulka',
          available: false,
          description: 'Made with love for foodies',
        },
      ],
    },
    {
      title: 'Main Course',
      dishes: [
        {
          id: 0,
          name: 'Bhendi Masala',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 1,
          name: 'Dal Curry',
          available: false,
          description: 'Made with love for foodies',
        },
      ],
    },
    {
      title: 'Rice',
      dishes: [
        {
          id: 0,
          name: 'Plain Rice',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 1,
          name: 'Pulao',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 2,
          name: 'Masala Rice',
          available: false,
          description: 'Made with love for foodies',
        },
      ],
    },
    {
      title: 'Snacks',
      dishes: [
        {
          id: 0,
          name: 'French Fries',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 1,
          name: 'Kaande Bhaje',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 2,
          name: 'Baked Papad',
          available: false,
          description: 'Made with love for foodies',
        },
      ],
    },
    {
      title: 'Salads',
      dishes: [
        {
          id: 0,
          name: 'Mix Salad',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 1,
          name: 'Onion Salad',
          available: false,
          description: 'Made with love for foodies',
        },
      ],
    },
  ];
  const [activeChecked, setActiveChecked] = React.useState(false);

  const AddCategory = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        {/* <Icon name="trash-2" pack="eva" /> */}
        <Text category="h6"> + New Category </Text>
      </View>
    );
  };

  const renderCard = (menu) => {
    return (
      <Card
        style={styles.item}
        status="warning"
        header={(headerProps) => (
          <View style={{backgroundColor: '#DDDDDD'}}>
            <MenuItem
              accessoryLeft={DiningIcon}
              accessoryRight={ForwardIcon}
              onPress={() =>
                navigation.navigate('CategoryDetailsScreen', {
                  title: menu.item.title,
                  dishes: menu.item.dishes,
                })
              }
              title={(evaProps) => (
                <Text
                  {...evaProps}
                  category="h5"
                  style={{
                    padding: 6,
                    color: 'grey',
                    width: '80%',
                  }}>
                  {menu.item.title}
                </Text>
              )}
            />
          </View>
        )}>
        <View style={styles.listcontainer}>
          {menu.item.dishes.map((dish, index) => {
            return (
              <CheckBox
                key={index}
                status="success"
                style={styles.checkbox}
                // checked={dish.available}
                // onChange={(nextChecked) => setActiveChecked(nextChecked)}
                {...dish.available}>
                {(evaProps) => (
                  <Text category="s2" style={{marginLeft: 6, color: 'grey'}}>
                    {dish.name}
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
        accessoryRight={AddCategory}
        alignment="start"
      />
      <Divider />
      <Layout style={{flex: 1, width: '100%'}} level="1">
        <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={MENU}
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
