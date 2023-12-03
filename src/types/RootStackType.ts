import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
};

export type AuthStackParamList = {
  OnboardingScreen: undefined;
  InitialAuthScreen: undefined;
  AuthScreen: undefined;
  FillProfileScreen: undefined;
  ForgotPasswordScreen: undefined;
};

export type BottomTabParamList = {
  HomeScreen: undefined;
  ExploreScreen: undefined;
  MyBookingScreen: undefined;
  InboxScreen: undefined;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  NotificationSettingScreen: undefined;
  SecurityScreen: undefined;
  LanguageScreen: undefined;
  PrivacyPolicyScreen: undefined;
  InviteFriendScreen: undefined;
  PaymentScreen: undefined;
};
