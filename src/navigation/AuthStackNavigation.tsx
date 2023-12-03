import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../types/RootStackType';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';
import AuthScreen from '../screens/AuthScreens/AuthScreen';
import InitialAuthScreen from '../screens/AuthScreens/InitialAuthScreen';
import FillProfileScreen from '../screens/AuthScreens/FillProfileScreen';
import ForgotPasswordScreen from '../screens/AuthScreens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'OnboardingScreen'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'OnboardingScreen'} component={OnboardingScreen} />
      <Stack.Screen name={'InitialAuthScreen'} component={InitialAuthScreen} />
      <Stack.Screen name={'AuthScreen'} component={AuthScreen} />
      <Stack.Screen name={'FillProfileScreen'} component={FillProfileScreen} />
      <Stack.Screen
        name={'ForgotPasswordScreen'}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;

const styles = StyleSheet.create({});
