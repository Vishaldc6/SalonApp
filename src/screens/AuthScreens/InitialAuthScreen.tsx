import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {Colors, FontSizes, useGlobalStyles} from '../../styles';
import {BaseText, CustomHeader, PrimaryCustomButton} from '../../components';
import {AppIcons, AppImages} from '../../utils';
import {useCustomNavigation} from '../../hooks';

interface AuthButtonsType {
  id: number;
  title: string;
  icon: ImageSourcePropType;
  onPress: () => void;
}

export const AuthButtons: AuthButtonsType[] = [
  // {
  //   id: 1,
  //   title: 'Continue with Facebook',
  //   icon: AppIcons.facebook,
  //   onPress: () => console.log('Facebook'),
  // },
  {
    id: 2,
    title: 'Continue with Google',
    icon: AppIcons.google,
    onPress: () => console.log('Google'),
  },
  // {
  //   id: 3,
  //   title: 'Continue with Apple',
  //   icon: AppIcons.apple,
  //   onPress: () => console.log('Apple'),
  // },
];

GoogleSignin.configure({
  webClientId:
    '887563966645-ac2de4kpjfdi35l000428pgkgqgvfv4b.apps.googleusercontent.com',
});

const InitialAuthScreen = () => {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const navigation = useCustomNavigation('AuthStack');

  const googleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log({userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log('some other error happened');
      }
    }
  };

  return (
    <View style={globalStyles.flexContainer}>
      <CustomHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: 'white'}}>
          <Image source={AppImages.initialLogin} style={styles.loginImage} />
        </View>

        <BaseText style={styles.title}>{"Let's you in"}</BaseText>

        {AuthButtons.map(item => (
          <TouchableOpacity
            style={styles.authButtonContainer}
            onPress={item.onPress}
            // onPress={() => {
            //   item.id === 2 ? googleSignin() : null;
            // }}
          >
            <Image source={item.icon} style={styles.authIcon} />
            <BaseText style={{fontSize: FontSizes.FONT_SIZE_12}}>
              {item.title}
            </BaseText>
          </TouchableOpacity>
        ))}

        <View style={styles.orOptionContainer}>
          <View style={styles.optionBar} />
          <BaseText style={{fontSize: FontSizes.FONT_SIZE_12}}>{'or'}</BaseText>
          <View style={styles.optionBar} />
        </View>

        <PrimaryCustomButton
          title={'Sign in with password'}
          containerStyle={{
            marginVertical: hp(2),
            marginHorizontal: wp(4),
            elevation: 5,
          }}
          onPress={() =>
            navigation.navigate('AuthStack', {
              screen: 'AuthScreen',
            })
          }
        />

        <BaseText style={styles.subText}>
          {"Don't have an account?"}&nbsp;
          <BaseText
            style={{color: Colors.PRIMARY}}
            onPress={() =>
              navigation.navigate('AuthStack', {
                screen: 'AuthScreen',
                params: {
                  type: 'SIGN_UP',
                },
              })
            }>
            &nbsp;{'Sign up'}
          </BaseText>
        </BaseText>
      </ScrollView>
    </View>
  );
};

export default InitialAuthScreen;

const useStyles = () => {
  return StyleSheet.create({
    loginImage: {
      height: wp(55),
      width: wp(55),
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    title: {
      fontSize: FontSizes.FONT_SIZE_20,
      textAlign: 'center',
      fontWeight: '700',
      marginVertical: hp(2),
    },
    authButtonContainer: {
      flexDirection: 'row',
      borderWidth: 0.3,
      borderRadius: wp(1),
      justifyContent: 'center',
      padding: hp(2),
      marginHorizontal: wp(4),
      marginVertical: hp(1),
    },
    authIcon: {
      marginHorizontal: wp(3),
      height: wp(6),
      width: wp(6),
    },
    orOptionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: hp(3),
    },
    optionBar: {
      flex: 1,
      marginHorizontal: wp(4),
      height: 0.5,
      opacity: 0.3,
      backgroundColor: Colors.PRIMARY_TEXT,
    },
    subText: {
      fontSize: FontSizes.FONT_SIZE_12,
      textAlign: 'center',
      marginVertical: hp(3),
    },
  });
};
