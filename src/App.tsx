// StackMe
// A home excersie 
import React from 'react';
import { MainScreen } from './screens/MainScreen';
import { ThemeContext } from './types/ThemeContext';
import { ThemeLogic } from './types/ThemeLogic';


export default function App() {

  const theme = ThemeLogic(); // initilize the context

  return (
    <ThemeContext.Provider value={theme}>
        <MainScreen />
    </ThemeContext.Provider>  );
}