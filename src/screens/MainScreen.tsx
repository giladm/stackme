import React, { useRef, useContext, useState } from 'react';
import {
  View, Text, StyleSheet, AppState, Switch, SafeAreaView, Keyboard,
  ScrollView, TextInput } from 'react-native';
import { Colors } from '../constants/Colors';
import { logger } from "react-native-logs";
import { ThemedButton } from './ThemedButton';
import { StackUserInput } from './StackUserInput';
import { UserInfo } from './UserInfo';
import { CardList } from './CardList';
import { SortQuestions } from './SortQuestions';

import { AppStateAction, AppStateValue, ThemeContext, ThemeContextType } from '../types/ThemeContext';

export const MainScreen = () => {
  const appContext: ThemeContextType = useContext(ThemeContext);
  const darkMode: boolean = appContext.themeMode === AppStateValue.DARK;

  return (
    <>
      <SafeAreaView style={[styles.container, {
        backgroundColor: darkMode ? Colors.dark_background_color : Colors.light_background_color
      }]}>
        <ThemedButton />
        <StackUserInput />
        <UserInfo />
        <SortQuestions/>
        <CardList />
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});