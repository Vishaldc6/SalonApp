import React, {memo} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {Colors, FontSizes, useGlobalStyles} from '../styles';
import {AppIcons} from '../utils';
import BaseText from './BaseText';

interface CustomCheckBoxProps {
  value: boolean;
  onChange: () => void;
  label?: string;
  style?: ViewStyle;
}

const CustomCheckBox = ({
  label,
  onChange,
  value,
  style,
}: CustomCheckBoxProps) => {
  const styles = useStyles();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.checkBoxContainer,
          {
            backgroundColor: value ? Colors.PRIMARY : Colors.TRANSPARENT,
          },
        ]}
        onPress={onChange}>
        {value && <Image source={AppIcons.check} style={styles.checkIcon} />}
      </TouchableOpacity>

      {label && <BaseText style={styles.labelText}>{label}</BaseText>}
    </View>
  );
};

export default memo(CustomCheckBox);

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkBoxContainer: {
      borderWidth: 1,
      borderColor: Colors.PRIMARY,
      height: wp(5),
      width: wp(5),
      borderRadius: wp(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkIcon: {
      tintColor: Colors.WHITE,
      height: wp(3.5),
      width: wp(3.5),
    },
    labelText: {
      fontSize: FontSizes.FONT_SIZE_12,
      marginHorizontal: wp(2),
    },
  });
};
