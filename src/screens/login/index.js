import React from 'react';
import {View} from 'react-native';
import {
  Button,
  Input,
  StyleService,
  Text,
  useStyleSheet,
  Radio,
  RadioGroup,
} from '@ui-kitten/components';
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  FacebookIcon,
  GoogleIcon,
  PersonIcon,
  PlusIcon,
  TwitterIcon,
  LockIcon,
} from './extra/icons';
import {ImageOverlay} from './extra/image-overlay.component';
import {KeyboardAvoidingView} from './extra/3rd-party';

export default ({navigation}) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // console.log(selectedIndex);

  const styles = useStyleSheet(themedStyles);

  const onSignInButtonPress = () => {
    navigation && navigation.navigate('AppTabNavigator');
  };

  const onSignUpButtonPress = () => {
    navigation && navigation.navigate('SignupScreen');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require('../../assets/images/start_stove.jpg')}>
        <View style={styles.headerContainer}>
          <Text style={styles.helloLabel} status="control">
            Sign In
          </Text>
          <Text style={styles.signInLabel} category="s1" status="control">
            Sign in to your account with Email or SMS
          </Text>
        </View>

        <View style={styles.tabContentContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Text category="h6" status="control" style={{alignSelf: 'center'}}>
              Role :
            </Text>
            <RadioGroup
              style={{flexDirection: 'row'}}
              status="control"
              selectedIndex={selectedIndex}
              onChange={(index) => {
                setSelectedIndex(index);
              }}>
              <Radio>User</Radio>
              <Radio>Maker</Radio>
            </RadioGroup>
          </View>
          <Input
            style={styles.formInput}
            status="control"
            placeholder="Email or Phone"
            accessoryLeft={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.formInput}
            status="control"
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            accessoryLeft={LockIcon}
            value={password}
            onChangeText={setPassword}
            onIconPress={onPasswordIconPress}
          />
        </View>

        <Button
          style={styles.signInButton}
          size="giant"
          onPress={onSignInButtonPress}>
          SIGN IN
        </Button>
        <Button
          style={styles.signUpButton}
          appearance="ghost"
          status="control"
          onPress={onSignUpButtonPress}>
          Don't have an account? Sign Up
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text style={styles.socialAuthHintText} status="control">
            Or Sign In Using Social Media
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance="ghost"
              size="giant"
              status="control"
              accessoryLeft={FacebookIcon}
            />
            <Button
              appearance="ghost"
              size="giant"
              status="control"
              accessoryLeft={GoogleIcon}
            />
            <Button
              appearance="ghost"
              size="giant"
              status="control"
              accessoryLeft={TwitterIcon}
            />
          </View>
        </View>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    paddingHorizontal: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helloLabel: {
    fontSize: 26,
    lineHeight: 32,
  },
  signInLabel: {
    marginTop: 8,
    textAlign: 'center',
  },
  tabContentContainer: {
    padding: 16,
  },
  formInput: {
    marginTop: 16,
  },
  smsCaptionLabel: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  select: {
    flex: 1,
    // marginHorizontal: 2,
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});
