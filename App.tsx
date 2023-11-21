import { StyleSheet, View, LogBox, StatusBar } from 'react-native';

import { Colors } from './src/styles';

import OnboardingScreen from './src/screens/OnboardingScreen/OnboardingScreen';
import InitialAuthScreen from './src/screens/AuthScreens/InitialAuthScreen';
import AuthScreen from './src/screens/AuthScreens/AuthScreen';
import FillProfileScreen from './src/screens/AuthScreens/FillProfileScreen';

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
      {/* <OnboardingScreen /> */}
      {/* <InitialAuthScreen /> */}
      <AuthScreen />
      {/* <FillProfileScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BACKGROUND
  },
});
