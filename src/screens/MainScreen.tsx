import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import { store } from '../redux/store';
import { logger } from "react-native-logs";
import { getWebserviceURL } from '../webservice/WebServiceCall';

export const MainScreen = () => {
  const console = logger.createLogger({
    levels: { log: 0, warn: 2, error: 3 }, transportOptions: {
      colors: "ansi",
    }
  });

  React.useEffect(() => {
    (async () => {
      try {
        const x = await getWebserviceURL('517757');
        console.log('x:', x);
      } catch (error) {
        console.warn('error in app' + error);
      }
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color
  },
  scrollView: {
    marginBottom: 50
  },
  text: {
    marginTop: 50,
    marginLeft: 15,
  },
  boxLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  boxText: {
    marginTop: 50,
    marginLeft: 15,
  },
  boxInsideText: {
    fontSize: 16,
    paddingTop: 17,
    marginHorizontal: 10
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  pickerIcon: {
    color: 'black',
    position: "absolute",
    bottom: 5,
    right: 15,
    fontSize: 40
  },
  BottomViewArea: {
    flex: 1,
    width: '100%',
    height: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  indicatorPosition: {
    flex: 1,
    paddingBottom: 100
  },
  indicatorText: {
    marginBottom: -80,
    color: 'red',
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradientStyle: {
    borderRadius: 40,
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderColor: 'white',
    borderWidth: 1,
  },
  nextText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: "white"
  }
});