import React from 'react';
import {StyleSheet, Image, ImageSourcePropType} from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {Colors} from '../styles';
import {AppIcons} from '../utils';
import {BottomTabParamList} from '../types/RootStackType';
import HomeScreen from '../screens/BottomScreens/HomeScreen';
import ExploreScreen from '../screens/BottomScreens/ExploreScreen';
import MyBookingScreen from '../screens/BottomScreens/MyBookingScreen';
import InboxScreen from '../screens/BottomScreens/InboxScreen';
import ProfileScreen from '../screens/BottomScreens/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigation = () => {
  function TabIconOptions(
    title: string,
    icon: ImageSourcePropType,
  ): BottomTabNavigationOptions {
    return {
      tabBarShowLabel: false,
      headerTitle: title,
      tabBarLabel: title,
      tabBarIcon: ({focused, size}) => (
        <Image
          source={icon}
          style={{
            width: size,
            height: size,
            tintColor: focused ? Colors.PRIMARY : Colors.TAB_ICON,
          }}
        />
      ),
    };
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={TabIconOptions('Home', AppIcons.home)}
      />
      <Tab.Screen
        name={'ExploreScreen'}
        component={ExploreScreen}
        options={TabIconOptions('Explore', AppIcons.map)}
      />
      <Tab.Screen
        name={'MyBookingScreen'}
        component={MyBookingScreen}
        options={TabIconOptions('My Booking', AppIcons.calendar)}
      />
      <Tab.Screen
        name={'InboxScreen'}
        component={InboxScreen}
        options={TabIconOptions('Inbox', AppIcons.message)}
      />
      {/* <Tab.Screen name={'ProfileStack'} component={ProfileStack}/> */}
      <Tab.Screen
        name={'ProfileScreen'}
        component={ProfileScreen}
        options={TabIconOptions('Profile', AppIcons.profile)}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});
