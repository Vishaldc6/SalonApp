import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
  TextInput,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import OtpInputs from 'react-native-otp-inputs';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {Colors, FontSizes, useGlobalStyles} from '../../styles';
import {
  BaseText,
  CustomCheckBox,
  CustomHeader,
  CustomLoader,
  CustomModal,
  CustomOTPFieldComponent,
  PrimaryCustomButton,
  PrimaryCustomTextInput,
} from '../../components';
import {AppIcons, AppImages, AsyncStorageKey, setStorage} from '../../utils';
import {useCustomNavigation} from '../../hooks';

interface ContactOptionsType {
  id: number;
  key: 'sms' | 'email';
  title: string;
  icon: ImageSourcePropType;
  value: string;
}

const OtpCodeSchema = Yup.object().shape({
  otpCode: Yup.string().trim(),
});

const ForgotPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .min(8, '* password must be contain at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
      '* password must contain at least one lowercase character, one uppercase character, one digit and one special character',
    )
    .required('* please enter password'),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password')], '* passwords dose not match')
    .required('* please enter confirm password'),
});

const ForgotPasswordScreen = () => {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const navigation = useCustomNavigation('AuthStack');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModel, setIsModel] = useState(false);
  const [resendTime, setResendTime] = useState(300);
  const [screenStatus, setScreenStatus] = useState<
    'choose_contact' | 'verify_otp' | 'new_password'
  >('choose_contact');
  const [selectedContact, setSelectedContact] = useState<
    ContactOptionsType | undefined
  >({
    id: 0,
    key: 'sms',
    title: 'via SMS :',
    icon: AppIcons.message,
    value: '+91 12*** ***89',
  });
  const passwordFieldRef = useRef<TextInput>(null);
  const confirmPasswordFieldRef = useRef<TextInput>(null);

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
      otpCode: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema:
      screenStatus === 'verify_otp' ? OtpCodeSchema : ForgotPasswordSchema,
    onSubmit: values => {
      console.log(
        '🚀 ~ file: ForgotPasswordScreen.tsx:48 ~ ForgotPasswordScreen ~ values:',
        {values},
      );

      if (isChecked) {
        // save user updated password
        // setStorage(AsyncStorageKey.REMEMBER_AUTH, {email:'olderEmail',password:'newPassword'})
      }

      setIsLoading(true);

      setTimeout(() => {
        setIsModel(true);
        setIsLoading(false);
      }, 1000);
    },
  });

  const ContactOptions: ContactOptionsType[] = [
    {
      id: 0,
      key: 'sms',
      title: 'via SMS :',
      icon: AppIcons.message,
      value: '+91 12*** ***89',
    },
    {
      id: 1,
      key: 'email',
      title: 'via Email :',
      icon: AppIcons.mail,
      value: 'test****er@yopmail.com',
    },
  ];

  useEffect(() => {
    if (screenStatus === 'verify_otp') {
      const interval = setInterval(() => {
        if (resendTime === 0) {
          clearInterval(interval);
        } else {
          setResendTime(resendTime - 1);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [screenStatus, resendTime]);

  const verifyOtpCode = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setScreenStatus('new_password');
    }, 1000);
  };

  return (
    <View style={globalStyles.flexContainer}>
      {isLoading && <CustomLoader />}
      <CustomHeader
        title={
          screenStatus !== 'new_password'
            ? 'Forgot Password'
            : 'Create New Password'
        }
        canGoBack
        onBack={() =>
          screenStatus === 'choose_contact'
            ? navigation.goBack()
            : // Alert.alert('back')
            screenStatus === 'verify_otp'
            ? setScreenStatus('choose_contact')
            : setScreenStatus('verify_otp')
        }
      />
      <View
        style={{
          ...globalStyles.appContainer,
          justifyContent: 'center',
        }}>
        {screenStatus === 'choose_contact' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Image
                source={AppImages.forgotPassword}
                style={styles.forgotPasswordImage}
              />
            </View>

            <BaseText style={styles.instructionText}>
              {
                'Select which contact details should we use to reset your password'
              }
            </BaseText>

            {ContactOptions.map(contact => (
              <TouchableOpacity
                style={[
                  styles.contactContainer,
                  {
                    borderWidth: selectedContact?.key === contact.key ? 1 : 0.5,
                    borderColor:
                      selectedContact?.key === contact.key
                        ? Colors.PRIMARY
                        : Colors.GREY,
                  },
                ]}
                onPress={() => setSelectedContact(contact)}>
                <View style={styles.contactIconContainer}>
                  <Image source={contact?.icon} style={styles.contactIcon} />
                </View>
                <View style={globalStyles.appContainer}>
                  <BaseText style={styles.contactTitle}>
                    {contact.title}
                  </BaseText>
                  <BaseText style={styles.contactValue}>
                    {contact.value}
                  </BaseText>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : screenStatus === 'verify_otp' ? (
          <View style={{flex: 1}}>
            <BaseText style={[styles.instructionText, {textAlign: 'center'}]}>
              {'OTP has been sent to ' + selectedContact?.value}
            </BaseText>
            {/* <CustomOTPFieldComponent length={4} /> */}
            <OtpInputs
              value={values.otpCode}
              autofillFromClipboard={false}
              numberOfInputs={4}
              handleChange={code => {
                if (code.length === 4) {
                  verifyOtpCode();
                }
                handleChange('otpCode');
              }}
              inputMode={'numeric'}
              returnKeyType={'done'}
              keyboardType={'phone-pad'}
              style={{
                marginVertical: hp(5),
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
              inputStyles={{
                textAlign: 'center',
                color: Colors.PRIMARY_TEXT,
              }}
              inputContainerStyles={{
                backgroundColor: Colors.INPUT_BACKGROUND,
                borderRadius: hp(2),
                width: wp(15),
                height: wp(15),
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: Colors.TRANSPARENT,
              }}
              focusStyles={{
                backgroundColor: Colors.INPUT_FOCUSED_BACKGROUND,
                borderColor: Colors.PRIMARY,
                borderWidth: 1,
              }}
            />

            {resendTime ? (
              <BaseText style={[styles.instructionText, {textAlign: 'center'}]}>
                {'Resend OTP in'}
                <BaseText style={{color: Colors.PRIMARY}}>
                  &nbsp;{resendTime}&nbsp;
                </BaseText>
                {'s'}
              </BaseText>
            ) : (
              <BaseText
                style={[styles.resendCode, {textAlign: 'center'}]}
                onPress={() => Alert.alert('Sent!!')}>
                {'Resend OTP'}
              </BaseText>
            )}
          </View>
        ) : (
          screenStatus === 'new_password' && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <Image
                  source={AppImages.newPassword}
                  style={styles.forgotPasswordImage}
                />
              </View>
              <BaseText style={styles.instructionText}>
                {'Create your new password'}
              </BaseText>

              <PrimaryCustomTextInput
                ref={passwordFieldRef}
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder={'Enter Password'}
                leftIcon={AppIcons.lock}
                isPasswordField={true}
                returnKeyType={'next'}
                onSubmitEditing={() =>
                  confirmPasswordFieldRef?.current?.focus()
                }
                errorText={touched.password ? errors.password : ''}
              />
              <PrimaryCustomTextInput
                ref={confirmPasswordFieldRef}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                placeholder={'Enter Confirm Password'}
                leftIcon={AppIcons.lock}
                isPasswordField={true}
                errorText={
                  touched.confirmPassword ? errors.confirmPassword : ''
                }
              />

              <CustomCheckBox
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                label={'Remember me'}
                style={{alignSelf: 'flex-end'}}
              />
            </ScrollView>
          )
        )}
        {screenStatus !== 'verify_otp' && (
          <PrimaryCustomButton
            title={'Continue'}
            containerStyle={{marginVertical: hp(2), elevation: 4}}
            onPress={() => {
              screenStatus === 'choose_contact' &&
                (setResendTime(30), setScreenStatus('verify_otp'));
              screenStatus === 'new_password' && handleSubmit();
            }}
          />
        )}
      </View>

      {isModel && (
        <CustomModal
          icon={AppIcons.check}
          title={'Congratulation!'}
          subTitle={
            'Your account is ready to use. you will be redirected to the home page in a few seconds.'
          }
          isLoading
          dismissAction={() => setIsModel(false)}
        />
      )}
    </View>
  );
};

export default ForgotPasswordScreen;

const useStyles = () => {
  return StyleSheet.create({
    forgotPasswordImage: {
      height: wp(70),
      width: wp(70),
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    instructionText: {
      fontSize: FontSizes.FONT_SIZE_14,
      fontWeight: '400',
      marginVertical: hp(2),
    },
    contactContainer: {
      flexDirection: 'row',
      borderRadius: wp(2),
      alignItems: 'center',
      padding: hp(2),
      marginVertical: hp(1),
    },
    contactIconContainer: {
      backgroundColor: Colors.INPUT_FOCUSED_BACKGROUND,
      padding: wp(4),
      borderRadius: wp(10),
    },
    contactIcon: {
      tintColor: Colors.PRIMARY,
      height: wp(6),
      width: wp(6),
    },
    contactTitle: {
      fontSize: FontSizes.FONT_SIZE_12,
      fontWeight: '300',
    },
    contactValue: {
      fontSize: FontSizes.FONT_SIZE_14,
      fontWeight: '500',
    },
    resendCode: {
      color: Colors.PRIMARY,
      textDecorationLine: 'underline',
    },
  });
};
