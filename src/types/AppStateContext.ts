// AppStateContext

import React from 'react';

export enum AppStateAction {
  ChangeTheme = 0,
  ChangeSort,
  ChangeUser,
  LoadingUpdate
}
export enum AppStateValue {
  LIGHT =0,
  DARK ,
  ByDate, //2
  ByAnswers, //3
  ByViews //4
}

export type ThemeContextType = {
  themeMode: AppStateValue | string ;
  sortMode: AppStateValue | string;
  stackUserId: AppStateValue | string ;
  isLoading: boolean; 
  changeAppState: (newState: AppStateAction, newValue:AppStateValue|string) => void;
  updateLoading: (newValue: boolean) =>void;
}
const initialContext: ThemeContextType = {
  themeMode: AppStateValue.LIGHT,
  sortMode: AppStateValue.ByDate,
  stackUserId: '',
  isLoading: false,
  changeAppState: (): void => { },
  updateLoading: (): void => { },
};

export const AppStateContext = React.createContext<ThemeContextType>(initialContext);
