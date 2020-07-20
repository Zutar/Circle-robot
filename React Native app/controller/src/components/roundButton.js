/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {TouchableOpacity, ImageBackground, Text, StyleSheet} from 'react-native';

export class RoundButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.touchContainer}
        onPress={this.props.click}>
        <ImageBackground
          style={styles.imageContainer}
          source={require('../assets/images/roundButton.png')}>
          <Text style={styles.buttonText}>
            {' Подключиться\nчерез Bluetooth'}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchContainer: {
    width: 170,
    height: 170,
    borderRadius: 85,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
     fontFamily: 'CenturyGothic',
     fontSize: 16,
  },
});
