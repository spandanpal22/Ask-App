import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView, SectionList } from 'react-native';

import AnswersScreen from './answer'
import AddQuestionScreen from './addQuestion'
import AddAnswerScreen from './addAnswer'

import {createStackNavigator, createAppContainer} from 'react-navigation';

import {Header, Card, Icon, SearchBar, Button,} from 'react-native-elements'
//import { ScrollView } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import ScrollLock, { TouchScrollable } from 'react-scrolllock';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { stringify } from 'querystring';

class QuestionsScreen extends React.Component{
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      search: '',
      refresh:false,
    }
  }

  componentDidMount(){
    fetch('http://rnapi1.herokuapp.com/questions')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
        
      })
      .catch((error) =>{
        console.error(error);
      });

  }


  static navigationOptions = {
      title: 'Questions',
      header:null
    };


    updateSearch = search => {
      this.setState({ search });
    };
  

    _refresh=()=>{
      this.state.refresh=true;
      fetch('http://rnapi1.herokuapp.com/questions')
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


    render() {
      const {navigate} = this.props.navigation;
      const { search } = this.state;

      

      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20,justifyContent:"center"}}>
            <ActivityIndicator size="large"/>
          </View>
        )
      }
      this.componentDidMount
      return (
        

<View style={{flex:1}}>

<View style={{}}>
                
  <View style={{}}>
    <Header
      leftComponent={{ icon: 'menu', color: '#fff',onPress:() => this.props.navigation.toggleDrawer()} }
      centerComponent={{ text: 'ASK APP - Questions', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff',onPress:()=>navigate('Questions') }}
      backgroundColor='red'
    />
  </View>
  <View style={{}}>
    <SearchBar
        containerStyle={{backgroundColor:'#ff7835',borderRadius:30,marginTop:5}}
        inputContainerStyle={{backgroundColor:'#ffb793',borderRadius:30}}
        placeholder="Search Your Question Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
  </View>
  
  <View style={{marginBottom:10,marginTop:10,}}>
    <TouchableOpacity>
    <Button
    icon={
    <Ionicons name="md-add-circle" size={40} color="#7e8ffc" style={{textAlign:'center',}}/>
        }
    title='      ADD ANOTHER QUESTION'
    onPress={
      ()=>{
        console.log("pressed add Q")
        navigate('AddQuestion')
      }
    } 
    titleStyle={{color:'black',}}
    buttonStyle={{borderRadius:30,marginLeft:5,marginRight:5,backgroundColor:'#ff7835',}}
    />
    </TouchableOpacity>
  </View>
  
  </View>
  
  <View style={{flex:1}} >
      
        <FlatList
          data={this.state.dataSource}
          refreshing={this.state.refresh}
          onRefresh={this._refresh}
          extraData={this.state}
          renderItem={({item}) => {
            
                        
            return (
             
              <View style={{}} >
              
              <View style={{marginBottom:5,}}>
                
              <Card 
              containerStyle={{backgroundColor:'#ffb793',borderRadius:10}}
              >
                
                  <Text style={{flex:1,flexDirection:"row", padding: 10, marginBottom: 10}} onPress={() => console.log('Pressed')}>
                    {item.id}. {item.question} 
                  </Text>
                  <Text style={{flex:1, padding: 10,marginBottom: 10  }} onPress={() => console.log('Pressed')}>
                    Asked by : {item.name}
                  </Text>
                <TouchableOpacity>
                <Button
                  
                  backgroundColor='#03A9F4'
                  
                  title="Go to Answers"
                  onPress={() => { 
                    console.log({item});
                    a={item}
                    console.log(a.item.id);
                    navigate('Answers',{id:a.item.id,}) 
                  }}
                  buttonStyle={{borderRadius:20,marginLeft:10,marginRight:10}}
                  />
                  </TouchableOpacity>       
              </Card>
                
              </View>
              
              </View>
              
              
            )
          }}          
          keyExtractor={(item) => (item.id).toString() }
          ListFooterComponent={()=>{
            return (
              <View>
                <Text style={{textAlign:'center',backgroundColor:'red',fontSize:20,fontWeight:'bold',}}>END</Text>
              </View>
            )
          }
          }

          
        />
      
        </View>
        
      </View>

      );
    }
}



const MainNavigator = createStackNavigator({
  Questions: {screen: QuestionsScreen},
  Answers: {screen: AnswersScreen},
  AddQuestion:{screen:AddQuestionScreen},
  AddAnswer:{screen:AddAnswerScreen},
},
{
  headerMode: 'screen',
  cardStyle: { backgroundColor: '#ff9f2b' },
},

);

const App = createAppContainer(MainNavigator);

export default App;

