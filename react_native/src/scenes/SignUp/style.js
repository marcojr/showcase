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
    }
});