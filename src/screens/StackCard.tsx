// SortQuestions
import React, { useState } from 'react';
import { Card, Avatar, ButtonGroup } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements/dist/list/ListItem';


export const SortQuestions = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const buttons = ['Date','Answers','Views']
  const updateIndex =() => {
    console.log('selectedIndex:',selectedIndex);
    setSelectedIndex(selectedIndex);
  }

  return (
    <View style={styles.cardContentView}>
      <View style={styles.buttonView}>
        <Text style={styles.butTextStyle}>Questions</Text>
        <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={styles.butContainerStyle}
          textStyle={styles.butTextStyle}
        />
      </View>
    </View>
  );
}

// style = { styles.cardContentView }
const styles = StyleSheet.create({
  cardContentView: {
    // flexDirection: 'row'
    flexDirection: 'column',
    // alignItems: 'flex-end',
    // marginRight: 10
  },
  cardView: {
    // flexDirection: 'row-reverse'
    // flexDirection: 'column',
    flexDirection: 'row',
    width: '100%',
    // alignItems: 'flex-end',
    marginTop: 1
  },
  paragraph: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 2
  },
  buttonView: {
    flexDirection: 'column',
    // marginTop: -20,
  },
  butContainerStyle: {
   height: 30 ,
   width: 150,
  },
  butTextStyle: {
   fontSize: 8,
   color:'blue'
  },
});
// export default SortQuestions;