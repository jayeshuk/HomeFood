import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import axios from 'react-native-axios';
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
import {logUser} from '_redux_store/actions';
import jwt_decode from 'jwt-decode';
import {useSelector, useDispatch} from 'react-redux';

export default ({navigation}) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [emailcaption, setEmailCaption] = React.useState('');
  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setEmailCaption('Incorrect Email Id !');
    } else {
      setEmailCaption('');
    }
  };
  // var data = JSON.stringify({email: email, password: password});
  var data = JSON.stringify({email: 'adi@jonas.io', password: 'pass1234'});
  const windowHeight = Dimensions.get('window').height;

  // const logged_user = useSelector((state) => state.main_app.logged_user);
  const dispatch = useDispatch();
  const LogUser = (logindata) => dispatch(logUser(logindata));

  var config = {
    method: 'post',
    url: 'http://192.168.43.132:3000/api/v1/users/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  const styles = useStyleSheet(themedStyles);

  const onSignInButtonPress = async () => {
    await axios(config)
      .then(function (res) {
        console.log(JSON.stringify(res.data));
        // let json = res.json();
        // console.log(res);
        let id = jwt_decode(res.data.token).id;
        if (res.data.status === 'success') {
          LogUser({token: res.data.token, email: email, id: id});
          navigation &&
            navigation.navigate(
              selectedIndex ? 'MakerTabNavigator' : 'UserTabNavigator',
            );
        }
        return res.data;
      })
      .catch(function (error) {
        if (error.message.endsWith('0')) {
          window.alert(`Please provide Email Id and Password`);
        } else if (error.message.endsWith('1')) {
          window.alert(`Enter a valid Email Id or Password`);
        } else {
          window.alert(error);
        }
        console.log(error);
      });
  };

  const onSignUpButtonPress = () => {
    navigation && navigation.navigate('SignupScreen');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    // <KeyboardAvoidingView>
    <>
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{width: '100%', height: windowHeight}}>
            <ImageOverlay
              style={styles.container}
              source={require('../../assets/images/start_stove.jpg')}>
              <View style={styles.headerContainer}>
                <Text style={styles.helloLabel} status="control">
                  Sign In
                </Text>
                <Text style={styles.signInLabel} category="s1" status="control">
                  Get Started with Signing In
                </Text>
              </View>

              <View style={styles.tabContentContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Text
                    category="h6"
                    status="control"
                    style={{alignSelf: 'center'}}>
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
                  placeholder="Email"
                  accessoryLeft={EmailIcon}
                  value={email}
                  onChangeText={setEmail}
                  caption={(TextProps) => (
                    <Text style={{color: '#FFE347'}}>{emailcaption}</Text>
                  )}
                  onBlur={() => {
                    validate(email);
                  }}
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
          </View>
        </ScrollView>
      </View>
    </>
    // {/* </KeyboardAvoidingView> */}
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
