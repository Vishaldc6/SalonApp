import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {RouteProp, useRoute} from '@react-navigation/native';

import {Colors, FontSizes, useGlobalStyles} from '../../styles';
import {
  BaseText,
  CustomCheckBox,
  CustomHeader,
  CustomLoader,
  PrimaryCustomButton,
  PrimaryCustomTextInput,
} from '../../components';
import {AppIcons, AsyncStorageKey, getStorage, setStorage} from '../../utils';
import {AuthButtons} from './InitialAuthScreen';
import useCustomNavigation from './../../hooks/useCustomNavigation';
import {AuthStackParamList} from '../../types/RootStackType';

const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('* please enter valid email')
    .required('* please enter email'),
  password: Yup.string()
    .trim()
    .min(8, '* password must be contain at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
      '* password must contain at least one lowercase character, one uppercase character, one digit and one special character',
    )
    .required('* please enter password'),
});

const AuthScreenType = {
  SIGN_UP: {
    mainTitle: 'Create your account',
    actionTitle: 'Sign up',
    subTitle: 'Already have an account?',
    subActionTitle: 'Sign in',
  },
  SIGN_IN: {
    mainTitle: 'Login to your account',
    actionTitle: 'Sign in',
    subTitle: "Don't have an account?",
    subActionTitle: 'Sign up',
  },
};

const AuthScreen = () => {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const navigation = useCustomNavigation('AuthStack');
  const {params} = useRoute<RouteProp<AuthStackParamList, 'AuthScreen'>>();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [screenType, setScreenType] = useState<'SIGN_IN' | 'SIGN_UP'>(
    'SIGN_IN',
  );
  const emailFieldRef = useRef<TextInput>(null);
  const passwordFieldRef = useRef<TextInput>(null);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: AuthSchema,
    onSubmit: values => {
      console.log('🚀 ~ file: AuthScreen.tsx:60 ~ AuthScreen ~ values:', {
        values,
      });
      setIsLoading(true);
      if (isChecked) {
        // save user credentials
        setStorage(AsyncStorageKey.REMEMBER_AUTH, values);
      }
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('AuthStack', {
          screen: 'FillProfileScreen',
        });
      }, 1000);
    },
  });

  useEffect(() => {
    if (params?.type === 'SIGN_UP') {
      setScreenType('SIGN_UP');
    }
  }, []);

  useEffect(() => {
    if (screenType === 'SIGN_IN') {
      getRememberedAuth();
    } else {
      setIsChecked(false);
      resetForm();
    }
  }, [screenType]);

  // get remembered user credentials
  const getRememberedAuth = () => {
    setIsLoading(true);
    getStorage(AsyncStorageKey.REMEMBER_AUTH)
      .then((res: any) => {
        console.log({res});
        if (res) {
          setFieldValue('email', res?.email);
          setFieldValue('password', res?.password);
          setIsChecked(true);
        }
        setIsLoading(false);
      })
      .catch(e => {
        console.log('🚀 ~ file: AuthScreen.tsx:88 ~ getStorage ~ e:', {e});
        setIsLoading(false);
      });
  };

  return (
    <View style={globalStyles.flexContainer}>
      {isLoading && <CustomLoader />}
      <CustomHeader />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.appContainer}>
        <BaseText style={styles.mainText}>
          {AuthScreenType[screenType].mainTitle}
        </BaseText>
        <PrimaryCustomTextInput
          ref={emailFieldRef}
          value={values.email}
          onChangeText={handleChange('email')}
          placeholder={'Enter Email'}
          leftIcon={AppIcons.mail}
          returnKeyType={'next'}
          keyboardType={'email-address'}
          onSubmitEditing={() => passwordFieldRef?.current?.focus()}
          errorText={touched.email ? errors.email : ''}
        />
        <PrimaryCustomTextInput
          ref={passwordFieldRef}
          value={values.password}
          onChangeText={handleChange('password')}
          placeholder={'Enter Password'}
          leftIcon={AppIcons.lock}
          returnKeyType={'done'}
          isPasswordField={true}
          errorText={touched.password ? errors.password : ''}
        />

        <CustomCheckBox
          value={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          label={'Remember me'}
          style={{alignSelf: 'flex-end'}}
        />

        <PrimaryCustomButton
          title={AuthScreenType[screenType].actionTitle}
          containerStyle={{
            marginVertical: hp(2),
            elevation: 4,
          }}
          onPress={() => handleSubmit()}
        />

        {screenType === 'SIGN_IN' && (
          <BaseText
            style={styles.forgotPassword}
            onPress={() => {
              if (errors.email === undefined && values.email !== '') {
                navigation.navigate('AuthStack', {
                  screen: 'ForgotPasswordScreen',
                  params: {
                    email: values.email,
                  },
                });
              } else {
                setFieldTouched('email');
              }
            }}>
            {'Forgot password ?'}
          </BaseText>
        )}

        <View style={styles.orOptionContainer}>
          <View style={styles.optionBar} />
          <BaseText
            style={{marginHorizontal: '2%', fontSize: FontSizes.FONT_SIZE_12}}>
            {'or continue with'}
          </BaseText>
          <View style={styles.optionBar} />
        </View>

        <View style={globalStyles.rowCenterContainer}>
          {AuthButtons.map(item => (
            <TouchableOpacity
              style={styles.authButtonContainer}
              onPress={item.onPress}>
              <Image source={item.icon} style={styles.authIcon} />
            </TouchableOpacity>
          ))}
        </View>

        <BaseText style={styles.subText}>
          {AuthScreenType[screenType].subTitle}&nbsp;
          <BaseText
            style={{color: Colors.PRIMARY}}
            onPress={() => {
              console.log('Sign up');
              setIsLoading(true);
              setTimeout(() => {
                screenType == 'SIGN_IN'
                  ? setScreenType('SIGN_UP')
                  : setScreenType('SIGN_IN');
                setIsLoading(false);
              }, 1000);
            }}>
            &nbsp;{AuthScreenType[screenType].subActionTitle}
          </BaseText>
        </BaseText>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AuthScreen;

const useStyles = () => {
  return StyleSheet.create({
    mainText: {
      paddingVertical: '8%',
      width: '80%',
      fontSize: FontSizes.FONT_SIZE_24,
      fontWeight: '600',
    },
    orOptionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: hp(3),
    },
    optionBar: {
      flex: 1,
      height: 0.5,
      opacity: 0.3,
      backgroundColor: Colors.PRIMARY_TEXT,
    },
    authButtonContainer: {
      flexDirection: 'row',
      borderWidth: 0.3,
      borderRadius: wp(1),
      padding: hp(2),
      marginHorizontal: wp(4),
      marginVertical: hp(1),
    },
    authIcon: {
      marginHorizontal: wp(3),
      height: wp(6),
      width: wp(6),
    },
    subText: {
      fontSize: FontSizes.FONT_SIZE_12,
      textAlign: 'center',
      marginVertical: hp(3),
    },
    forgotPassword: {
      fontSize: FontSizes.FONT_SIZE_12,
      color: Colors.PRIMARY,
      textDecorationLine: 'underline',
      textAlign: 'center',
      alignSelf: 'center',
    },
  });
};
