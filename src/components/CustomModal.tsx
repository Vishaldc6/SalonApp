import React, {memo} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {AppIcons} from '../utils';
import {Colors, FontSizes} from '../styles';
import BaseText from './BaseText';
import PrimaryCustomButton from './PrimaryCustomButton';

interface CustomModalProps {
  icon: ImageSourcePropType;
  title: string;
  subTitle: string;
  children?: React.ReactNode;
  positiveButtonTitle?: string;
  positiveButtonAction?: () => void;
  negativeButtonTitle?: string;
  negativeButtonAction?: () => void;
  isLoading?: boolean;
  dismissAction?: () => void;
}

const CustomModal = (props: CustomModalProps) => {
  const styles = useStyles();

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={props.dismissAction}>
          <Image source={AppIcons.close} style={styles.closeIcon} />
        </TouchableOpacity>
        <View>
          <View style={styles.iconContainer}>
            <Image source={props.icon} style={styles.icon} />
          </View>
          <BaseText style={styles.title}>{props.title}</BaseText>
          <BaseText style={styles.subTitle}>{props.subTitle}</BaseText>
        </View>
        {props.isLoading && (
          <Image
            source={require('../assets/loader.gif')}
            style={styles.loader}
          />
        )}
        <View style={styles.actionButtonContainer}>
          {props.positiveButtonTitle && (
            <PrimaryCustomButton
              title={props.positiveButtonTitle}
              onPress={props.positiveButtonAction}
              containerStyle={{flex: 1}}
            />
          )}
          {props.negativeButtonTitle && (
            <PrimaryCustomButton
              title={props.negativeButtonTitle}
              onPress={props.negativeButtonAction}
              containerStyle={{flex: 1}}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default memo(CustomModal);

const useStyles = () => {
  return StyleSheet.create({
    backgroundContainer: {
      backgroundColor: '#00000040',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    modalView: {
      margin: wp(12),
      backgroundColor: 'white',
      padding: wp(8),
      borderRadius: wp(5),
    },
    closeIcon: {
      height: wp(5),
      width: wp(5),
      alignSelf: 'flex-end',
    },
    iconContainer: {
      backgroundColor: Colors.PRIMARY,
      padding: wp(6),
      borderRadius: wp(10),
      alignSelf: 'center',
    },
    icon: {
      height: wp(7),
      width: wp(7),
      tintColor: 'white',
    },
    loader: {
      height: wp(20),
      width: wp(20),
      alignSelf: 'center',
    },
    title: {
      fontSize: FontSizes.FONT_SIZE_20,
      fontWeight: '600',
      color: Colors.PRIMARY,
      marginVertical: wp(2),
      textAlign: 'center',
    },
    subTitle: {
      marginVertical: wp(2),
      textAlign: 'center',
    },
    actionButtonContainer: {
      flexDirection: 'row',
      gap: wp(4),
    },
  });
};
