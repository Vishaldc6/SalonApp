import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {Colors} from '../styles';

interface CustomRadioButtonProps {
  value: boolean;
  onChange: () => void;
}

const CustomRadioButton = (props: CustomRadioButtonProps) => {
  const styles = useStyles();
  return (
    <TouchableOpacity onPress={props.onChange} style={styles.container}>
      {props.value && <View style={styles.activeContainer} />}
    </TouchableOpacity>
  );
};

export default memo(CustomRadioButton);

const useStyles = () => {
  return StyleSheet.create({
    container: {
      borderWidth: 1.5,
      height: wp(5),
      width: wp(5),
      borderRadius: wp(5),
      borderColor: Colors.PRIMARY,
      padding: 2,
    },
    activeContainer: {
      flex: 1,
      backgroundColor: Colors.PRIMARY,
      borderRadius: wp(5),
    },
  });
};
