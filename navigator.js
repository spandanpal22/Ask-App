import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import QuestionsScreen from "./screens/question";
//import AnswersScreen from './screens/answer'
import ProfileScreen from "./screens/profile";

import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";4

import { Header, Card, Icon, SearchBar, Button, Divider,  } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Emoji from 'react-native-emoji';


class SideMenu extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.ImageIN}>
                    <Image source={require("./assets/icon.png")}  />
                </View>
                <View style={styles.innerContainer}>
                <ScrollView>
                <Divider style={{ backgroundColor: 'black' }} />
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Questions')}
                >
                    <Text
                        
                        style={styles.item}>
                        Questions
                    </Text>
                    </TouchableOpacity>
                    
                    <Divider style={{ backgroundColor: 'black' }} />

                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Profile')}
                    >
                    <Text
                        
                        style={styles.item}>
                        About Me
                    </Text>
                    </TouchableOpacity>

                    <Divider style={{ backgroundColor: 'black' }} />
                    
                    </ScrollView>
                    </View>
                    <View style={{paddingTop:10,backgroundColor:"#12d3cf",}}>
                        <Text 
                        style={{
                            fontWeight:"bold",
                            textAlign:"center",
                            marginBottom:20,
                            
                        }}>
                            Made by Spandan Pal <Emoji name="smiley" style={{fontSize: 20}} />
                        </Text>
                    </View>
            </View>
        );
    }
}

export const Navigator = createDrawerNavigator(
  {
    Questions: { screen: QuestionsScreen },
    Profile: { screen: ProfileScreen }
  },
  {
    drawerBackgroundColor: "#b0f4e6",
    contentComponent: SideMenu
  }
);

const Nav=createAppContainer(Navigator)

export default Nav;

const styles=StyleSheet.create({
    item:{
        color:"black",
        marginTop:20,
        marginBottom:20,
        marginLeft:20,
        fontWeight:"bold",
    },
    container:{
        flex:1,
        marginTop:50,
    },
    innerContainer:{
        flex:1,
    },
    ImageIN:{
        flex:0.5,
        marginLeft:35,
        width:100,
        height:100,
        marginBottom:30,
        marginTop:10,
    }
})