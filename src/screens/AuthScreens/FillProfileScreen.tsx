import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CountryPicker from 'rn-country-picker';
import DatePicker from 'react-native-date-picker';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';

import {Colors, useGlobalStyles} from '../../styles';
import {
  CustomDropdownMenu,
  CustomHeader,
  CustomLoader,
  PrimaryCustomButton,
  PrimaryCustomTextInput,
} from '../../components';
import {AppIcons, AppImages} from '../../utils';
import {useCustomNavigation} from '../../hooks';

const FillProfileSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, '* please enetr valid name')
    .required('* please enter name'),
  email: Yup.string()
    .trim()
    .email('* please enter valid email')
    .required('* please enter email'),
  dob: Yup.date().required('* please choose date of birth'),
  phoneNumber: Yup.string()
    .trim()
    .min(10, '* please enter valid phone number')
    .required('* please enter phone number'),
  gender: Yup.string(),
});

const FillProfileScreen = () => {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const navigation = useCustomNavigation('AuthStack');
  const [isLoading, setIsLoading] = useState(false);
  const [isDateModal, setIsDateModal] = useState(false);
  const [gender, setGender] = useState({
    id: 0,
    title: 'Male',
  });
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [imageUrl, setImageUrl] = useState<string>('');
  const nameFieldRef = useRef<TextInput>(null);
  const emailFieldRef = useRef<TextInput>(null);
  const phoneNumberFieldRef = useRef<TextInput>(null);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    setFieldError,
    resetForm,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      dob: '',
      phoneNumber: '',
      gender: '',
    },
    validationSchema: FillProfileSchema,
    onSubmit: values => {
      console.log(
        '🚀 ~ file: FillProfileScreen.tsx:43 ~ FillProfileScreen ~ values:',
        {values},
      );

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        navigation.reset({index: 0, routes: [{name: 'BottomTab'}]});
      }, 1000);
    },
  });

  const genderMenu = [
    {
      id: 0,
      title: 'Male',
    },
    {
      id: 1,
      title: 'Female',
    },
    {
      id: 2,
      title: 'Other',
    },
  ];

  const imagePicker = () => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    }).then(res => {
      res?.assets?.length && setImageUrl(res?.assets[0]?.uri ?? '');
    });
  };

  return (
    <View style={globalStyles.flexContainer}>
      {isLoading && <CustomLoader />}
      <CustomHeader
        title={'Fill Your Profile'}
        canGoBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: wp(4),
        }}>
        <View style={styles.imageContainer}>
          <Image
            source={imageUrl ? {uri: imageUrl} : AppImages.user}
            style={styles.image}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.addImage}
            onPress={imagePicker}>
            <Image source={AppIcons.close} style={styles.addIcon} />
          </TouchableOpacity>
        </View>

        <PrimaryCustomTextInput
          ref={nameFieldRef}
          value={values.name}
          onChangeText={handleChange('name')}
          placeholder={'Enter Full Name'}
          leftIcon={AppIcons.user}
          returnKeyType={'next'}
          onSubmitEditing={() => emailFieldRef?.current?.focus()}
          errorText={touched.name ? errors.name : ''}
        />
        <PrimaryCustomTextInput
          ref={emailFieldRef}
          value={values.email}
          onChangeText={handleChange('email')}
          placeholder={'Enter Email'}
          leftIcon={AppIcons.mail}
          returnKeyType={'next'}
          keyboardType={'email-address'}
          onSubmitEditing={() => phoneNumberFieldRef?.current?.focus()}
          errorText={touched.email ? errors.email : ''}
        />
        <Pressable onPress={() => setIsDateModal(true)}>
          <PrimaryCustomTextInput
            value={values.dob}
            placeholder={'Choose Date of Birth'}
            leftIcon={AppIcons.calendar}
            editable={false}
            errorText={touched.dob ? errors.dob : ''}
          />
        </Pressable>

        {/* <CountryPicker
                    disable={false}
                    animationType={"slide"}
                    language="en"
                    containerStyle={{
                        height: 54,
                        width: 150,
                        marginVertical: 10,
                        borderColor: "#303030",
                        alignItems: "center",
                        marginHorizontal: 10,
                        padding: 10,
                        backgroundColor: "white",
                        borderRadius: 5,
                        borderWidth: 2,
                        // fontSize: 16,
                        // color: "#000",
                    }}
                    pickerTitleStyle={{
                        justifyContent: "center",
                        flexDirection: "row",
                        alignSelf: "center",
                        fontWeight: "bold",
                    }}
                    // dropDownImage={require("./res/ic_drop_down.png")}
                    selectedCountryTextStyle={{
                        paddingLeft: 5,
                        color: "#000",
                        textAlign: "right",
                    }}
                    countryNameTextStyle={{
                        paddingLeft: 10,
                        color: "#000",
                        textAlign: "right",
                    }}
                    pickerTitle={"Country Picker"}
                    searchBarPlaceHolder={"Search......"}
                    hideCountryFlag={false}
                    hideCountryCode={false}
                    searchBarStyle={{ flex: 1 }}
                    backButtonImage={require("./res/ic_back_black.png")}
                    searchButtonImage={require("./res/ic_search.png")}
                    countryCode={"1"}
                    selectedValue={setCountryCode}
                /> */}

        <PrimaryCustomTextInput
          ref={phoneNumberFieldRef}
          value={values.phoneNumber}
          onChangeText={handleChange('phoneNumber')}
          containerStyle={{
            // backgroundColor: 'red',
            paddingHorizontal: wp(3),
          }}
          leftComponent={
            // need to changes in library
            <CountryPicker
              disable={true}
              selectedValue={setCountryCode}
              hideCountryCode
              searchBarPlaceHolder={'Select your country'}
              countryFlagStyle={styles.countryFlagStyle}
              // containerStyle={{
              //     // backgroundColor: 'yellow',
              // }}
              // dropDownImageStyle={{
              //     // marginLeft: wp(2)
              // }}
              // searchBarContainerStyle={{
              //     // backgroundColor: 'red'
              // }}
              // searchBarStyle={{
              //     backgroundColor: 'yellow'
              // }}
              // hideCountryFlag
              // backButtonImage={AppIcons.back}
            />
          }
          placeholder={'Enter Phone Number'}
          keyboardType={'number-pad'}
          errorText={touched.phoneNumber ? errors.phoneNumber : ''}
        />

        <CustomDropdownMenu
          data={genderMenu}
          selectedItem={gender}
          onSelectItem={item => {
            setGender(item);
            handleChange('gender')(item.title);
          }}
          placeholderText={'Select Gender'}
        />

        <PrimaryCustomButton
          title={'Save Profile'}
          containerStyle={styles.buttonContainer}
          onPress={() => handleSubmit()}
        />

        <DatePicker
          date={new Date()}
          modal
          open={isDateModal}
          mode={'date'}
          onCancel={() => setIsDateModal(false)}
          onConfirm={date => {
            setIsDateModal(false);
            handleChange('dob')(date.toDateString());
          }}
          title={null}
          maximumDate={new Date()}
        />
      </ScrollView>
    </View>
  );
};

export default FillProfileScreen;

const useStyles = () => {
  return StyleSheet.create({
    imageContainer: {
      backgroundColor: Colors.PRIMARY,
      height: wp(25),
      width: wp(25),
      borderRadius: wp(50),
      alignSelf: 'center',
    },
    image: {
      resizeMode: 'contain',
      borderRadius: wp(50),
      height: wp(25),
      width: wp(25),
    },
    addImage: {
      backgroundColor: Colors.PRIMARY,
      borderRadius: wp(5),
      borderColor: Colors.WHITE,
      borderWidth: 2,
      padding: wp(2),
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    addIcon: {
      transform: [
        {
          rotate: '45deg',
        },
      ],
      height: wp(3),
      width: wp(3),
    },
    countryFlagStyle: {
      width: wp(8),
      height: wp(6),
    },
    buttonContainer: {
      marginVertical: hp(2),
      marginBottom: hp(15),
      elevation: 4,
    },
  });
};
