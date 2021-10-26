//StackUserInput - control light/dark mode
import React, { useContext, useState } from 'react';
import { AppStateAction, AppStateValue, AppStateContext, ThemeContextType } from '../types/AppStateContext';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../constants/Colors';
import { logger } from "react-native-logs";

export const StackUserInput = () => {
  const console = logger.createLogger({
    levels: { log: 0, warn: 2, error: 3 }, transportOptions: { colors: "ansi" }
  });
  const appContext: ThemeContextType = useContext(AppStateContext);
  const darkMode: boolean = appContext.themeMode === AppStateValue.DARK;
  const [userId, setUserId] = useState('');

  // user continue to enter value until user hit return 
  const onChangeInput = (value) => {
    if (!isNaN(value)) {
      setUserId(value);
    } else {
      console.log('onChangeInput is NOT a valid numeric:', value);
    }
  };

  const processUserInput = () => {
    console.log('>> update Slack user ID[' + userId.trim() + ']');
    appContext.changeAppState(AppStateAction.ChangeUser, userId.trim());
  };

  return (
    <>
      <View style={styles.useridView}>
        <Text style={[styles.headerText,
        { color: darkMode ? Colors.dark_text : Colors.light_text }]}>
          Get Stack Overflow Posts</Text>
        <TextInput style={[styles.inputText,
        { color: darkMode ? Colors.dark_text : Colors.light_text },
        { backgroundColor: !darkMode ? Colors.dark_text : 'gray' },
        ]}
          onChangeText={(text) => onChangeInput(text)}
          value={userId}
          placeholder='user id'
          keyboardType="numeric"
          blurOnSubmit={true}
          maxLength={10}
          onBlur={() => processUserInput()}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  useridView: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 12,
    paddingTop: 7,
    marginHorizontal: 1,
  },
  inputText: {
    height: 30,
    margin: 6,
    borderWidth: 1,
    padding: 1,
    width: 80,
  },
});