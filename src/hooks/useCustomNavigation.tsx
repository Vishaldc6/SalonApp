import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {RootStackParamList} from '../types/RootStackType';

const useCustomNavigation = (screenName: keyof RootStackParamList) => {
  type Props = NativeStackScreenProps<RootStackParamList, typeof screenName>;
  // type ScreenNavigationProp = Props['navigation'];
  type ScreenNavigationProp = BottomTabNavigationProp<
    RootStackParamList,
    typeof screenName
  >;

  const navigation = useNavigation<ScreenNavigationProp>();
  return navigation;
};

export default useCustomNavigation;
