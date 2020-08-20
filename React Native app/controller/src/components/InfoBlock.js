import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';

export class InfoBlock extends Component{
    constructor(props){
        super(props);
        this.closeModal = this.props.closeModal;
    }
    
    render(){
        return (
            <View style={styles.infoWrapper}>
                <Icon
                name="close"
                color="grey"
                size={40}
                style={styles.crossIcon}
                onPress={() => this.closeModal()}/>
                <Text style={styles.title}>Информация</Text>
                    <Text style={styles.mainText}>
                    Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    infoWrapper: {
        flex: 1,
    },
    crossIcon: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    mainText: {
        paddingTop: 10,
        fontSize: 16,
    }
});