import Toast from 'react-native-root-toast';


export const ShowToast = (type,message) => {
    let bg = 'black'
    let tc = 'white'
    if (type == 'successfully') {
        bg = 'green'
    }
    if (type == 'critical') {
        bg = 'red'
    }
    if (type == 'warning') {
        bg = 'yellow'
        tc =  'black'
    }
    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: bg,
        textColor: tc
    });
}