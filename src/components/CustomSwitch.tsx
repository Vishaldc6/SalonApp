import React, {memo, useEffect, useRef} from 'react';
import {
  Animated,
  ColorValue,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import {Colors} from '../styles';

interface CustomSwitchProps {
  value: boolean;
  onChange: () => void;
  trackBallStyle?: ViewStyle;
  activeTrackBallColor?: ColorValue;
  inActiveTrackBallColor?: ColorValue;
  switchContainerStyle?: ViewStyle;
  activeSwitchBackgroundColor?: ColorValue;
  inActiveSwitchBackgroundColor?: ColorValue;
}

const CustomSwitch = (props: CustomSwitchProps) => {
  const styles = useStyles();
  const trackBallRef = useRef(new Animated.Value(0)).current;

  const trackBallTranslate = () => {
    Animated.timing(trackBallRef, {
      toValue: props.value ? 20 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    trackBallTranslate();
  }, [props.value]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onChange}
      style={[
        styles.switchContainer,
        props.switchContainerStyle,
        {
          elevation: props.value ? 5 : 0,
          backgroundColor: props.value
            ? props.activeSwitchBackgroundColor ?? Colors.PRIMARY
            : props.inActiveSwitchBackgroundColor ?? Colors.INPUT_BACKGROUND,
        },
      ]}>
      <Animated.View
        style={[
          styles.trackBall,
          props.trackBallStyle,
          {
            backgroundColor: props.value
              ? props.activeTrackBallColor ?? Colors.WHITE
              : props.inActiveTrackBallColor ?? Colors.WHITE,
            transform: [{translateX: trackBallRef}],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default memo(CustomSwitch);

const useStyles = () => {
  return StyleSheet.create({
    switchContainer: {
      // width: wp(12),
      // height: wp(7),
      // borderRadius: wp(6),
      width: 45,
      height: 25,
      borderRadius: 20,
      padding: 2.5,
      justifyContent: 'center',
    },
    trackBall: {
      flex: 1,
      borderRadius: 20,
      width: 20,
      elevation: 5,
    },
  });
};
