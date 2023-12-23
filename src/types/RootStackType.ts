import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  BottomTab: NavigatorScreenParams<BottomTabParamList>;

  EditProfileScreen: undefined;
  SettingScreen: {type: 'notification' | 'security'};
  LanguageScreen: undefined;
  InviteFriendsScreen: undefined;
};

export type AuthStackParamList = {
  OnboardingScreen: undefined;
  InitialAuthScreen: undefined;
  AuthScreen: {type: 'SIGN_IN' | 'SIGN_UP'} | undefined;
  FillProfileScreen: undefined;
  ForgotPasswordScreen: {email: string} | undefined;
};

export type BottomTabParamList = {
  HomeScreen: undefined;
  ExploreScreen: undefined;
  MyBookingScreen: undefined;
  InboxScreen: undefined;
  ProfileScreen: undefined;
  // ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

// export type ProfileStackParamList = {
//   ProfileScreen: undefined;
//   EditProfileScreen: undefined;
//   NotificationSettingScreen: undefined;
//   SecurityScreen: undefined;
//   LanguageScreen: undefined;
//   PrivacyPolicyScreen: undefined;
//   InviteFriendScreen: undefined;
//   PaymentScreen: undefined;
// };
