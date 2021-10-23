// CardList
// CardList includes:
import React, { useState,useContext } from 'react';
import { Card, Avatar } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';
import { AppStateAction, AppStateValue, ThemeContext, ThemeContextType } from '../types/ThemeContext';
import { getWebserviceURL } from '../webservice/WebServiceCall';


export const CardList = () => {

  const appContext: ThemeContextType = useContext(ThemeContext);
  const [userLoaded, setUserLoaded ] = useState(false);

  React.useEffect(() => {
    const userId: string = appContext.stackUserId;
    console.log('*** cardlist() has changed. stackUserId:', userId);
    if (userId !== undefined && userId !== '') {
      const getSessionCycle = async () => {
        try {
          const x = await getWebserviceURL(userId);
          console.log('x:', x);
        } catch (error) {
          console.warn('error in app' + error);
        }
      }
      getSessionCycle();
    }
  }, [appContext.stackUserId]);

  return (
    <>
      {userLoaded ?
      <Card containerStyle={styles.cardView}>
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
    </Card> : null }
    </> 
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
    alignItems: 'flex-start',
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
