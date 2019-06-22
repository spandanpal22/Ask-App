import React from 'react';
import { StyleSheet, Text, View, FlatList,ActivityIndicator, } from 'react-native';

import {Header, Card, Icon, Button} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

//import {createStackNavigator, createAppContainer} from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';
import ScrollLock, { TouchScrollable } from 'react-scrolllock';

import { TouchableOpacity } from 'react-native-gesture-handler';

class AnswersScreen extends React.Component{
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      id:this.props.navigation.state.params.id,
      refresh: false,
    }
  }

  componentDidMount(){
      fetch('http://rnapi1.herokuapp.com/answers')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSourceA:responseJson,      
          
        });
        
        
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  _refresh=()=>{
    this.state.refresh=true;
    fetch('http://rnapi1.herokuapp.com/answers')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson,
      });
      console.log("Refreshed");
      
    })
    .catch((error) =>{
      console.error(error);
    });
    this.state.refresh=false;
  }

  static navigationOptions = {
      title: 'Answers',
      header:null
    };
    
    render() {
      const {navigate} = this.props.navigation;
      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20,justifyContent:"center"}}>
            <ActivityIndicator size="large"/>
          </View>
        )
      }
      return (
        <View style={{flex:1}}>
          <View>
            <Header
             leftComponent={{ icon: 'menu', color: '#fff',onPress:() => this.props.navigation.toggleDrawer()} }
             centerComponent={{ text: 'ASK APP - Answers', style: { color: '#fff' } }}
             rightComponent={{ icon: 'home', color: '#fff',onPress:()=>navigate('Questions') }}  
             backgroundColor='red'
            />
          </View>
          <View style={{marginBottom:10,marginTop:10,}}>
          
          <TouchableOpacity>
            <Button
              icon={
                <Ionicons name="md-add-circle" size={40} color="#7e8ffc" style={{textAlign:'center',}}/>
                    }
                title='      ADD ANOTHER ANSWER'
              onPress={
                ()=>{
                  console.log("pressed add A")
                  navigate('AddAnswer',{q_id:this.state.id,})
                }
              } 
              titleStyle={{color:'black',}}
              buttonStyle={{borderRadius:30,marginLeft:5,marginRight:5,backgroundColor:'#ff7835',}}
              />
            </TouchableOpacity>
          </View>

          <View style={{flex:1}}>
          <FlatList
          data={(this.state.dataSourceA)=(this.state.dataSourceA).filter(Ans=>{  
                
                
                return Ans.question_id===this.state.id;              
          })}


          refreshing={this.state.refresh}
          onRefresh={this._refresh}
          extraData={this.state}

          renderItem={({item}) => {
                
            return (
              <View>
              <View style={{flex:1}}>
                <ScrollView>
                <Card
                containerStyle={{backgroundColor:'#ffb793',borderRadius:10}}
                >
                
                  <Text style={{flex:1,flexDirection:"row", padding: 10, marginBottom: 10 }} onPress={() => console.log('Pressed')}>
                    {item.question_id}. {item.answer} 
                  </Text>
                  <Text style={{flex:1, padding: 10,marginBottom: 10 }} onPress={() => console.log('Pressed')}>
                    Answered by : {item.name} 
                  </Text>
                
              </Card>  
                </ScrollView>
                
              </View>
              </View>
            );
            
          }
        }
        keyExtractor={(item) => (item.id).toString() }     
        ListFooterComponent={()=>{
            return (
              <View style={{marginTop:20,marginBottom:20,}}>
                <TouchableOpacity>
        <Button
          buttonStyle={{borderRadius:20,marginLeft:20,marginRight:20}}
          title="Go to Questions"
          onPress={
            () => navigate('Questions')
          }
        />
        </TouchableOpacity>
        </View>

            )
          }}
          
        />
        </View >

        
        </View>
      );
    }
}





export default AnswersScreen;