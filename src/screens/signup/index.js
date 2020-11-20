import React from 'react';
import {View} from 'react-native';
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
} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {add} from 'react-native-reanimated';

export default ({navigation}) => {
  const [kitchenName, setKitchenName] = React.useState();
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [address, setAddress] = React.useState();
  const [age, setAge] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [date, setDate] = React.useState();

  const minDate = new Date(2018, 11, 24, 10, 33, 30, 0);
  const maxDate = new Date();
  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = () => {
    navigation && navigation.navigate('LoginScreen');
  };

  const onSignInButtonPress = () => {
    navigation && navigation.navigate('LoginScreen');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPhotoButton = () => (
    <Button
      style={styles.editAvatarButton}
      size="small"
      accessoryLeft={PlusIcon}
    />
  );

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require('../../assets/images/start_stove_old.jpg')}>
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
            />
            <Input
              style={styles.formInput}
              status="control"
              autoCapitalize="none"
              placeholder="Last Name"
              accessoryLeft={PersonIcon}
              value={lastName}
              onChangeText={setLastName}
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
            placeholder="Email or Phone"
            accessoryLeft={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.formInput}
            status="control"
            placeholder="Age"
            accessoryLeft={AgeIcon}
            value={age}
            onChangeText={setAge}
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
          onPress={onSignUpButtonPress}>
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
      </ImageOverlay>
    </KeyboardAvoidingView>
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
});
