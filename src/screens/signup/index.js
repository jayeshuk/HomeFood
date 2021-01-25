import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import axios from 'react-native-axios';
import {
  Button,
  CheckBox,
  Input,
  StyleService,
  Text,
  useStyleSheet,
  RadioGroup,
  Radio,
  Datepicker,
  Icon,
} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {ProfileAvatar} from './extra/profile-avatar.component';
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  FacebookIcon,
  GoogleIcon,
  PersonIcon,
  PlusIcon,
  TwitterIcon,
  AgeIcon,
  StoreIcon,
  AddressIcon,
  PhoneIcon,
  AboutIcon,
} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {add} from 'react-native-reanimated';

export default ({navigation}) => {
  const [kitchenName, setKitchenName] = React.useState();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [address, setAddress] = React.useState();
  const [age, setAge] = React.useState();
  const [aboutme, setAboutMe] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmpassword, setConfirmPassword] = React.useState();
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [passwordVisibleC, setPasswordVisibleC] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [date, setDate] = React.useState();
  const [fnameCap, setFNameCap] = React.useState(null);
  const [lnameCap, setLNameCap] = React.useState(null);
  const [phoneCap, setPhoneCap] = React.useState(null);
  const [emailCap, setEmailCap] = React.useState(null);
  const [passCap, setPassCap] = React.useState(null);
  const [cpassCap, setCPassCap] = React.useState(null);
  const [ageCap, setAgeCap] = React.useState(null);

  const minDate = new Date(2018, 11, 24, 10, 33, 30, 0);
  const maxDate = new Date();
  const styles = useStyleSheet(themedStyles);

  var data = JSON.stringify({
    role: selectedIndex ? 'maker' : 'user',
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    password: password,
    confirmPassword: confirmpassword,
    address: address || '',
    age: age,
    aboutme: aboutme,
  });

  const ValidateFields = (fields) => {
    let regName = /^[a-zA-Z]+$/;
    let regPhone = /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/;
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    let regAge = /^[1-9]?[0-9]{1}$|^100$/;

    const c1 = regName.test(firstName);
    const c2 = regName.test(lastName);
    const c3 = regPhone.test(phone);
    const c4 = regEmail.test(email);
    const c5 = regPass.test(password);
    const c6 = regAge.test(age);
    const c7 = regPass.test(confirmpassword);

    // console.log(`C1 ${c1} C2 ${c2} C3${c3} C4${c4} C5${c5} C6 ${c6}`);
    if (c1 && c2 && c3 && c4 && c5 && c6 && c7) {
      onSignUpButtonPress();
    } else {
      c1 ? setFNameCap('') : setFNameCap('Enter a valid First Name!');
      c2 ? setLNameCap('') : setLNameCap('Enter a valid Last Name!');
      c3 ? setPhoneCap('') : setPhoneCap('Enter a valid Phone!');
      c4 ? setEmailCap('') : setEmailCap('Enter a valid Email Id!');
      c5
        ? setPassCap('')
        : setPassCap(
            'Password must conatin atleast 1 Lowercase, Uppercase, Digit and Symbol!',
          );
      c6
        ? age > 18
          ? setAgeCap('')
          : setAgeCap('You must be an Adult(18+) to Register!')
        : setAgeCap('Enter a valid Age!');
      c7
        ? password === confirmpassword
          ? setCPassCap('')
          : setCPassCap('Passwords do not match!')
        : setCPassCap(
            'Password must conatin atleast 1 Lowercase, Uppercase, Digit and Symbol!',
          );
    }
  };

  const windowHeight = Dimensions.get('window').height;
  var config = {
    method: 'post',
    url: 'http://192.168.43.132:3000/api/v1/users/signup',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  const EyeIcon = (style) => (
    <Icon {...style} name="eye" pack="eva" onPress={onPasswordIconPress} />
  );

  const EyeOffIcon = (style) => (
    <Icon {...style} name="eye-off" pack="eva" onPress={onPasswordIconPress} />
  );
  const EyeIconC = (style) => (
    <Icon {...style} name="eye" pack="eva" onPress={onPasswordIconPressC} />
  );

  const EyeOffIconC = (style) => (
    <Icon {...style} name="eye-off" pack="eva" onPress={onPasswordIconPressC} />
  );

  const onSignUpButtonPress = async () => {
    if (termsAccepted) {
      await axios(config)
        .then(function (res) {
          // console.log(JSON.stringify(res.data));
          if (res.data.status === 'success') {
            navigation && navigation.navigate('LoginScreen');
          }
          return res.data;
        })
        .catch(function (error) {
          if (error.message.endsWith('500')) {
            window.alert(error.message);
          }
        });
    } else {
      window.alert('Please accept the Terms and Conditions');
    }
  };

  const onSignInButtonPress = () => {
    navigation && navigation.navigate('LoginScreen');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };
  const onPasswordIconPressC = () => {
    setPasswordVisibleC(!passwordVisibleC);
  };

  const renderPhotoButton = () => (
    <Button
      style={styles.editAvatarButton}
      size="small"
      accessoryLeft={PlusIcon}
    />
  );

  return (
    // <KeyboardAvoidingView>
    <>
      <View style={{flex: 1}}>
        <ImageOverlay
          style={styles.container}
          source={require('../../assets/images/start_stove_old.jpg')}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.headerContainer}>
              <ProfileAvatar
                style={styles.profileAvatar}
                resizeMode="center"
                source={require('./assets/image-person.png')}
                editButton={renderPhotoButton}
              />
              <View style={{marginTop: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    category="h6"
                    status="control"
                    style={{alignSelf: 'center'}}>
                    Role :{'  '}
                  </Text>
                  <RadioGroup
                    style={{flexDirection: 'row'}}
                    status="control"
                    selectedIndex={selectedIndex}
                    onChange={(index) => setSelectedIndex(index)}>
                    <Radio>User</Radio>
                    <Radio>Maker</Radio>
                  </RadioGroup>
                </View>
                <Input
                  style={styles.formInput}
                  status="control"
                  autoCapitalize="none"
                  placeholder="First Name"
                  accessoryLeft={PersonIcon}
                  value={firstName}
                  onChangeText={setFirstName}
                  caption={(TextProps) => (
                    <Text
                      style={[
                        styles.caption,
                        {display: fnameCap ? 'flex' : 'none'},
                      ]}>
                      {fnameCap}
                    </Text>
                  )}
                />
                <Input
                  style={styles.formInput}
                  status="control"
                  autoCapitalize="none"
                  placeholder="Last Name"
                  accessoryLeft={PersonIcon}
                  value={lastName}
                  onChangeText={setLastName}
                  caption={(TextProps) => (
                    <Text
                      style={[
                        styles.caption,
                        {display: lnameCap ? 'flex' : 'none'},
                      ]}>
                      {lnameCap}
                    </Text>
                  )}
                />
              </View>
            </View>
            <View style={styles.formContainer}>
              <Input
                style={styles.formInput}
                status="control"
                autoCapitalize="none"
                placeholder="Kitchen Name"
                disabled={!selectedIndex ? true : false}
                accessoryLeft={StoreIcon}
                value={kitchenName}
                onChangeText={setKitchenName}
              />
              <Input
                style={styles.formInput}
                status="control"
                autoCapitalize="none"
                placeholder="Email"
                accessoryLeft={EmailIcon}
                value={email}
                onChangeText={setEmail}
                caption={(TextProps) => (
                  <Text
                    style={[
                      styles.caption,
                      {display: emailCap ? 'flex' : 'none'},
                    ]}>
                    {emailCap}
                  </Text>
                )}
              />
              <Input
                style={styles.formInput}
                status="control"
                autoCapitalize="none"
                placeholder="Phone"
                accessoryLeft={PhoneIcon}
                value={phone}
                onChangeText={setPhone}
                caption={(TextProps) => (
                  <Text
                    style={[
                      styles.caption,
                      {display: phoneCap ? 'flex' : 'none'},
                    ]}>
                    {phoneCap}
                  </Text>
                )}
              />
              <Input
                style={styles.formInput}
                status="control"
                placeholder="Age"
                accessoryLeft={AgeIcon}
                value={age}
                onChangeText={setAge}
                caption={(TextProps) => (
                  <Text
                    style={[
                      styles.caption,
                      {display: ageCap ? 'flex' : 'none'},
                    ]}>
                    {ageCap}
                  </Text>
                )}
              />
              <Input
                style={styles.formInput}
                status="control"
                placeholder="About Me"
                accessoryLeft={AboutIcon}
                value={aboutme}
                onChangeText={setAboutMe}
              />
              <Input
                style={styles.formInput}
                status="control"
                autoCapitalize="none"
                placeholder="Address"
                accessoryLeft={AddressIcon}
                value={address}
                onChangeText={setAddress}
              />

              <Input
                style={styles.formInput}
                status="control"
                autoCapitalize="none"
                secureTextEntry={!passwordVisible}
                placeholder="Set New Password"
                accessoryLeft={passwordVisible ? EyeIcon : EyeOffIcon}
                value={password}
                onChangeText={setPassword}
                onIconPress={onPasswordIconPress}
                caption={(TextProps) => (
                  <Text
                    style={[
                      styles.caption,
                      {display: passCap ? 'flex' : 'none'},
                    ]}>
                    {passCap}
                  </Text>
                )}
              />
              <Input
                style={styles.formInput}
                status="control"
                autoCapitalize="none"
                secureTextEntry={!passwordVisibleC}
                placeholder="Confirm Password"
                accessoryLeft={passwordVisibleC ? EyeIconC : EyeOffIconC}
                value={confirmpassword}
                onChangeText={setConfirmPassword}
                onIconPress={onPasswordIconPressC}
                caption={(TextProps) => (
                  <Text
                    style={[
                      styles.caption,
                      {display: cpassCap ? 'flex' : 'none'},
                    ]}>
                    {cpassCap}
                  </Text>
                )}
              />
              <CheckBox
                style={styles.termsCheckBox}
                textStyle={styles.termsCheckBoxText}
                // text="I read and agree to Terms Conditions"
                checked={termsAccepted}
                onChange={(checked) => setTermsAccepted(checked)}>
                I have read and agree to Terms & Conditions
              </CheckBox>
            </View>
            <Button
              style={styles.signUpButton}
              size="medium"
              onPress={() => {
                ValidateFields(data);
              }}>
              SIGN UP
            </Button>
            <View style={styles.socialAuthContainer}>
              <Text style={styles.socialAuthHintText} status="control">
                Or Register Using Social Media
              </Text>
              <View style={styles.socialAuthButtonsContainer}>
                <Button
                  appearance="ghost"
                  size="medium"
                  status="control"
                  accessoryLeft={FacebookIcon}
                />
                <Button
                  appearance="ghost"
                  size="medium"
                  status="control"
                  accessoryLeft={GoogleIcon}
                />
                <Button
                  appearance="ghost"
                  size="medium"
                  status="control"
                  accessoryLeft={TwitterIcon}
                />
              </View>
            </View>
            <Button
              style={styles.signInButton}
              appearance="ghost"
              status="control"
              onPress={onSignInButtonPress}>
              Already have account? Sign In
            </Button>
          </ScrollView>
        </ImageOverlay>
      </View>
    </>
    // </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    // backgroundColor: 'red',
    alignItems: 'center',
    minHeight: 176,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  profileAvatar: {
    // backgroundColor: 'red',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: 'background-basic-color-1',
    tintColor: 'text-hint-color',
  },
  editAvatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: 'text-control-color',
    // color: 'black',
  },
  signUpButton: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
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
  caption: {
    color: '#FFE347',
    // backgroundColor: 'red',
  },
});
