// ThemeContext

import React from 'react';

export enum AppStateAction {
  ChangeTheme = 0,
  ChangeSort,
  ChangeUser
}
export enum AppStateValue {
  DARK = 0,
  LIGHT,
  ByDate, //2
  ByAnswers, //3
  ByViews //4
}

export type ThemeContextType = {
  themeMode: AppStateValue | string ;
  sortMode: AppStateValue | string;
  stackUserId: AppStateValue | string ;
  changeAppState: (newState: AppStateAction, newValue:AppStateValue|string) => void;
}
const initialContext: ThemeContextType = {
  themeMode: AppStateValue.DARK,
  sortMode: AppStateValue.ByDate,
  stackUserId: '',
  changeAppState: (): void => { },
};

export const ThemeContext = React.createContext<ThemeContextType>(initialContext);
