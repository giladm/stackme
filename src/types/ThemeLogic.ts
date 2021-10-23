// ThemeLogic - Manage the state of the user's selection
import { useReducer } from 'react';
import { ThemeContextType, AppStateAction, AppStateValue  } from './ThemeContext';

// App state has 2 elements: theme: (dark or light) and question sort option
interface IApplicationState {
  themeMode: AppStateValue | string;
  sortMode: AppStateValue | string;
  stackUserId: AppStateValue|string;
}
// Change the app state base on user selection
export function ThemeLogic(): ThemeContextType {
  const [state, dispatch] = useReducer(
    (prevState: IApplicationState, action: { type: AppStateAction; value: AppStateValue|string }): IApplicationState => {
      console.log('dispatch. prevState:',prevState,'action:',action);      
      switch (action.type) {
        default: return prevState;
        case AppStateAction.ChangeTheme:
          return {
            ...prevState,
            themeMode: action.value,
          }
        case AppStateAction.ChangeSort:
          return {
            ...prevState,
            sortMode: action.value,
          }
        case AppStateAction.ChangeUser:
          return {
            ...prevState,
            stackUserId: action.value,
          }
      }
    },
    {
      themeMode: AppStateValue.DARK,
      sortMode: AppStateValue.ByDate,
      stackUserId: ''
    }
  );

  const appContext = {
      changeAppState: (newState: AppStateAction, newValue: AppStateValue|string) => {
        dispatch({ type: newState, value: newValue })
      }
  }
  return {
    ...state,
    changeAppState: appContext.changeAppState,
  };
}