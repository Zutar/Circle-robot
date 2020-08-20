/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, Image, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import AxisPad from 'react-native-axis-pad';
import Modal from 'react-native-modal';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import { Buffer } from "buffer";

import {BackgroundImage} from '../components/backgroundImage';
import GradientControlButton from '../components/gradientControlButton';
import {InfoBlock} from '../components/InfoBlock';

global.Buffer = Buffer;
const iconv = require("iconv-lite");

export class Controller extends Component {
  constructor({ route, navigation }){
    super();
    this.state = {
      connection: false,
      infoBlockShow: false,
    };
    this.id = route.params.id;
	}

  openModal(){
    this.setState({
      infoBlockShow: true,
    });
  }

  closeModal(){
    this.setState({
      infoBlockShow: false,
    });
  }

  writePackets = async (id, message, packetSize = 64) => {
    try {
      const device = BluetoothSerial.device(id);
      const toWrite = iconv.encode(message, "cp852");
      const writePromises = [];
      const packetCount = Math.ceil(toWrite.length / packetSize);

      for (var i = 0; i < packetCount; i++) {
        const packet = new Buffer(packetSize);
        packet.fill(" ");
        toWrite.copy(packet, 0, i * packetSize, (i + 1) * packetSize);
        writePromises.push(device.write(packet));
      }

      await Promise.all(writePromises).then(() =>
        console.log("WRITED")
      );
    } catch (e) {
      
    }
  };

  render() {
    const connectionState = this.state.connection;
    return (
      <BackgroundImage>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => this.openModal()}>
          <Image style={styles.iconInfo} source={require('../assets/images/iconInfo.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.statusBlock}>
        <Text style={styles.logo}>{'Circle \n Robot'}</Text>
        <Text style={{color: 'white'}}>{'Статус: '}
          <Text style={connectionState ? styles.sConnect : styles.sDisconnect}>{connectionState ? 'Подключён' : 'Отключён'}</Text>
        </Text>
      </View>

      <View style={styles.controlBlock}>
        <AxisPad
          resetOnRelease={true}
          autoCenter={false}
          onValue={({ x, y }) => {
          // values are between -1 and 1
          //console.log(x, y);
        }} />
        <View style={styles.buttonsBlock}>
          <GradientControlButton press={async () => {
            console.log(await BluetoothSerial.writeToDevice("YQ=="));
          }}>
            Hello
          </GradientControlButton>
          <GradientControlButton>Hello</GradientControlButton>
          <GradientControlButton>Hello</GradientControlButton>
          <GradientControlButton>Hello</GradientControlButton>
        </View>
      </View>
      <View style={{    flex: 1,
      justifyContent: 'center',
      alignItems: 'center'}}>
        <Modal animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={()=>this.closeModal()}
        onSwipeComplete={()=>this.closeModal()}
        swipeDirection="right"
        isVisible={this.state.infoBlockShow}
        style={styles.modalStyle}>
          <InfoBlock closeModal={() => this.closeModal()}/>
        </Modal>
      </View>
    </BackgroundImage>
    );
  }
}

const styles = StyleSheet.create({
  topHeader: {
    height: '12%',
    alignItems: 'flex-end',
  },
  iconInfo: {
    width: 30,
    height: 30,
    margin: 15,
  },
  statusBlock: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontFamily: 'Jokerman',
    fontSize: 64,
    lineHeight: 55,
    paddingTop: '5%',
  },
  controlBlock: {
    alignItems: 'center',
    paddingTop: 45,
  },
  sConnect: {
    color: 'green',
  },
  sDisconnect: {
    color: 'red',
  },
  buttonsBlock: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 15,
  },
  modalStyle: {
    backgroundColor:'white',
    borderRadius: 25,
    padding: 15,
    maxHeight: Dimensions.get('window').height * 0.8,
    maxWidth: Dimensions.get('window').width * 0.9,
    marginTop: Dimensions.get('window').height * 0.1,
  },
});
