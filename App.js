import React, { Fragment } from 'react';
import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'



import Pomodoro from './src/index'

function StatusBar() {
  return (
    <View style={{ height: Constants.statusBarHeight}}/>
  )
}

export default function App() {
  return (
  <Fragment>
    <StatusBar />
    <Pomodoro />
  </Fragment>
  
  )
}
