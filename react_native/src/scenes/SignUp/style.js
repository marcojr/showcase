import { StyleSheet} from 'react-native';
export default StyleSheet.create({
    page : {
        backgroundColor : '#fbfbfb',
        flex: 1
    },
    form: {
        flex: 16,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        //backgroundColor: 'red'
    },
    progress: {
        //backgroundColor: 'blue',
        flex: 2
    },
    footer : {
        flex: 2,
        justifyContent: 'center'
    },
    button: {

    },
    stepDescriptionContainer : {
        alignItems: 'center',
        marginTop: 15
    },
    stepDescriptionText : {
        fontSize: 12
    },
    picker: {
        backgroundColor: '#d8d8d8'
    },
    closePicker : {
        alignItems: 'flex-end',
        padding: 15
    },
    formRow: {
        paddingTop:15,
        paddingBottom: 15,
        borderBottomWidth:1,
        borderColor: '#d7d7d7',
        marginBottom: 15,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    textInput: {
        fontSize: 20
    },
    step2 : {
        alignItems: 'center'
    },
    codeEntry : {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        width: 280,
        marginTop: 50
    },
    buttonContainer : {
        alignItems: 'center',
        marginTop: 60
    },
    buttonBorder: {
        borderColor : '#68d6f9',
        borderRadius: 5,
        borderWidth: 1,
        padding: 15,
        width: 220,
        alignItems: 'center'
    },
    buttonText2 : {
        color: '#68d6f9',
        fontSize: 15
    },
    codeDigit : {
        backgroundColor: '#d4d4d4',
        width: 55,
        height: 65,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    codeText : {
        color: '#FFF',
        fontSize: 30
    },
    step4 : {
        alignItems: 'center',
        height: 350
    },
    pictureBorder : {
        borderWidth: 3,
        width: 156,
        height: 156,
        borderRadius: 156 / 2,
        borderColor: '#68d6f9'
    },
    picture : {
        width: 150,
        height: 150,
        borderRadius: 75
    }
});