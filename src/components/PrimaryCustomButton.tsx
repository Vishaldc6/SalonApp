import React, {memo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import BaseText from './BaseText';
import {Colors, FontSizes} from '../styles';

interface PrimaryCustomButtonProps {
  title: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const PrimaryCustomButton = (
  props: PrimaryCustomButtonProps & TouchableOpacityProps,
) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[styles.buttonContainer, props.containerStyle]}>
      <BaseText style={[styles.titleStyle, props.titleStyle]}>
        {props.title}
      </BaseText>
    </TouchableOpacity>
  );
};

export default memo(PrimaryCustomButton);

const useStyles = () => {
  return StyleSheet.create({
    buttonContainer: {
      backgroundColor: Colors.PRIMARY,
      padding: hp(2),
      alignItems: 'center',
      borderRadius: hp(2),
    },
    titleStyle: {
      fontSize: FontSizes.FONT_SIZE_12,
      textAlign: 'center',
      fontWeight: '500',
      color: Colors.PRIMARY_BACKGROUND,
    },
  });
};
