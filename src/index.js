import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Pomodoro</Text>
    </View>
  )
}

function Timer() {

  const [mode, setMode] = useState('pomodoro')
  const [timeMins, setTimeMins] = useState(1)
  const [timeSegs, setTimeSegs] = useState(59)
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [color, setColor] = useState('#FE8181')

  const pomodoroTime = 1

  const [counter, setCounter] = useState(null)

  function start() {
    setStarted(true)
    setTimeMins((value) => value - 1)
  }

  function stop() {
    setStarted(false)
    setTimeMins(mode === 'pomodoro' ? 25 : 5)
    setPaused(false)
    clearInterval(counter)
  }

  function leftPadZero(value) {
    return value < 10 ? `0${value}` : value
  }

  function chageMode() {
    setStarted(false)
    setMode((value) => (value === "pomodoro" ? "break" : "pomodoro"))
  }

  useEffect(() => {
    if (mode === 'pomodoro') {
      setColor("#FE8181")
      setTimeMins(25)
    } else {
      setColor("#72e58b")
      setTimeMins(5)
    }
  }, [mode])

  useEffect(() => {
    if (started && !paused) {
      setCounter(setInterval(() => {
        setTimeSegs((value) => value - 1)
      }, 1000))
    } else if(started && paused) {
      clearInterval(counter)
    } else {
      clearInterval(counter)
      setTimeSegs(59)
    }
  }, [started, paused])

  useEffect(() => {
    if (timeSegs === 0) {
      setTimeMins(value => value - 1)
      setTimeSegs(59)
    }
  }, [timeSegs])

  useEffect(() => {
    if (timeMins === 0 && timeSegs === 0) {
      setMode((value) => (value === "pomodoro" ? "break" : "pomodoro"))
      setTimeMins(mode === 'pomodoro' ? 25 : 5)
      setStarted(false)
      setPaused(false)
      clearInterval(counter)
    }
  }, [timeMins, timeSegs])


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={chageMode} style={[
        styles.modeBadge, 
        {backgroundColor: color}
        ]}>
        <Text style={styles.modeBadgeText}>{mode}</Text>
      </TouchableOpacity>
      <View>
        <Text style={[
          styles.timerText,
          {color: color}
        ]}>
          {leftPadZero(timeMins)}:{started ? leftPadZero(timeSegs): "00"}
      </Text>
      </View>

      <View style={styles.buttonContainer}>
        {
          !started ? (
            <TouchableOpacity onPress={start}>
            <MaterialCommunityIcons 
              name="play-circle-outline"
              color= {color}
              size={86}
            />
          </TouchableOpacity>
          ) : (
            <Fragment>
              <TouchableOpacity onPress={() => setPaused((value) => !value)}>
              <MaterialCommunityIcons 
                name={`${paused ? "play" : "pause"}-circle-outline`}
                color= {color}
                size={86}
                
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={stop} >
              <MaterialCommunityIcons 
                name="stop-circle-outline"
                color={color}
                size={86}
                />
            </TouchableOpacity>
          </Fragment>
          )
        }

      

      </View>

    </View>
  )
}


export default function Pomodoro() {
  return (
    <Fragment>
      <Header/>

      <Timer/>

    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
    justifyContent: "space-evenly"
  },
  header: {
    padding: 18,
    backgroundColor: '#FFF',
    borderBottomColor: "#f0f0fd",
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modeBadge: {
    width: 130,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    alignSelf: "center"
    
  },
  modeBadgeText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#FFF",
    textAlign: "center"
  },
  timerText: {
    fontSize: 100,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 176,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
