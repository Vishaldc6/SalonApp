import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {BaseText, CustomHeader, CustomSwitch} from '../../components';
import {Colors, FontSizes, useGlobalStyles} from '../../styles';
import {AppIcons, AppImages} from '../../utils';
import {useCustomNavigation} from '../../hooks';

interface MenuListType {
  id: number;
  key: string;
  title: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
}

const ProfileScreen = () => {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const navigation = useCustomNavigation('BottomTab');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const MenuList: MenuListType[] = [
    {
      id: 0,
      key: 'edit_profile',
      title: 'Edit Profile',
      icon: AppIcons.user,
      onPress: () => navigation.navigate('EditProfileScreen'),
    },
    {
      id: 1,
      key: 'notification',
      title: 'Notification',
      icon: AppIcons.notification,
      onPress: () =>
        navigation.navigate('SettingScreen', {type: 'notification'}),
    },
    {
      id: 2,
      key: 'payment',
      title: 'Payment',
      icon: AppIcons.wallet,
      onPress: () => {},
    },
    {
      id: 3,
      key: 'security',
      title: 'Security',
      icon: AppIcons.security,
      onPress: () => navigation.navigate('SettingScreen', {type: 'security'}),
    },
    {
      id: 4,
      key: 'language',
      title: 'Language',
      icon: AppIcons.language,
      onPress: () => navigation.navigate('LanguageScreen'),
    },
    {
      id: 5,
      key: 'dark_mode',
      title: 'Dark Mode',
      icon: AppIcons.moon,
    },
    {
      id: 6,
      key: 'privacy_policy',
      title: 'Privacy Policy',
      icon: AppIcons.lock,
      onPress: () => {},
    },
    {
      id: 7,
      key: 'invite_friends',
      title: 'Invite Friends',
      icon: AppIcons.invite,
      onPress: () => navigation.navigate('InviteFriendsScreen'),
    },
    {
      id: 8,
      key: 'logout',
      title: 'Logout',
      icon: AppIcons.logout,
      onPress: () => {},
    },
  ];

  const renderMenu = ({item}: {item: MenuListType}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.menutile}
        onPress={() => item?.onPress && item?.onPress()}>
        <View style={globalStyles.rowCenterContainer}>
          <Image
            source={item.icon}
            style={{
              ...styles.menuIcon,
              tintColor:
                item.key === 'logout' ? Colors.ERROR_TEXT : Colors.PRIMARY_TEXT,
            }}
          />
          <BaseText
            style={{
              ...styles.menuTitle,
              color:
                item.key === 'logout' ? Colors.ERROR_TEXT : Colors.PRIMARY_TEXT,
            }}>
            {item.title}
          </BaseText>
        </View>
        {item.key === 'dark_mode' ? (
          <CustomSwitch
            value={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
        ) : (
          item.key !== 'logout' && (
            <View style={globalStyles.rowCenterContainer}>
              {item.key === 'language' && (
                <BaseText style={styles.selectedLanguage}>{'English'}</BaseText>
              )}
              <Image source={AppIcons.back} style={styles.nextIcon} />
            </View>
          )
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={globalStyles.flexContainer}>
      <CustomHeader title={'Profile'} />
      <ScrollView
        style={globalStyles.appContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={AppImages.user} style={styles.image} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.addImage}
            onPress={() => {}}>
            <Image source={AppIcons.close} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
        <BaseText style={styles.nameText}>{'Daniel Austin'}</BaseText>
        <BaseText style={styles.mailText}>
          {'daniel_austin@yopmail.com'}
        </BaseText>
        <View style={styles.seperator} />
        <FlatList
          scrollEnabled={false}
          data={MenuList}
          renderItem={renderMenu}
          contentContainerStyle={{paddingBottom: wp(5)}}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const useStyles = () => {
  return StyleSheet.create({
    image: {
      resizeMode: 'contain',
      borderRadius: wp(50),
      height: wp(28),
      width: wp(28),
    },
    imageContainer: {
      backgroundColor: Colors.PRIMARY,
      height: wp(28),
      width: wp(28),
      borderRadius: wp(50),
      alignSelf: 'center',
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
    nameText: {
      fontSize: FontSizes.FONT_SIZE_20,
      fontWeight: '600',
      alignSelf: 'center',
      marginVertical: wp(1),
    },
    mailText: {
      fontSize: FontSizes.FONT_SIZE_16,
      fontWeight: '600',
      alignSelf: 'center',
    },
    seperator: {
      marginVertical: wp(4),
      borderColor: Colors.GREY,
      borderWidth: StyleSheet.hairlineWidth,
    },
    menutile: {
      flexDirection: 'row',
      paddingVertical: wp(2),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    menuIcon: {
      height: wp(6),
      width: wp(6),
      marginHorizontal: wp(2),
    },
    menuTitle: {
      marginHorizontal: wp(2),
      fontWeight: '600',
    },
    nextIcon: {
      height: wp(5),
      width: wp(5),
      marginHorizontal: wp(2),
      transform: [
        {
          rotate: '180deg',
        },
      ],
    },
    selectedLanguage: {fontWeight: '600'},
  });
};
