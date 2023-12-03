import React, {forwardRef, memo, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TextInputProps,
  ImageSourcePropType,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import BaseText from './BaseText';
import {AppIcons} from '../utils';
import {Colors, FontSizes} from '../styles';

interface PrimaryCustomTextInputProps {
  errorText?: string;
  isPasswordField?: boolean;
  rightIcon?: ImageSourcePropType;
  onRightIconPress?: () => void;
  rightComponent?: React.ReactNode;
  leftIcon?: ImageSourcePropType;
  onLeftIconPress?: () => void;
  leftComponent?: React.ReactNode;
  containerStyle?: ViewStyle;
}

const PrimaryCustomTextInput = forwardRef(
  (
    props: PrimaryCustomTextInputProps & TextInputProps,
    ref: React.LegacyRef<TextInput> | undefined,
  ) => {
    const styles = useStyles();
    const [isFocused, setIsFocused] = useState(false);
    const [isVisiable, setIsVisiable] = useState(props.isPasswordField);

    return (
      <>
        <View
          style={{
            ...styles.inputContainer,
            backgroundColor: props.errorText
              ? Colors.ERROR_INPUT_BACKGROUND
              : isFocused
              ? Colors.INPUT_FOCUSED_BACKGROUND
              : Colors.INPUT_BACKGROUND,
            borderColor: props.errorText
              ? Colors.ERROR_TEXT
              : isFocused
              ? Colors.PRIMARY
              : Colors.TRANSPARENT,
            ...props.containerStyle,
          }}>
          {props.leftIcon ? (
            <View style={styles.leftIconContainer}>
              <Image
                source={props.leftIcon}
                resizeMode="contain"
                style={styles.icon}
              />
            </View>
          ) : (
            props.leftComponent
          )}

          <TextInput
            {...props}
            ref={ref}
            style={styles.input}
            placeholderTextColor={Colors.GREY}
            secureTextEntry={isVisiable}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {props.isPasswordField ? (
            <TouchableOpacity
              style={styles.rightIconContainer}
              onPress={() => setIsVisiable(!isVisiable)}>
              <Image
                source={isVisiable ? AppIcons.close_eye : AppIcons.eye}
                resizeMode="contain"
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : props.rightIcon ? (
            <View style={styles.rightIconContainer}>
              <Image
                source={props.rightIcon}
                resizeMode="contain"
                style={styles.icon}
              />
            </View>
          ) : (
            props.rightComponent
          )}
        </View>
        {props.errorText && (
          <BaseText style={styles.errorText}>{props.errorText}</BaseText>
        )}
      </>
    );
  },
);

export default memo(PrimaryCustomTextInput);

const useStyles = () => {
  return StyleSheet.create({
    inputContainer: {
      borderWidth: 1,
      borderRadius: hp(2),
      flexDirection: 'row',
      marginVertical: wp(2),
    },
    input: {
      flex: 1,
      marginHorizontal: wp(2),
      color: Colors.PRIMARY_TEXT,
      // fontSize: FontSizes.FONT_SIZE_10
    },
    leftIconContainer: {
      justifyContent: 'center',
      paddingLeft: wp(3),
    },
    rightIconContainer: {
      justifyContent: 'center',
      paddingRight: wp(3),
    },
    icon: {
      width: wp(5),
      height: wp(5),
    },
    errorText: {
      marginLeft: wp(3),
      color: Colors.ERROR_TEXT,
      fontSize: FontSizes.FONT_SIZE_14,
    },
  });
};
