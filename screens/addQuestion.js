import React from 'react';
import { StyleSheet, Text, View,TextInput, ActivityIndicator } from 'react-native';

import {createStackNavigator, createAppContainer} from 'react-navigation';

import {Header, Button, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AddQuestionScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      in_name:"",
      in_email:"",
      in_question:"",
      }
  }

    static navigationOptions = {
      title: 'Add Question',
      header:null,
    };
    componentDidMount(){
      fetch('http://rnapi1.herokuapp.com/questions')
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            dataSource: responseJson,
            len: responseJson.length,
            
          });

          var last_id=0;
          if(this.state.len!==0)
          {
            last_id=this.state.dataSource[this.state.len-1].id ;
          }
          

         this.setState({
           Last_id:last_id,
           new_id:last_id+1,
         });
         
        })
        .catch((error) =>{
          console.error(error);
        });
  
    }
    
    
    postQuestion=()=>{
      this.state.isLoading=true;
      data={
        "id":this.state.new_id,
        "name":this.state.in_name,
        "email":this.state.in_email,
        "question":this.state.in_question,
      };
      this.setState({
        in_name:"",
        in_email:"",
        in_question:"",
      })
      fetch('http://rnapi1.herokuapp.com/questions',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if(responseJson==="success")
            {
              this.setState({
                success:true,
              })
            }
          else
            {
              this.setState({
                success:false,
                error:"You filled the form incorrectly. Please try again."
              })
            }

          this.setState({
            isLoading: false,
            res: responseJson,
          });
          
        })
        .catch((error) =>{
          console.error(error);
        });
      
    }


    render() {
      const {navigate} = this.props.navigation;

      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20,justifyContent:"center"}}>
            <ActivityIndicator size="large"/>
          </View>
        )
      }
     
      if(this.state.success){
        return(
          <View style={{flex:1,}}>
            <View>
            <Header
              leftComponent={{ icon: 'menu', color: '#fff',onPress:() => this.props.navigation.toggleDrawer()} }
              centerComponent={{ text: 'ASK APP - Add Question', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff',onPress:()=>navigate('Questions') }}
              backgroundColor='red'
            />
            </View>
            <View style={{flex:1,marginTop:50,}}>
              <Icon 
                name="check-circle"
                color="green"
                size={300}
              />
            </View>
            <View style={{flex:1,}}>
              <Text style={{textAlign:"center",fontSize:30,}} >You question has been succesfully added.</Text>
            </View>
          </View>
        )
      }


      return (
        <View style={{flex:1,}}>
          <View>
            <Header
              leftComponent={{ icon: 'menu', color: '#fff',onPress:() => this.props.navigation.toggleDrawer()} }
              centerComponent={{ text: 'ASK APP - Add Question', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff',onPress:()=>navigate('Questions') }}
              backgroundColor='red'
            />
          </View>
          <View>
            <Text style={styles.headline}>Ask your question here</Text>
          </View>
          <View>
            <TextInput
            style={styles.nameInput}
            placeholder="Enter your name"
            onChangeText={(in_name)=>this.setState({in_name})}
            maxLength={20}
            textContentType={"name"}
            autoCompleteType={"name"}            
            />
            <TextInput
            style={styles.nameInput}
            placeholder="Enter your email"
            onChangeText={(in_email)=>this.setState({in_email})}
            textContentType={"emailAddress"}
            keyboardType={"email-address"}
            autoCapitalize={"none"}
            autoCompleteType={"email"}
            />
            <TextInput
            style={styles.questionInput}
            placeholder="Enter your question"
            onChangeText={(in_question)=>this.setState({in_question})}
            multiline={true}
            autoCorrect={true}
            />
            <TouchableOpacity>
            <Button
            title='SUBMIT'
            buttonStyle={styles.submitButton}
            onPress={this.postQuestion}
            />
            </TouchableOpacity>
            
            <View>
              <Text style={{color:'blue',textAlign:"center",marginTop:10,}}>{this.state.error}</Text>
            </View>
          </View>
          <View>
              <Text style={{color:'red',textAlign:"center",margin:10,marginTop:150,}}>
                Note: After adding question refresh the app for the changes to reflect.
                </Text>
            </View>
        </View>
      );
    }
  }

  const styles=StyleSheet.create({
    nameInput:{
      backgroundColor:'white',
      padding:10,
      marginTop:5,
      marginBottom:5,
      marginLeft:10,
      marginRight:10,
    },
    headline:{
      textAlign:'center',
      margin:10,
      fontSize:30,

    },
    submitButton:{
      marginLeft:10,
      marginRight:10,
      marginTop:10,
      marginBottom:10,
      padding:10,
    },
    questionInput:{
      backgroundColor:'white',
      padding:10,
      marginTop:5,
      marginBottom:5,
      marginLeft:10,
      marginRight:10,
      height:100,
    }
  });