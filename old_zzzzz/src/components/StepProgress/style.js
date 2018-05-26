import {Dimensions, StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent : 'center'
    },
    circle : {
        backgroundColor: '#68d6f9',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent : 'center'
    },
    circleSeparator: {
        marginRight: 20
    },
    text : {
        color: '#000',
        fontSize: 12
    },
    line : {
        height: 2,
        position: 'absolute',
        backgroundColor: '#68d6f9',
        top: 10
    },
    currentBullet: {
        width: 40,
        height: 40,
        position: 'absolute'
    },
    pastIcon : {
        width: 14,
        height: 14,
        position: 'absolute'
    },
    show: {
        opacity: 1
    },
    hide : {
        opacity: 0
    }
});