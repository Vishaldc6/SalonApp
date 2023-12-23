import React, {useCallback, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AppIcons} from '../utils';
import {useCustomNavigation} from '../hooks';
import {RootStackParamList} from '../types/RootStackType';
import {Colors, FontSizes, useGlobalStyles} from '../styles';
import {
  BaseText,
  CustomHeader,
  CustomSwitch,
  PrimaryCustomButton,
} from '../components';

interface SettingMenuListType {
  id: number;
  key: string;
  title: string;
  value?: boolean;
}

const SettingScreen = () => {
  const styles = useStyle();
  const globalStyles = useGlobalStyles();
  const navigation = useCustomNavigation('SettingScreen');
  const {params} = useRoute<RouteProp<RootStackParamList, 'SettingScreen'>>();
  const [screenType, setScreenType] = useState<'notification' | 'security'>(
    params.type,
  );
  const [switchValues, setSwitchValues] = useState({
    general_notification: false,
    sound: false,
    vibrate: false,
    special_offers: false,
    promo_discount: false,
    payments: false,
    cashback: false,
    app_updates: false,
    service: false,
    tips: false,
    remember_me: false,
    face_id: false,
    biometric_id: false,
  });

  const NotificationMenuList: SettingMenuListType[] = [
    {
      id: 0,
      key: 'general_notification',
      title: 'General Notification',
      value: switchValues.general_notification,
    },
    {
      id: 1,
      key: 'sound',
      title: 'Sound',
      value: switchValues.sound,
    },
    {
      id: 2,
      key: 'vibrate',
      title: 'Vibrate',
      value: switchValues.vibrate,
    },
    {
      id: 3,
      key: 'special_offers',
      title: 'Special Offers',
      value: switchValues.special_offers,
    },
    {
      id: 4,
      key: 'promo_discount',
      title: 'Promo & Discount',
      value: switchValues.promo_discount,
    },
    {
      id: 5,
      key: 'payments',
      title: 'Payments',
      value: switchValues.payments,
    },
    {
      id: 6,
      key: 'cashback',
      title: 'Cashback',
      value: switchValues.cashback,
    },
    {
      id: 7,
      key: 'app_updates',
      title: 'App Updates',
      value: switchValues.app_updates,
    },
    {
      id: 8,
      key: 'service',
      title: 'New Service Available',
      value: switchValues.service,
    },
    {
      id: 9,
      key: 'tips',
      title: 'New Tips Available',
      value: switchValues.tips,
    },
  ];

  const SecurityMenuList: SettingMenuListType[] = [
    {
      id: 10,
      key: 'remember_me',
      title: 'Remember Me',
      value: switchValues.remember_me,
    },
    {
      id: 11,
      key: 'face_id',
      title: 'Face ID',
      value: switchValues.face_id,
    },
    {
      id: 12,
      key: 'biometric_id',
      title: 'Biometric ID',
      value: switchValues.biometric_id,
    },
    {
      id: 13,
      key: 'google_auth',
      title: 'Google Authenticator',
    },
  ];

  const renderMenu = useCallback(
    ({item}: {item: SettingMenuListType}) => {
      return (
        <View style={styles.menutile}>
          <BaseText style={styles.menuTitle}>{item.title}</BaseText>
          {item.key === 'google_auth' ? (
            <Image source={AppIcons.back} style={styles.nextIcon} />
          ) : (
            <CustomSwitch
              value={!!item?.value}
              onChange={() =>
                setSwitchValues({
                  ...switchValues,
                  [item.key]: !item?.value,
                })
              }
            />
          )}
        </View>
      );
    },
    [switchValues],
  );

  return (
    <View style={globalStyles.flexContainer}>
      <CustomHeader
        canGoBack
        title={screenType === 'notification' ? 'Notification' : 'Security'}
        onBack={() => navigation.goBack()}
      />
      <View style={{paddingHorizontal: wp(4)}}>
        <FlatList
          data={
            screenType === 'notification'
              ? NotificationMenuList
              : SecurityMenuList
          }
          renderItem={renderMenu}
        />
        {screenType === 'security' && (
          <PrimaryCustomButton
            title="Change Password"
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
          />
        )}
      </View>
    </View>
  );
};

export default SettingScreen;

const useStyle = () => {
  return StyleSheet.create({
    menutile: {
      flexDirection: 'row',
      paddingVertical: wp(2),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    menuTitle: {
      marginHorizontal: wp(2),
      fontWeight: '600',
      fontSize: FontSizes.FONT_SIZE_18,
    },
    nextIcon: {
      height: wp(5),
      width: wp(5),
      marginHorizontal: wp(2),
      transform: [{rotate: '180deg'}],
      tintColor: Colors.PRIMARY,
    },
    buttonContainer: {
      marginVertical: hp(3),
      backgroundColor: Colors.INPUT_FOCUSED_BACKGROUND,
    },
    buttonTitle: {color: Colors.PRIMARY},
  });
};
