import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QuestionsScreen from './screens/question'
//import AnswersScreen from './screens/answer'
import ProfileScreen from './screens/profile'

import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';

const MainNavigator = createDrawerNavigator({
  Questions: {screen: QuestionsScreen},
  
  Profile: {screen: ProfileScreen},
}
);

const App = createAppContainer(MainNavigator);

export default App;