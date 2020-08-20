import React, {Component} from 'react'
import {TouchableHighlight, Text, TouchableOpacity, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default class GradientControlButton extends Component{
    render(){
        const title = this.props.children ? this.props.children : '';
        const press = this.props.press ? this.props.press : () => {};

        return (
            <TouchableHighlight style={styles.Wrapper}>
            <LinearGradient style={styles.gradientWrapper} colors={['#00a3af','#0d194f']}
            start={{x: 1.0, y: 0.0}} end={{x: 1.0, y: 1.0}}>
                <TouchableOpacity style={styles.button} onPress={press}>
                  <Text style={styles.buttonTitle}>{title}</Text>
                </TouchableOpacity>
          </LinearGradient>  
          </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    Wrapper: {
        width: '40%',
        height: 55,
        marginTop: 20,
        borderRadius: 15,
        borderColor: '#06668a',
        borderWidth: 3
    },
    gradientWrapper: {
        height: 49,
        borderRadius: 12,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
    }
});