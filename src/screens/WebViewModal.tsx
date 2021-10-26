// WebViewModal - Web view display based on URL

import React from 'react';
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { AppStateValue, AppStateContext, ThemeContextType } from '../types/AppStateContext';
import { WebView } from 'react-native-webview';

export const WebViewModal = ({ setModalVisible, modalVisible, webUri }) => {
  const appContext: ThemeContextType = React.useContext(AppStateContext);
  const colorMode = appContext.themeMode === AppStateValue.DARK ? 'white' : 'black';
  const backgroundColor = appContext.themeMode === AppStateValue.DARK ? 'black' : 'white';

  return (
    <View style={[styles.centeredView, { backgroundColor: backgroundColor }]}>
      <Modal animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <WebView
          source={{ uri: `${webUri}` }}
          style={[styles.centeredView, { backgroundColor: backgroundColor }]}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{ paddingVertical: 1 }}>
            <Text style={[styles.textStyle, { color: colorMode, backgroundColor: backgroundColor }]}>
              Ok</Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  textStyle: {
    // color: 'white',
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
});
