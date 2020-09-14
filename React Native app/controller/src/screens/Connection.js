/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, findNodeHandle, Platform} from 'react-native';
import {requestLocationPermission} from '../functions/requestLocationPermission';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';


import {BackgroundImage} from '../components/backgroundImage';
import {RoundButton} from '../components/roundButton';
import {DeviceList} from '../components/deviceList';

export class Connection extends Component {
  state = {
    deviceArray: [],
    enable: false,
  }

 async getDeviceList(){
    const permission = requestLocationPermission();
    if (!permission) {return;}

    if (Platform.Version >= 29) {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
      .then(data => {
        console.log(`DATA: ${data}`);
      }).catch(err => {
        console.log(`ERROR: ${err}`);
      });
    }

    const status = await BluetoothSerial.isEnabled();

    if (status){
      this.setState({enable: true}); // Show DeviceList
      const devices = await BluetoothSerial.listUnpaired();
      this.setState({deviceArray: devices});
      console.log(devices);
    } else {
      await BluetoothSerial.requestEnable();
    }
  }

  async hideDeviceList(event){
    const elementHandle = findNodeHandle(this.refs.bg);
    if (event.nativeEvent.target === elementHandle){
      await BluetoothSerial.cancelDiscovery();
      this.setState({
        enable: false,
        deviceArray: [],
      });
    }
  }

  render() {
    let deviceArray = this.state.deviceArray;

    return (
      <BackgroundImage>
        <TouchableWithoutFeedback onPress={this.hideDeviceList.bind(this)}>
          <View ref="bg" style={styles.container}>
            {!this.state.enable ? <RoundButton click={this.getDeviceList.bind(this)} /> : null}
            {this.state.enable ? <DeviceList list={deviceArray} navigation={this.props.navigation}/> : null}
          </View>
        </TouchableWithoutFeedback>
      </BackgroundImage>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
});
