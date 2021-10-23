// UserInfo
// Card includes avatar and User Info
import React, { useState } from 'react';
import { Card, Avatar } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

export const UserInfo = () => {

  return (
    <Card  containerStyle={styles.cardView}>
      <View style={styles.cardContentView}>
        <Avatar
          size={70}
          source={{ uri: 'https://www.gravatar.com/avatar/c1283d3ecf3685d24c8f545107bac892?s=256&d=identicon&r=PG' }}
        />
        <View style={styles.cardUserInfoView}>
          <Text style={styles.userInfoStyle}>
            Display Name</Text>
          <Text style={styles.userInfoStyle}>
            Reputation</Text>
          <Text style={styles.userInfoStyle}>
            Card content</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardView: {
    padding: 10,
    width: '80%',
    marginLeft: 35,
  },
  cardContentView: {
    flexDirection: 'row',
  },
  cardUserInfoView: {
    flexDirection: 'column',
    alignItems:'flex-start',
    marginTop: 1,
    marginLeft: 5,
  },
  userInfoStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 2
  },
});
