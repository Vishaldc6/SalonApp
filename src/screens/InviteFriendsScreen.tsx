import React, {useCallback, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {Colors, FontSizes, useGlobalStyles} from '../styles';
import {BaseText, CustomHeader, PrimaryCustomButton} from '../components';
import {useCustomNavigation} from '../hooks';

interface FriendsType {
  id: number;
  name: string;
  phoneNumber: string;
  profile: string;
}
const FriendsList: FriendsType[] = [
  {
    id: 0,
    name: 'Freida Varnes',
    phoneNumber: '+91 01234 56789',
    profile:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    id: 1,
    name: 'Freida Varnes',
    phoneNumber: '+91 01234 56789',
    profile:
      'https://www.mecgale.com/wp-content/uploads/2017/08/dummy-profile.png',
  },
  {
    id: 2,
    name: 'Freida Varnes',
    phoneNumber: '+91 01234 56789',
    profile: 'https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  },
  {
    id: 3,
    name: 'Freida Varnes',
    phoneNumber: '+91 01234 56789',
    profile:
      'https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-13.jpg',
  },
  {
    id: 4,
    name: 'Freida Varnes',
    phoneNumber: '+91 01234 56789',
    profile:
      'https://elshinta.com/asset/admin/app-assets/images/portrait/small/avatar-s-20.jpg',
  },
];

const InviteFriendsScreen = () => {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const navigation = useCustomNavigation('InviteFriendsScreen');
  const [invitedFriends, setInvitedFriends] = useState<number[] | undefined>(
    [],
  );

  const renderFriend = useCallback(
    ({item}: {item: FriendsType}) => {
      const isInvited = invitedFriends?.includes(item.id);
      return (
        <View style={styles.friendContainer}>
          <Image source={{uri: item.profile}} style={styles.friendProfile} />
          <View style={styles.nameContainer}>
            <BaseText style={styles.nameText}>{item.name}</BaseText>
            <BaseText style={styles.phoneText}>{item.phoneNumber}</BaseText>
          </View>
          <PrimaryCustomButton
            title={isInvited ? 'Invited' : 'Invite'}
            disabled={isInvited}
            onPress={() =>
              setInvitedFriends([...(invitedFriends ?? []), item.id])
            }
            containerStyle={{
              ...styles.inviteButton,
              backgroundColor: isInvited ? Colors.WHITE : Colors.PRIMARY,
            }}
            titleStyle={{
              color: isInvited ? Colors.PRIMARY : Colors.WHITE,
            }}
          />
        </View>
      );
    },
    [invitedFriends],
  );

  return (
    <View style={globalStyles.flexContainer}>
      <CustomHeader
        title={'Invite Friends'}
        canGoBack
        onBack={() => navigation.goBack()}
      />
      <View style={globalStyles.appContainer}>
        <FlatList data={FriendsList} renderItem={renderFriend} />
      </View>
    </View>
  );
};

export default InviteFriendsScreen;

const useStyles = () => {
  return StyleSheet.create({
    friendContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: wp(2),
      alignItems: 'center',
    },
    friendProfile: {
      height: wp(13),
      width: wp(13),
      borderRadius: wp(13),
    },
    nameContainer: {flex: 1, paddingHorizontal: wp(4)},
    nameText: {
      fontSize: FontSizes.FONT_SIZE_18,
      color: Colors.PRIMARY_TEXT,
      fontWeight: '500',
    },
    phoneText: {
      fontSize: FontSizes.FONT_SIZE_14,
      color: Colors.TAB_ICON,
      fontWeight: '500',
    },
    inviteButton: {
      paddingVertical: wp(1.5),
      paddingHorizontal: wp(3),
      borderRadius: wp(10),
      borderWidth: 1,
      borderColor: Colors.PRIMARY,
    },
  });
};
