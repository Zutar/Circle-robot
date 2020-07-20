/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text,  TouchableHighlight} from 'react-native';

export class DeviceList extends Component {
  render() {
    let list = this.props.list;
    return (
      <View style={styles.deviceBlock}>
        <Text style={styles.deviceBlockTitle}>Доступные устройства</Text>
        <ScrollView>
          <View style={styles.scrollBlock}>
            {
              list.map((el) => (el && <DeviceListItem device={el} key={el.id}/>))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

class DeviceListItem extends Component {
  render(){
    let id = this.props.device.id;
    let name = this.props.device.name;

    return (
      < TouchableHighlight style={styles.listItem} activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => alert('Pressed!')}>
        <Text>{name}</Text>
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
    paddingLeft: '4%',
    flex: 1,
    justifyContent: 'center',
    elevation: 10,
  },
});
