import React, {Component} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from '@ui-kitten/components';
import {WebView} from 'react-native-webview';
import VidCard from '../../../components/atoms/videoCard/vidCard';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const {width: screenWidth} = Dimensions.get('window');

//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=bhendi%20masala&type=video&key=AIzaSyAKCTwZ4mUSfWGUSN0lMQStOydxIEzKgIE

export default function Learn() {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [vidCardData, setVidCardData] = React.useState([]);
  const fetchData = () => {
    setVidCardData([]);
    setLoading(true);
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}|recipes&type=video&key=AIzaSyAKCTwZ4mUSfWGUSN0lMQStOydxIEzKgIE
    `)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setVidCardData(data.items);
      })
      .catch((error) => {
        setLoading(true);
        // console.log(error);
      });
  };

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    // <TouchableWithoutFeedback onPress={toggleSecureEntry}>
    //    <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    <Icon {...props} name="search" pack="material" />
    //  </TouchableWithoutFeedback>
  );

  const SendIcon = (props) => <Icon {...props} name="send" pack="material" />;

  return (
    <Layout style={styles.container}>
      <TopNavigation
        // style={{paddingLeft: 20}}
        title={(TextProps) => {
          return (
            <Text category="h2" status="primary">
              Learn &nbsp; New
            </Text>
          );
        }}
        alignment="start"
      />
      <Divider />
      <Layout
        style={{
          flexDirection: 'row',
          // backgroundColor: 'red',
          justifyContent: 'space-around',
          padding: 10,
        }}>
        <Input
          textStyle={{color: 'black'}}
          style={styles.searhBox}
          value={value}
          // label="Password"
          placeholder="Search a Recipe"
          // caption="Should contain at least 8 symbols"
          accessoryRight={renderIcon}
          // captionIcon={AlertIcon}
          // secureTextEntry={secureTextEntry}
          onChangeText={(nextValue) => setValue(nextValue)} // <---- Use this for SearchNothing Effect
        />
        <Button
          onPress={() => fetchData()}
          style={styles.button}
          accessoryLeft={SendIcon}
          status="basic"
        />
        {/* <View
        style={{
          width: '100%',
          height: '80%',
        }}>
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{uri: ` https://www.youtube.com/`}}
        />
      </View> */}
      </Layout>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* {loading ? (
          <ActivityIndicator style={{size: 'large', color: 'red'}} />
        ) : null} */}
        {/* <Text category="h5">Learn to Cook New Dishes !</Text> */}

        <FlatList
          style={{width: '100%'}}
          data={vidCardData}
          renderItem={({item}) => {
            return (
              <VidCard
                videoId={item.id.videoId}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
                thumbnail={item.snippet.thumbnails.medium.url}
                description={item.snippet.description}
              />
            );
          }}
          keyExtractor={(item) => item.id.videoId}
        />
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  searhBox: {
    width: '80%',
  },
  button: {height: '50%'},
});
