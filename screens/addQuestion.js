import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  BackHandler,
} from "react-native";

import {
  createStackNavigator,
  createAppContainer,
  NavigationActions,
  StackActions,
} from "react-navigation";

import { Header, Button, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Questions', params:{firstLaunch: false,flag :1} })],
});

export default class AddQuestionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      in_name: "",
      in_email: "",
      in_question: "",
      screen_name:"AQS"
    };
  }

  static navigationOptions = {
    title: "Add Question",
    header: null
  };
  componentDidMount() {
    fetch("http://rnapi1.herokuapp.com/questions")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          len: responseJson.length
        });

        var last_id = 0;       
        
        if (this.state.len !== 0)
        {
          last_id=this.state.dataSource[0].id;

          for(i=0;i<this.state.dataSource.length;i++)
            {
              if(this.state.dataSource[i].id>last_id)
                last_id=this.state.dataSource[i].id            
            }
        }
        this.setState({
          Last_id: last_id,
          new_id: last_id + 1
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  go_to_q(){
    this.props.navigation.push("Questions");
  }

  postQuestion = () => {
    this.state.isLoading = true;
    data = {
      id: this.state.new_id,
      name: this.state.in_name,
      email: this.state.in_email,
      question: this.state.in_question
    };
    this.setState({
      in_name: "",
      in_email: "",
      in_question: ""
    });
    fetch("http://rnapi1.herokuapp.com/questions", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson === "success") {
          this.setState({
            success: true
          });
        } else {
          this.setState({
            success: false,
            isLoading: false,
            error: "You filled the form incorrectly. Please try again."
          });
        }

        

        if (this.state.success) {
          console.log("redirecting from AQ");
          //this.props.navigation.goBack;
          //this.props.navigation.pop(2);
          //this.props.navigation.push("Questions");
          //this.props.navigation.navigate("Questions");
          this.props.navigation.dispatch(resetAction);
          //this.props.navigation.dispatch(StackActions.popToTop());
        }

        this.setState({
          res: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: "#b0f4e6" }}>
        <View>
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: () => this.props.navigation.toggleDrawer(),
              underlayColor: "transparent",
              activeOpacity: 0.5
            }}
            centerComponent={{
              text: "ASK APP - Add Question",
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
        
        <View>
          <Text style={styles.headline}>Ask your question here</Text>
        </View>
        <View>
          <TextInput
            style={styles.nameInput}
            placeholder="Enter your name"
            onChangeText={in_name => this.setState({ in_name })}
            maxLength={20}
            textContentType={"name"}
            autoCompleteType={"name"}
          />
          <TextInput
            style={styles.nameInput}
            placeholder="Enter your email"
            onChangeText={in_email => this.setState({ in_email })}
            textContentType={"emailAddress"}
            keyboardType={"email-address"}
            autoCapitalize={"none"}
            autoCompleteType={"email"}
          />
          <TextInput
            style={styles.questionInput}
            placeholder="Enter your question"
            onChangeText={in_question => this.setState({ in_question })}
            multiline={true}
            autoCorrect={true}
          />
          <TouchableOpacity>
            <Button
              title="SUBMIT"
              buttonStyle={styles.submitButton}
              onPress={this.postQuestion}
            />
          </TouchableOpacity>

          <View>
            <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
              {this.state.error}
            </Text>
          </View>
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameInput: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  headline: {
    textAlign: "center",
    margin: 10,
    fontSize: 30
  },
  submitButton: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 10
  },
  questionInput: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 100
  }
});
