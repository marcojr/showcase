import {StyleSheet} from 'react-native'
export default StyleSheet.create({
  page: {
    backgroundColor: '#fbfbfb',
    flex: 1
  },
  form: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    flex: 16
  },
  progress: {
    flex: 3,
    justifyContent: 'center'
  },
  footer: {
    flex: 2,
    justifyContent: 'center'
  },
  stepDescriptionContainer: {
    alignItems: 'center',
    marginTop: 15
  },
  stepDescriptionText: {
    fontSize: 12
  },
  picker: {
    backgroundColor: '#d8d8d8'
  },
  closePicker: {
    alignItems: 'flex-end',
    padding: 15
  },
  formRow: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
    marginBottom: 15
  },
  formRowDD: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textInput: {
    fontSize: 20
  },
  step1: {
    alignItems: 'center'
  },
  codeEntry: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    width: 280,
    marginTop: 50
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 60
  },
  buttonBorder: {
    borderColor: '#68d6f9',
    borderRadius: 5,
    borderWidth: 1,
    padding: 15,
    width: 220,
    alignItems: 'center'
  },
  buttonText2: {
    color: '#68d6f9',
    fontSize: 15
  },
  codeDigit: {
    backgroundColor: '#d4d4d4',
    width: 55,
    height: 65,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  codeText: {
    color: '#FFF',
    fontSize: 30
  },
  codeTextInput: {
    color: '#FFF',
    fontSize: 30
  },
  step3: {
    alignItems: 'center',
    height: 350
  },
  pictureBorder: {
    borderWidth: 3,
    width: 156,
    height: 156,
    borderRadius: 156 / 2,
    borderColor: '#68d6f9'
  },
  picture: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  step4: {
    alignItems: 'center'
  },
  groupTitle: {
    color: '#68d6f9',
    padding: 15
  },
  groupItem: {
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingTop: 6,
    paddingBottom: 6,
    alignItems: 'center'
  },
  groupTextWrapper: {
    flexDirection: 'row'
  },
  groupItemInfo: {
    color: '#68d6f9',
    fontSize: 22
  },
  groupItemText: {
    fontSize: 18,
    paddingLeft: 5
  },
  smsText: {
    alignItems: 'center',
    marginTop: 5
  },
  smsWarning: {
    fontSize: 11,
    color: 'red'
  },
  formattedPhoneNumber: {
    color: 'black'
  }
})
