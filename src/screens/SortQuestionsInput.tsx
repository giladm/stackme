// SortQuestionsInput
import React, { useState, useContext } from 'react';
import { ButtonGroup } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';
import { AppStateAction, AppStateValue, AppStateContext, ThemeContextType } from '../types/AppStateContext';

export const SortQuestionsInput = () => {

  const buttons = ['Date', 'Answers', 'Views'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const appContext: ThemeContextType = useContext(AppStateContext);

  const updateIndex = (index) => {
    var newContextIndex: AppStateValue;
    if (index === 0)
      newContextIndex = AppStateValue.ByDate;
    if (index === 1)
      newContextIndex = AppStateValue.ByAnswers;
    if (index === 2)
      newContextIndex = AppStateValue.ByViews;
    setSelectedIndex(index);
    appContext.changeAppState(AppStateAction.ChangeSort, newContextIndex)
  }

  return (
    <View style={styles.sortView}>
      <View style={styles.buttonView}>
        <Text style={styles.descTextStyle}>Questions</Text>
      </View>
      <View style={styles.sortOptionView}>
        <ButtonGroup
          onPress={index =>updateIndex(index)}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={styles.butContainerStyle}
          textStyle={styles.butTextStyle}
          selectedButtonStyle={styles.selectedButtonStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sortView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    marginLeft: 35,
    justifyContent: 'center',
  },
  sortOptionView: {
    marginLeft: -1
  },
  selectedButtonStyle: {
    backgroundColor: '#3740ff',
    color: 'red',
  },
  buttonView: {
    flexDirection: 'column',
  },
  butContainerStyle: {
   height: 30 ,
   width: 150,
  },
  butTextStyle: {
    fontSize: 10,
  },
  descTextStyle: {
    fontSize: 10,
    borderStyle: 'solid',
    borderWidth: 0.1,
    padding: 8,
    backgroundColor: 'white',
  },
});
// export default SortQuestionsInput;