import React from "react";
import { StyleSheet, Text, View, AsyncStorage, Image, } from "react-native";
import QuestionsScreen from "./screens/question";
//import AnswersScreen from './screens/answer'
import ProfileScreen from "./screens/profile";

import Nav from './navigator';

import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";

import Onboarding from "react-native-onboarding-swiper";

/*redux components*/
import {createStore} from 'redux';
import allReducers from './reducers/index';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {firstLaunchCheck} from './actions/index';

const store=createStore(allReducers);




// const MainNavigator = createDrawerNavigator({
//   Questions: { screen: QuestionsScreen },
//   Profile: { screen: ProfileScreen },
// },
// {
//   drawerBackgroundColor:"#b0f4e6",
// }

// );

// const App = createAppContainer(MainNavigator);

// export default App;

export default class App extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {      
      firstLaunch: null,      
    };    
  }

  componentDidMount(){

    AsyncStorage.getItem("alreadyLaunched").then(value => {
      console.log(value)
      if (value == null) {
        console.log("A tru");
        AsyncStorage.setItem("alreadyLaunched", JSON.stringify(true)); // No need to wait for `setItem` to finish, although you might want to handle errors
        this.setState({ firstLaunch: true });
      } else {
        console.log("B fal");
        this.setState({ firstLaunch: false });
      }
    }
    )
  } 
  
  render() {

    if(this.state.firstLaunch === null){
      return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user.
    }else if(this.state.firstLaunch == true){
      return (
        <Onboarding
          pages={[
            {
              backgroundColor: "yellow",
              image: (
                <Image
                  source={require("./assets/icon.png")}
                  style={{ height: 200, width: 200 }}
                />
              ),
              title: "Welcome to Ask App",
              subtitle: "Find answer to your queries."
            },
            {
              backgroundColor: "#fe6e58",
              image: (
                <Image
                  source={require("./images/screen1.png")}
                  style={{ height: 400, width: 200 }}
                />
              ),
              title: "Ask Questions",
              subtitle: "Whatever doubts you have clear them."
            },
            {
              backgroundColor: "blue",
              image: (
                <Image
                  source={require("./images/screen2.png")}
                  style={{ height: 400, width: 200 }}
                />
              ),
              title: "Get Answers",
              subtitle: "Learn something new."
            }
          ]}
          onDone={() => {
            this.setState({
              firstLaunch: false
            });          
          }}
          onSkip={() => {
            this.setState({
              firstLaunch: false
            });        
          }}
        />
      );
    }

    return (
      <Provider store={store}>
        <Nav />
      </Provider>
    );
  }
}


