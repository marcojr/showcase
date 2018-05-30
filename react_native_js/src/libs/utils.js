import Toast from 'react-native-root-toast'
import {AsyncStorage} from 'react-native'

export const ShowToast = (type, message) => {
  let bg = 'black'
  let tc = 'white'
  if (type === 'successfully') {
    bg = 'green'
  }
  if (type === 'critical') {
    bg = 'red'
  }
  if (type === 'warning') {
    bg = 'yellow'
    tc = 'black'
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
  })
}

export const WriteToLocalDB = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log('Error saving data' + error)
  }
}
export const ReadFromLocalDB = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (error) {
    console.log('Error saving data' + error)
  }
}
