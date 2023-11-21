import { StyleSheet, Text, View, TextProps } from 'react-native'
import React, { memo } from 'react'
import { Colors } from '../styles';

interface BaseTextProps {

}

const BaseText = (props: BaseTextProps & TextProps) => {

  const styles = useStyles()

  return (
    <Text {...props} style={[styles.text, props.style]} >{props.children}</Text>
  );
};

export default memo(BaseText);

const useStyles = () => {

  return StyleSheet.create({
    text: {
      color: Colors.PRIMARY_TEXT
    }
  });
};