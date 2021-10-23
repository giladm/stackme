//ThemedButton - control light/dark mode
import React, { useContext } from 'react';
import { AppStateAction, AppStateValue, ThemeContext, ThemeContextType } from '../types/ThemeContext';
import {View, Text, StyleSheet, Switch } from 'react-native';
import { Colors } from '../constants/Colors';
import { logger } from "react-native-logs";

export const ThemedButton =() =>{

  const console = logger.createLogger({
    levels: { log: 0, warn: 2, error: 3 }, transportOptions: {colors: "ansi"}
  });
  const appContext: ThemeContextType = useContext(ThemeContext);
  const darkMode: boolean = appContext.themeMode === AppStateValue.DARK;
  const toggleSwitch = () => {
    console.log('****** toggle darkMode:', darkMode);
    appContext.changeAppState(
      AppStateAction.ChangeTheme,
      darkMode ? AppStateValue.LIGHT : AppStateValue.DARK);
  }
  return (
    <>
        <View style={styles.modeView}>
          <Switch
            trackColor={{ false: 'lightgreen', true: 'green' }}
            thumbColor={darkMode ? "#f4f3df" : "#f4f3af"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={darkMode}
          />
          <Text style={[styles.modeText,
          { color: darkMode ? Colors.dark_text : Colors.light_text }]}>
            {darkMode ? 'dark mode' : 'light mode'}
          </Text>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modeView: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 10
  },
  modeText: {
    fontSize: 10,
    paddingTop: 3,
  },
});