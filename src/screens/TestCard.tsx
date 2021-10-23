//TestCard

// React Native Card View for Android and IOS
// https://aboutreact.com/react-native-card-view/

// import React in our code
import React from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, View, StyleSheet, Image } from 'react-native';

//import Card
import { Card, Avatar, ButtonGroup } from 'react-native-elements';

export const TestCard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Card>
          <Avatar
            size={80}
            source={{ uri: 'https://www.gravatar.com/avatar/c1283d3ecf3685d24c8f545107bac892?s=256&d=identicon&r=PG' }}
          />
          <Text style={styles.paragraph}>
            React Native Card View for Android and IOS using
          </Text>
          <Text style={styles.paragraph}>
            React Native Card View for Android and IOS using
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10
  },
});
