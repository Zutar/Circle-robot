/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, Alert, ActivityIndicator, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import BluetoothSerial from 'react-native-bluetooth-serial-next';

export class DeviceList extends Component{
  render(){
    let list = this.props.list;
    let navigation = this.props.navigation;
    return (
      <View style={styles.deviceBlock}>
        <Text style={styles.deviceBlockTitle}>Доступные устройства</Text>
        <ScrollView>
          <View style={styles.scrollBlock}>
            {(list.length <= 0 && <ActivityIndicator style={styles.mainIndicator} size="large" color="#494949" />)}
            {
              list.map((el) => (el && el.id != 0 && <DeviceListItem device={el} navigation={navigation} key={el.id}/>))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

class DeviceListItem extends Component {
  state = {
    pairing: false
  }
  async connectToDevice(){
    if(this.state.pairing) return;
    const id = this.props.device.id;

    if(BluetoothSerial.isConnected()){
      this.setState({pairing: false});
      this.props.navigation.navigate('Controller', {id: id});
    }else{
      this.setState({pairing: true});
      const devices = await BluetoothSerial.list();
      const found = devices.find(d => d.id === id);

      if(!found){
        const device = await BluetoothSerial.pairDevice(id);
        console.log(device);
        if(!device){
          Alert.alert(
            'Ошибка!',
            'Ошибка при подключении к устройству!'
        );
        }
      }

      const connected = await BluetoothSerial.device(id).connect();
      console.log(connected);
      this.setState({pairing: false});
      this.props.navigation.navigate('Controller', {id: id});
    }
  }

  render(){
    const name = this.props.device.name;
    const pair = this.state.pairing;

    return (
      < TouchableHighlight style={styles.listItem} activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => this.connectToDevice()}>
          <View style={styles.itemWrapper}>
            <Text numberOfLines={1} style={styles.itemText}>{name}</Text>
            {(pair && <ActivityIndicator style={styles.smallIndicator} size="small" color="#494949"/>)}
            <Icon
            name="chevron-thin-right"
            color="black"
            size={20} style={styles.itemIcon}/>
        </View>
      </ TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  deviceBlock: {
    width: '85%',
    height: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    padding: 20,
    position: 'absolute',
    bottom: -20,
  },
  deviceBlockTitle: {
    alignSelf: 'center',
    fontFamily: 'CenturyGothic',
    fontSize: 18,
  },
  scrollBlock: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 30,
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '92%',
    height: 50,
    marginTop: 15,
    paddingLeft: '10%',
    flex: 1,
    justifyContent: 'center',
    elevation: 10,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    position: 'absolute',
     right: 20,
  },
  itemText: {
    fontSize: 16,
    width: '80%',
  },
  mainIndicator: {
    top: 25,
    transform: [{scale: 1.5}]
  },
  smallIndicator: {
    right: 25
  }
});
