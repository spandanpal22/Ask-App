import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  SectionList,
  Alert,
  AppState,
  BackHandler,
  AsyncStorage,
  Image
} from "react-native";

import AnswersScreen from "./answer";
import AddQuestionScreen from "./addQuestion";
import AddAnswerScreen from "./addAnswer";


import {
  createStackNavigator,
  createAppContainer,
  StackActions,
  NavigationActions
} from "react-navigation";

import { Header, Card, Icon, SearchBar, Button, Divider,  } from "react-native-elements";
//import { ScrollView } from 'react-native-gesture-handler';

import { Ionicons } from "@expo/vector-icons";
//import ScrollLock, { TouchScrollable } from "react-scrolllock";
import { TouchableOpacity } from "react-native-gesture-handler";
//import { stringify } from 'querystring';

import Onboarding from "react-native-onboarding-swiper";


const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Questions", params:{firstLaunch: false,flag :1} })]
});

class QuestionsScreen extends React.Component {
  constructor(props) {
    super(props);      
    
    this.state = {
      isLoading: true,
      search: "",
      refresh: false,
      firstLaunch: null,
      
    };
    
  }

  componentDidMount() {
    console.log(AppState.currentState);  
  
    // AsyncStorage.getItem("alreadyLaunched").then(value => {
    //   if (value == null) {
    //     console.log("A tru");
    //     AsyncStorage.setItem("alreadyLaunched", true); // No need to wait for `setItem` to finish, although you might want to handle errors
    //     this.setState({ firstLaunch: true });
    //   } else {
    //     console.log("B fal");
    //     this.setState({ firstLaunch: false });
    //   }

    //   try{
      
    //     var fl=this.props.navigation.state.params.firstLaunch;
    //     this.setState({ firstLaunch: false });
    //     console.log("No error");
        
    //   }
    //   catch(err){
    //     console.log("Error")
    //   }
    // });    



    this.interval = fetch("http://rnapi1.herokuapp.com/questions")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    console.log("Component will unmount called");
    // clearInterval(this.interval)
    // this.setState({
    //   dataSource: {},
    //   isLoading: true,
    //   search: "",
    //   refresh: false,
    // })
  }

  go_to_q() {
    this.props.navigation.push("Questions");
  }

