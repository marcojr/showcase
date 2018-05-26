import { StyleSheet, Dimensions } from 'react-native'
const formWidth = Dimensions.get('window').width * 0.70
export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#68d6f9'
  },
  upper: {
    flex: 1,
    alignItems: 'center',
    padding: 15
  },
  lower: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttons: {
    backgroundColor: '#FFF',
    width: formWidth,
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    marginTop: 15
  },
  buttonSmall: {
    backgroundColor: '#FFF',
    width: formWidth / 2 - 30,
    borderRadius: 50,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10

  },
  buttonsText: {
    fontSize: 17
  },
  loginForm: {
    width: formWidth

  },
  loginFormRow: {
    flexDirection: 'row',
    padding: 15
  },
  loginFormBottomBorder: {
    borderBottomWidth: 1,
    borderColor: '#FFF'
  },
  loginFormCol1: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginFormCol2: {
    flex: 8
  },
  icons: {
    color: '#9ce7ff',
    fontSize: 30
  },
  formActionsCol: {
    width: formWidth / 2,
    justifyContent: 'center'
  },
  txtForgot: {
    color: '#FFF',
    fontSize: 15
  },
  input: {
    color: '#FFF',
    fontSize: 23
  }
})
