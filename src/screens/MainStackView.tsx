// MainStackView - includes user info and list of questions
// 
// user id example 1264804
import React, { useState, useContext } from 'react';
import { Card, Avatar } from 'react-native-elements';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { AppStateValue, AppStateContext, ThemeContextType, AppStateAction } from '../types/AppStateContext';
import { getWebserviceURL } from '../webservice/WebServiceCall';
import { Stackoverflow, QuestionsDisplay } from '../types/StackJsonInterface';
import { SortQuestionsInput } from './SortQuestionsInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { WebViewModal } from './WebViewModal'
// for timestamp debugging 
import { logger } from "react-native-logs";
const console = logger.createLogger({
  levels: { log: 0, warn: 2, error: 3 }, transportOptions: {
    colors: "ansi"
  }
});

export const MainStackView = ({ updateMain }) => {

  const appContext: ThemeContextType = useContext(AppStateContext);
  const colorMode = appContext.themeMode === AppStateValue.DARK ? 'white' : 'black';
  const sortMode = appContext.sortMode as AppStateValue;

  const [userLoaded, setUserLoaded] = useState(false);
  const [display_name, setDisplay_name] = useState('');
  const [reputation, setReputation] = useState<number>();
  const [accept_rate, setAccept_rate] = useState<number>();
  const [avatarUri, setAvatarUri] = useState<string>();
  const [stackItemList, setStackItemList] = useState<QuestionsDisplay[]>([]);
  const [webviewVisible, setWebviewVisible] = useState(false);
  const [webUri, setWebUri] = useState<string>();

  React.useEffect(() => {
    console.log('** sort mode had change:', sortMode);
    setStackItemList(sortArrayByMode(sortMode, stackItemList));
  }, [sortMode]);

  React.useEffect(() => {
    const userId: string = appContext.stackUserId as string;
    console.log('MainStackView userId: ', userId);
    if (userId !== undefined && userId !== '') {
      console.log('*** cardlist() has changed. userId:', userId);
      const getStackQuestions = async () => {
        try {
          appContext.updateLoading(true);
          const input: Stackoverflow = await getWebserviceURL(userId);
          if (input && input.items && input.items.length > 0) {
            setDisplay_name(input.items[0].owner.display_name)
            setReputation(input.items[0].owner.reputation);
            setAccept_rate(input.items[0].owner.accept_rate);
            setAvatarUri(input.items[0].owner.profile_image);

            const newArray: QuestionsDisplay[] = [];
            input.items.map((a) => {
              newArray.push({
                answer_count: a.answer_count,
                link: a.link, title: a.title, creation_date: a.creation_date,
                view_count: a.view_count, is_answered: a.is_answered
              });
            })
            setStackItemList(sortArrayByMode(AppStateValue.ByDate, newArray));
            setUserLoaded(true);
            updateMain({ length: newArray.length, noData: false }); // display total questions and valid data
          } else {
            updateMain({ length: 0, noData: true }); // display total questions and no data
            console.log('No data found for user:', input);
          }
          appContext.updateLoading(false);
        } catch (error) {
          appContext.updateLoading(false);
          console.warn('error in app' + error);
        }
      }
      getStackQuestions();
    }
  }, [appContext.stackUserId]);

  // sort the question array based on user selection
  const sortArrayByMode = (mode: AppStateValue, unSortedArr: QuestionsDisplay[]): QuestionsDisplay[] => {
    var copyArray: QuestionsDisplay[] = [];
    switch (mode) {
      case AppStateValue.ByDate:
        copyArray = unSortedArr.sort((a, b) => a.creation_date - b.creation_date);
        break;
      case AppStateValue.ByViews:
        copyArray = unSortedArr.sort((a, b) => a.view_count - b.view_count);
        break;
      case AppStateValue.ByAnswers:
        copyArray = unSortedArr.sort((a, b) => a.answer_count - b.answer_count);
        break;
      default:
        console.warn('mode is not recognized', mode);
        copyArray = unSortedArr;
        break;
    }
    return (copyArray);
  }

  const openWebPage = (uri: string) => {
    console.log('navigate to:', uri);
    setWebUri(uri);
    setWebviewVisible(true);
  }
  const renderSeparatorView = () => {
    return (
      <View style={styles.lineSeparator}
      />
    );
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={.7}
        onPress={() => openWebPage(item.link)}
      >
        <View style={styles.itemMainView }>
          <View style={styles.itemMainLine } >
            <Text numberOfLines={2} style={[styles.questionMainLine, { color: colorMode }]}>
              {item.title}
            </Text>
            <View style={styles.itemSecondView} >
              <Text style={[styles.question2ndLine, { color: colorMode }]}>
                View Count:{' '}{item.view_count} </Text>
              <Text style={[styles.question2ndLine, { color: colorMode }]}>
                Question Answered:{' '}{item.is_answered ? 'Yes' : 'No'}</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <MaterialIcons name="chevron-right" size={30} color={colorMode} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const StackListItems = () => {
    console.log('stackItemList size:', stackItemList.length);
    return (
      <View style={{ width: '100%' }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={stackItemList}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparatorView} />
      </View>
    )
  }

  return (
    <>
      {userLoaded ?
        (<View>
          <Card containerStyle={styles.cardView}>
            <View style={styles.cardContentView}>
              <Avatar size={70} source={{ uri: `${avatarUri}` }} />
              <View style={styles.cardUserInfoView}>
                <Text style={styles.userInfoStyle}>Name       : {display_name}</Text>
                <Text style={styles.userInfoStyle}>Reputation : {reputation}</Text>
                <Text style={styles.userInfoStyle}>Accept Rate :{accept_rate}</Text>
              </View>
            </View>
          </Card>
          <SortQuestionsInput />
          <StackListItems />
        </View>
        ) : null}
      {webviewVisible ?
        <>
          <WebViewModal
            setModalVisible={() => {
              setWebviewVisible((prevState) => !prevState);
            }}
            modalVisible={webviewVisible}
            webUri={webUri}
          />
        </> : null}

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
  questionMainLine: {
    fontSize: 14,
    margin: 10,
    textAlign: 'left',
  },
  question2ndLine: {
    fontSize: 12,
    margin: 10,
  },
  lineSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CEDCCE",
  },
  itemMainView: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  itemMainLine: { 
    flex: 9, 
    flexDirection: "column", 
    alignItems: 'flex-start' 
  },
  itemSecondView: { 
    flex: 1,
    flexDirection: "row",
    marginTop: -1
   },
});