  delete_alert(id) {
    Alert.alert(
      "Delete Question",
      "Do you want to delete this question ? ",
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed")
        },
        {
          text: "Yes",
          onPress: () => {
            console.log("Yes Pressed and Deleted");
            this.delete_question(id);
          }
        }
      ],
      { cancelable: false }
    );
  }

  delete_question(id) {
    str = "http://rnapi1.herokuapp.com/questions/{0}";
    var url_del = str.replace("{0}", id);
    console.log(url_del);
    fetch(url_del, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(responseJson => {
        //this.props.navigation.push("Questions");
        this.props.navigation.dispatch(resetAction);
        console.log("now");
      })

      .catch(error => {
        //this.props.navigation.push("Questions");
        this.props.navigation.dispatch(resetAction);
        console.log("now");
      });
  }

  static navigationOptions = {
    title: "Questions",
    header: null
  };

  updateSearch = search => {
    this.setState({ search });
  };

  _refresh = () => {
    this.state.refresh = true;
    fetch("http://rnapi1.herokuapp.com/questions")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        });
        console.log("Refreshed Q");
      })
      .catch(error => {
        console.error(error);
      });
    this.state.refresh = false;
  };

  render() {
    const { navigate } = this.props.navigation;
    const { search } = this.state;


    // if(this.state.firstLaunch === null){
    //   return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user.
    // }else if(this.state.firstLaunch == true){
    //   return (
    //     <Onboarding
    //       pages={[
    //         {
    //           backgroundColor: "yellow",
    //           image: (
    //             <Image
    //               source={require("../assets/icon.png")}
    //               style={{ height: 200, width: 200 }}
    //             />
    //           ),
    //           title: "Welcome to Ask App",
    //           subtitle: "Find answer to your queries."
    //         },
    //         {
    //           backgroundColor: "#fe6e58",
    //           image: (
    //             <Image
    //               source={require("../images/screen1.png")}
    //               style={{ height: 400, width: 200 }}
    //             />
    //           ),
    //           title: "Ask Questions",
    //           subtitle: "Whatever doubts you have clear them."
    //         },
    //         {
    //           backgroundColor: "blue",
    //           image: (
    //             <Image
    //               source={require("../images/screen2.png")}
    //               style={{ height: 400, width: 200 }}
    //             />
    //           ),
    //           title: "Get Answers",
    //           subtitle: "Learn something new."
    //         }
    //       ]}
    //       onDone={() => {
    //         this.setState({
    //           firstLaunch: false
    //         });          
    //       }}
    //       onSkip={() => {
    //         this.setState({
    //           firstLaunch: false
    //         });        
    //       }}
    //     />
    //   );
    // }


    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    
    return (
      <View style={{ flex: 1 }}>
        <View style={{}}>
          <View style={{}}>
            <Header
              leftComponent={{
                icon: "menu",
                color: "#fff",
                onPress: () => this.props.navigation.toggleDrawer(),
                underlayColor: "transparent",
                activeOpacity: 0.5
              }}
              centerComponent={{
                text: "ASK APP - Questions",
                style: { color: "#fff" }
              }}
              rightComponent={{
                icon: "home",
                color: "#fff",
                onPress: () => navigate("Questions"),
                underlayColor: "transparent",
                activeOpacity: 0.5
              }}
              backgroundColor="#12d3cf"
            />
          </View>
          <View style={{}}>
            <SearchBar
              containerStyle={{
                backgroundColor: "#67eaca",
                borderBottomColor: "transparent",
                borderTopColor: "transparent",
                borderRadius: 30,
                marginTop: 5
              }}
              inputContainerStyle={{
                backgroundColor: "#b0f4e6",
                borderRadius: 30
              }}
              placeholder="Search Your Question Here..."
              onChangeText={this.updateSearch}
              value={search}
            />
          </View>

          <View style={{ marginBottom: 10, marginTop: 10 }}>
            <TouchableOpacity>
              <Button
                icon={
                  <Ionicons
                    name="md-add-circle"
                    size={40}
                    color="#7e8ffc"
                    style={{ textAlign: "center" }}
                  />
                }
                title="    ADD NEW QUESTION"
                onPress={() => {
                  console.log("pressed add Q");
                  navigate("AddQuestion");
                }}
                titleStyle={{ color: "black" }}
                buttonStyle={{
                  borderRadius: 30,
                  marginLeft: 5,
                  marginRight: 5,
                  backgroundColor: "#67eaca"
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <Divider style={{ backgroundColor: 'black' }} />

        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.dataSource}
            extraData={this.state.dataSource}
            refreshing={this.state.refresh}
            onRefresh={this._refresh}
            renderItem={({ item }) => {
              return (
                <View style={{}}>
                  <View style={{ marginBottom: 5 }}>
                    <Card
                      containerStyle={{
                        backgroundColor: "#b0f4e6",
                        borderRadius: 10
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          padding: 10,
                          marginBottom: 10,
                          fontWeight: "bold"
                        }}
                        onPress={() => console.log("Pressed")}
                      >
                        Q - {item.question}
                      </Text>
                      <Text
                        style={{ flex: 1, padding: 10, marginBottom: 10 }}
                        onPress={() => console.log("Pressed")}
                      >
                        Asked by : {item.name}
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row"
                        }}
                      >
                        <TouchableOpacity>
                          <Button
                            title=" Delete Question "
                            onPress={() => {
                              console.log({ item });
                              a = { item };
                              console.log(a.item.id);
                              this.delete_alert(a.item.id);
                            }}
                            buttonStyle={{
                              borderRadius: 20,
                              marginLeft: 20,
                              marginRight: 20,
                              backgroundColor: "red",
                              flex: 1
                            }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Button
                            backgroundColor="#03A9F4"
                            title=" Go to Answers "
                            onPress={() => {
                              console.log({ item });
                              a = { item };
                              console.log(a.item.id);
                              navigate("Answers", {
                                id: a.item.id,
                                ques: a.item.question
                              });
                            }}
                            buttonStyle={{
                              borderRadius: 20,
                              marginRight: 20,
                              flex: 1
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </Card>
                  </View>
                </View>
              );
            }}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={() => {
              return (
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      backgroundColor: "#12d3cf",
                      fontSize: 20,
                      fontWeight: "bold",
                      marginTop: 5
                    }}
                  >
                    END
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const MainNavigator = createStackNavigator(
  {
    Questions: { screen: QuestionsScreen },
    Answers: { screen: AnswersScreen },
    AddQuestion: { screen: AddQuestionScreen },
    AddAnswer: { screen: AddAnswerScreen }
  },
  {
    headerMode: "screen",
    cardStyle: { backgroundColor: "#fcf9ec" }
  }
);

const App = createAppContainer(MainNavigator);

export default App;
