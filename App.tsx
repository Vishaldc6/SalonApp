import {StyleSheet, View, LogBox, StatusBar} from 'react-native';

import {Colors} from './src/styles';
import AppNavigation from './src/navigation/AppNavigation';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={'dark-content'}
      />
      <AppNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BACKGROUND,
  },
});
