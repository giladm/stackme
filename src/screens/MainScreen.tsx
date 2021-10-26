import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '../constants/Colors';
import { ThemedButton } from './ThemedButton';
import { StackUserInput } from './StackUserInput';
import { MainStackView } from './MainStackView';
import { WaveIndicator } from 'react-native-indicators';
import { AppStateValue, AppStateContext, ThemeContextType } from '../types/AppStateContext';

export const MainScreen = () => {
  const appContext: ThemeContextType = useContext(AppStateContext);
  const darkMode: boolean = appContext.themeMode === AppStateValue.DARK;
  const userId: string = appContext.stackUserId as string;
  const color = darkMode ? 'white' : 'black';// text color
  const isDbLoading: boolean = appContext.isLoading; // when using rest api
  const [totalQuestion, setTotalQuestion] = useState<number>();
  const [noData, setNoData] = useState(false);

  const updateMain = (update) => {
    console.log('> > updateMain :', update);
    setTotalQuestion(update.length); // total of questions
    setNoData(update.noData); // any data for user
  }

  return (
    <>
      <SafeAreaView style={[styles.container, {
        backgroundColor: darkMode ? Colors.dark_background_color : Colors.light_background_color
      }]}>
        <ThemedButton />
        <StackUserInput />
        {!noData ?
          <MainStackView updateMain={updateMain} /> : null}
        <View style={styles.BottomViewArea}>
          {isDbLoading ?
            (<View style={styles.indicatorPosition}>
              <Text style={[styles.indicatorText, { color: color }]}>Loading Data...</Text>
              <WaveIndicator color={color} size={80} />
            </View>) : null}
          {userId !== '' ?
            (<View style={{ alignItems: 'flex-end', paddingRight: 10 }}>
              <Text style={[styles.indicatorText, { color: color }]}>
                {noData ? 'No Data Found for User' :
                  `Total of ${totalQuestion} questions found`}</Text>
            </View>) : null}
        </View>
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BottomViewArea: {
    flex: 1,
    width: '100%',
    height: 30,
    backgroundColor: Colors.primary,
    paddingLeft: 5,
    position: 'absolute',
    bottom: 0,
  },
  indicatorPosition: {
    flex: 1,
    paddingBottom: 100,
  },
  indicatorText: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});