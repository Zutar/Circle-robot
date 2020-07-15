/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';

import {BackgroundImage} from '../components/backgroundImage';

export class Connection extends Component {
  render() {
      return (
        <BackgroundImage>
          <View style={styles.container}>
            <TouchableOpacity
              style={{
                width:170,
                height: 170,
                borderRadius:85,
              }}
              onPress = { () =>{
                alert('test')}
              }
            >
              <ImageBackground style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}} source={require('../assets/images/roundButton.png')}>
                <Text style={{color: 'white'}}>{'Подключиться\nчерез Bluetooth'}</Text>
              </ImageBackground>
            </TouchableOpacity>
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
  },
});
