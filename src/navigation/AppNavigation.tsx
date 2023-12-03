import React from 'react';
import {StyleSheet} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Colors} from '../styles';
import {RootStackParamList} from '../types/RootStackType';
import AuthStackNavigation from './AuthStackNavigation';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const theme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.WHITE,
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={'AuthStack'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'AuthStack'} component={AuthStackNavigation} />
        <Stack.Screen name={'BottomTab'} component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
