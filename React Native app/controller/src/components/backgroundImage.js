/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';

export class BackgroundImage extends Component{
    render(){
        return (
            <ImageBackground
            style={styles.bgBlock}
            source={require('../assets/images/bg.png')} >
                {this.props.children}
                <Text>Power by</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    bgBlock: {
        flex: 1,
        resizeMode: 'cover',
    },
});
