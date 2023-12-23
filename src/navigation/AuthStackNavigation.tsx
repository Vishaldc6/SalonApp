import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../types/RootStackType';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';
import AuthScreen from '../screens/AuthScreens/AuthScreen';
import InitialAuthScreen from '../screens/AuthScreens/InitialAuthScreen';
import FillProfileScreen from '../screens/AuthScreens/FillProfileScreen';
import ForgotPasswordScreen from '../screens/AuthScreens/ForgotPasswordScreen';
import {AsyncStorageKey, getStorage} from '../utils';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigation = () => {
  const [isOnboardingVisit, setIsOnboardingVisit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getStorage(AsyncStorageKey.IS_ON_BOARDING)
        .then(res => {
          if (res) {
            setIsOnboardingVisit(true);
          }
          setIsLoading(false);
        })
        .catch(e => {
          console.log('🚀 ~ file: AuthStackNavigation.tsx:31 ~ e:', {e});
          setIsLoading(false);
        });
    })();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={
        isOnboardingVisit ? 'InitialAuthScreen' : 'OnboardingScreen'
      }
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
