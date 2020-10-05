// import React from 'react';
// import {
//   Container,
//   SafeAreaView,
//   TouchableHighlight,
//   ImageBackground,
// } from 'react-native';
// import {CardOne} from '../../components/atoms/CardOne';
// import {Layout, Text, TopNavigation} from '@ui-kitten/components';

// const ProfileScreen = () => (
//   <>
//     <TopNavigation
//       style={{paddingLeft: 20}}
//       title={(TextProps) => {
//         return (
//           <Text category="h2" status="primary">
//             Profile
//           </Text>
//         );
//       }}
//       alignment="start"
//     />
//     <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text category="h1">PROFILE</Text>
//       <CardOne />
//     </Layout>
//   </>
// );

// export default ProfileScreen;

import React from 'react';
import {
  ImageBackground,
  ListRenderItemInfo,
  ScrollView,
  View,
  YellowBox,
} from 'react-native';
import {
  Avatar,
  Button,
  List,
  StyleService,
  Text,
  useStyleSheet,
  TopNavigation,
} from '@ui-kitten/components';
import {ImageOverlay} from './extras/image-overlay.component';
import {ProfileSocial} from './extras/profile-social.component';
import {MessageCircleIcon, PersonAddIcon, PinIcon} from './extras/icons';
import {Post, Profile} from './extras/data';

/*
 * Will warn because container view is ScrollView that contains 3 List components inside.
 * Better workaround depends on the user needs.
 */
// YellowBox.ignoreWarnings([
//   'VirtualizedLists should never be nested inside plain ScrollViews',
// ]);

const profile = Profile.helenKuper();

const friends = [
  Profile.jenAustin(),
  Profile.jenniferGreen(),
  Profile.helenKuper(),
  Profile.jenniferGree(),
  Profile.jenniferGre(),
  Profile.jenniferGr(),
  
];

const posts = [
  Post.plant1(),
  Post.travel1(),
  Post.style1(),
  Post.plant(),
  Post.plan(),
  Post.pla(),
  Post.pl(),
  Post.plant111(),
  Post.plant14(),

];

export default ({navigation}) => {
  const styles = useStyleSheet(themedStyle);

  const onFollowButtonPress = () => {
    navigation && navigation.goBack();
  };

  const onMessageButtonPress = () => {
    navigation && navigation.navigate('Chat1');
  };

  const renderFriendItem = (info) => (
    <View style={styles.friendItem}>
      <Avatar source={info.item.photo} />
      <Text style={styles.friendName} category="c2">
        {info.item.firstName}
      </Text>
    </View>
  );

  const renderPostItem = (info) => (
    <ImageBackground style={styles.postItem} source={info.item.photo} />
  );

  return (
    <ScrollView style={styles.container}>
      <ImageOverlay
        style={styles.header}
        source={require('../../assets/images/image-background.jpg')}>
        <Avatar style={styles.profileAvatar} source={profile.photo} />
        <Text style={styles.profileName} category="h5" status="control">
          {profile.fullName}
        </Text>
        <View style={styles.locationContainer}>
          <PinIcon />
          <Text style={styles.location} status="control">
            {profile.location}
          </Text>
        </View>
        <View style={styles.profileButtonsContainer}>
          <Button
            style={styles.profileButton}
            icon={PersonAddIcon}
            onPress={onFollowButtonPress}>
            EDIT
            
          </Button>
          <Button
            style={styles.profileButton}
            status="control"
            icon={MessageCircleIcon}
            onPress={onMessageButtonPress}>
            SETTINGS
          </Button>
        </View>

      </ImageOverlay>
      
      <Text style={styles.profileDescription} appearance="hint">
        {profile.description}
      </Text>
      <Text style={styles.sectionLabel} category="s1">
       Favorites 
      </Text>
      <List
        contentContainerStyle={styles.friendsList}
        horizontal={true}
        data={friends}
        renderItem={renderFriendItem}
      />
      <Text style={styles.sectionLabel} category="s1">
        Shots
      </Text>
      <List data={posts} numColumns={3} renderItem={renderPostItem} />
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  profileAvatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    marginVertical: 16,
  },
  profileName: {
    zIndex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginVertical: 8,
  },
  profileButtonsContainer: {
    flexDirection: 'row',
    marginVertical: 32,
    marginHorizontal: 20,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  socialsContainer: {
    flexDirection: 'row',
    width: '75%',
    marginVertical: 8,
  },
  profileSocial: {
    flex: 1,
  },
  sectionLabel: {
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  profileDescription: {
    marginHorizontal: 16,
  },
  friendsList: {
    marginHorizontal: 8,
  },
  friendItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  friendName: {
    marginTop: 8,
  },
  postItem: {
    flex: 1,
    aspectRatio: 1.0,
  },
});