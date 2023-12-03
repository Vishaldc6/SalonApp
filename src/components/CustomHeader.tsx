import React, {memo} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {AppIcons} from '../utils';
import {FontSizes, useGlobalStyles} from '../styles';
import BaseText from './BaseText';

interface CustomHeaderProps {
  title?: string;
  canGoBack?: boolean;
  onBack?: () => void;
}

const CustomHeader = ({title, canGoBack, onBack}: CustomHeaderProps) => {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();

  return (
    <View style={styles.headerContainer}>
      {canGoBack && (
        <TouchableOpacity onPress={onBack}>
          <Image
            source={AppIcons.back}
            style={styles.backIcon}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
      {title && <BaseText style={styles.title}>{title}</BaseText>}
    </View>
  );
};

export default memo(CustomHeader);

const useStyles = () => {
  return StyleSheet.create({
    headerContainer: {
      paddingTop: StatusBar.currentHeight,
      height: hp(12),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(4),
    },
    backIcon: {
      width: wp(4),
      height: wp(8),
    },
    title: {
      fontSize: FontSizes.FONT_SIZE_18,
      marginHorizontal: wp(3),
      fontWeight: '500',
    },
  });
};
