/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, View } from 'react-native';

import {BleManager} from 'react-native-ble-plx';

const DeviceManager = new BleManager();


import {BackgroundImage} from '../components/backgroundImage';
import {RoundButton} from '../components/roundButton';
import {DeviceList} from '../components/deviceList';

export class Connection extends Component {
  state = {
    deviceArray: [],
    enable: false,
  }

  getDeviceList(){
    const subscription = DeviceManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        DeviceManager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log('error',error);
          }

          this.setState({enable: true});

          if (device !== null && device.name !== null) {
            // Check for similar id in device array
            let isSet = false;
            let deviceArray = this.state.deviceArray;
            for (let i = 0; i < deviceArray.length; i++){
              if (deviceArray[i].id === device.id){
                isSet = true;
                break;
              }
            }

            if (!isSet){
              //console.log('device found ----> [id,name]', device.id, device.name);

              this.setState((s) => ({
                enable: true,
                deviceArray: s.deviceArray.concat(device),
              }));
              console.log(this.state.deviceArray.length);
            }
          }
        });
        subscription.remove();
      }
  }, true);
  }

  render() {
    let deviceArray = this.state.deviceArray;
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <RoundButton click={this.getDeviceList.bind(this)} />
          {this.state.enable ? <DeviceList list={deviceArray}/> : null}
        </View>
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
