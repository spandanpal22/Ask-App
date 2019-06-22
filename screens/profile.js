import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {createStackNavigator, createAppContainer} from 'react-navigation';

import {Header, Avatar} from 'react-native-elements'

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
      title: 'About Me',
      header:null,
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={{flex:1,backgroundColor:"#42f44e",}}>
          <View>
            <Header
              leftComponent={{ icon: 'menu', color: '#fff',onPress:() => this.props.navigation.toggleDrawer()} }
              centerComponent={{ text: 'ASK APP - About Me', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff',onPress:()=>navigate('Questions') }}
              backgroundColor='red'
            />
          </View>
          <View 
          style={{
            flex:0.3,
            marginTop:20,
            marginLeft:20,
            marginRight:10,
            marginBottom:20,
            flexDirection:"row",
           
            height:50,
          }}
          >
            
            <Avatar
              rounded
              source={require('../images/myPic.jpg')}
              size="xlarge"
              containerStyle={{flex:1,}}
            />
            <Text 
            style={{flex:1,textAlign:"center",height:50,marginLeft:40,marginTop:50,marginRight:50,fontSize:30,}}> 
            Hii guys !!
            </Text>
            
          </View>
          <View style={{flex:1,marginLeft:20,marginRight:20,marginTop:5,}}>
            <Text style={styles.outerText}>
              <Text style={styles.firstText}>Name : </Text><Text>Spandan Pal</Text>
            </Text>
            <Text style={styles.outerText}>
              <Text style={styles.firstText}>College : </Text><Text>National Institute of Technology, Durgapur</Text>
            </Text>
            <Text style={styles.outerText}>
              <Text style={styles.firstText}>Branch : </Text><Text>Computer Science and Engineering</Text>
            </Text>
            <Text style={styles.outerText}>
              <Text style={styles.firstText}>Year of passing : </Text><Text>2022</Text>
            </Text>

            <Text >
              <Text style={styles.firstText}>API links used : </Text>              
            </Text>
            
            <Text>http://rnapi1.herokuapp.com/questions</Text>
            <Text>http://rnapi1.herokuapp.com/answers</Text>

            <Text style={{marginTop:10,}}>
              <Text style={styles.firstText}>About this app : </Text>              
            </Text>
            <Text>
            <Text>This app is made using React Native and uses a Django backend that is also made by me. 
                This is a forum app. You can ask questions and get your answers.</Text>
            </Text>
            
            

          </View>
        </View>
      );
    }
  }

const styles=StyleSheet.create({
  outerText:{
    marginBottom:10,
    marginTop:10,
  },
  firstText:{
    fontWeight:"bold"
  },

});  