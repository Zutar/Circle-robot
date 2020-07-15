import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './navigators/RootNavigator';
import SplashScreen from 'react-native-splash-screen'

// import { Colors } from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {
  componentDidMount() {
	SplashScreen.hide();
  }
  render(){
	  return (
		<>
		  <StatusBar barStyle="dark-content" />
		  <SafeAreaView style={styles.appBlock}>
			<NavigationContainer style={styles.appBlock}>
			  <RootNavigator />
			</NavigationContainer>
		  </SafeAreaView>
		</>
	  );
  }
}

const styles = StyleSheet.create({
  appBlock: {
    flex: 1,
  },
  bgBlock: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default App;
