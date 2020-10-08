import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {Layout, Avatar, Text, Button} from '@ui-kitten/components';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const Header = (props) => <View {...props}></View>;

export default class ListCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homemakers: [
        {
          name: 'Chef Pooja',
          location: 'Kabra Nagar, Nanded',
          propic: require('../../assets/images/fem-maker-pic-1.png'),
          description:
            'My speciality is pure Maharashtrian Food. Customized dish orders are welcomed.',
        },
        {
          name: 'Rajiv Cook',
          location: 'Ashok Nagar, Nanded',
          propic: require('../../assets/images/male-maker-pic-4.png'),
          description:
            'I am good at making cakes, pizzas, and every other fast food with maintaining the food hygiene stated by Khamang.',
        },
        {
          name: 'Payal C',
          location: 'Chikhalwadi, Nanded',
          propic: require('../../assets/images/fem-maker-pic-2.jpg'),
          description:
            'Gujrati and South Indian food are my expertise niche. Even I can fulfill some basic dishes for the routine.',
        },
        {
          name: 'Chef Sam',
          location: 'Shivaji Chowk, Parbhani',
          propic: require('../../assets/images/male-maker-pic-3.png'),
          description:
            'Healthy food for diet and workouts are provided by me, along with proper plans and workflow.',
        },
        {
          name: 'Aditi The Cook',
          location: 'Siddhi Food Plaza, Bhagya Nagar',
          propic: require('../../assets/images/fem-maker-pic-3.png'),
          description:
            'Fruit art and variety of juices are part of my routine cooking habit.',
        },
        {
          name: 'Chef Jia ',
          location: 'Kabra Nagar, Nanded',
          propic: require('../../assets/images/fem-maker-pic-4.png'),
          description:
            'My perfection in spicy Kolhapuri dishes will leave you amazed. Get a taste of real Kolhapuri food. Customized orders accepted.',
        },
      ],
    };
  }

  render() {
    return (
      <View>
        {this.state.homemakers.map((item, index) => {
          return (
            <Card key={index} style={styles.card}>
              <TouchableOpacity style={{width: '100%'}}>
                <View style={styles.friendItem}>
                  <Avatar
                    style={{aspectRatio: 1.0, height: 100, width: 60}}
                    source={item.propic}
                  />
                  <CardTitle title={item.name} subtitle={item.location} />
                </View>
                <CardContent text={item.description} />
              </TouchableOpacity>

              <CardAction
                separator={true}
                inColumn={false}
                style={{
                  flex: 1,
                  alignContent: 'stretch',
                  marginHorizontal: -10,
                  alignItems: 'center',
                }}>
                <CardButton
                  onPress={() => {}}
                  title="Go to Kitchen"
                  color="blue"
                  style={{
                    padding: 5,
                    width: '100%',
                    height: '100%',
                    marginLeft: -4,
                  }}
                />
              </CardAction>
            </Card>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    // backgroundColor: 'blue',
    width: '100%',
  },
  friendName: {
    marginTop: 8,
    color: 'grey',
    // backgroundColor: 'green',
  },
  card: {
    margin: 20,
    borderRadius: 10,
    elevation: 5,
    // backgroundColor: 'grey',
  },
});
