// AppStateLogic - Manage the state of the user's selection
import { useReducer } from 'react';
import { ThemeContextType, AppStateAction, AppStateValue } from './AppStateContext';

// App state has 2 elements: theme: (dark or light) and question sort option
interface IApplicationState {
  themeMode: AppStateValue | string;
  sortMode: AppStateValue | string;
  stackUserId: AppStateValue | string;
  isLoading: boolean;
}
// Change the app state base on user selection
export function AppStateLogic(): ThemeContextType {
  const [state, dispatch] = useReducer(
    (prevState: IApplicationState, action: { type: AppStateAction; value: any }): IApplicationState => {
      console.log('dispatch. prevState:', prevState, 'action:', action);
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
        case AppStateAction.LoadingUpdate:
          return {
            ...prevState,
            isLoading: action.value,
          }
      }
    },
    {
      themeMode: AppStateValue.LIGHT,
      sortMode: AppStateValue.ByDate,
      stackUserId: '',
      isLoading: false,
    }
  );

  const appContext = {
    changeAppState: (newState: AppStateAction, newValue: AppStateValue | string) => {
      dispatch({ type: newState, value: newValue })
    },
    updateLoading: (newValue: boolean) => {
      dispatch({ type: AppStateAction.LoadingUpdate, value: newValue })
    }

  }
  return {
    ...state,
    changeAppState: appContext.changeAppState,
    updateLoading: appContext.updateLoading,
  };
}