import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default class Settings extends Component {
   constructor(props){
    super(props);
    this.state = {
		userId : '',
		prefName : '',
		prefValue : '',
      textInput : [],
      inputData : [],
	  data: []
    }
  }
componentDidMount() {
	fetch('http://crisis-com.us-south.cf.appdomain.cloud/pref/a',
    {
      method: 'GET',
      //headers: {
      //  'Authorization': `Bearer ${access_token}`
      //},
      //body: `root=auto&path=${Math.random()}`

    }
  ).then((res) => {
    return res.json()
  }).then((res) => {
	   this.setState({
					isLoading: false,
					data: res
				  });


	this.state.data.map((respArray) => {

								this.setState({userId : respArray.userId});		
								this.setState({prefName : respArray.prefName});
								this.setState({prefValue : respArray.prefValue});
																	

					});
				
						
						this.addTextInputValue(0,this.state.prefName , this.state.prefValue);		
  });
}
  //function to add TextInput dynamically
  addTextInput = (index) => {
    let textInput = this.state.textInput;
    textInput.push(<TextInput style={styles.textInput}
      onChangeText={(text) => this.addValues(text, index)}   placeholder="Enter key as a client_id" />);
	textInput.push(<TextInput style={styles.textInput}
      onChangeText={(text) => this.addValues(text, index+1)} placeholder="Enter fitbit client id"/>);
	  
    this.setState({ textInput });

  }
  
    //function to add TextInput dynamically
  addTextInputValue = (index,value1,value2) => {
    let textInput = this.state.textInput;
    textInput.push(<TextInput style={styles.textInput}
      onChangeText={(text) => this.addTextValues(text, index,value1)} value={value1} />);
	textInput.push(<TextInput style={styles.textInput}
      onChangeText={(text) => this.addTextValues(text, index+1,value2)} value={value2} />);
    this.setState({ textInput });

  }

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;

    let inputData = this.state.inputData;
    textInput.pop();

    inputData.pop();
    this.setState({ textInput,inputData });

  }
  //function to add text from TextInputs into single array
  addTextValues = (text, index , val) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0){
      dataArray.forEach(element => {
        if (element.index === index ){
          element.text = text;
		  element.value = val;
          checkBool = true;
        }
      });
    }
    if (checkBool){
    this.setState({
      inputData: dataArray
    });
  }
  else {
    dataArray.push({'text':text,'index':index});
    this.setState({
      inputData: dataArray
    });
  }
  }
  
  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0){
      dataArray.forEach(element => {
        if (element.index === index ){
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool){
    this.setState({
      inputData: dataArray
    });
  }
  else {
    dataArray.push({'text':text,'index':index});
    this.setState({
      inputData: dataArray
    });
  }
  }

handleSave = () => {

	  fetch('http://crisis-com.us-south.cf.appdomain.cloud/pref/add', {
        method: 'POST',
		headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        body: `${JSON.stringify(this.state.data)}`
    }).then((response) => response.json())
    .then((responseData) => {

					  	Alert.alert(
							  "Saved!",
							  "Data saved!",
							  [
								{
								  text: "Cancel",
								  onPress: () => console.log("Cancel Pressed"),
								  style: "cancel"
								},
								{ text: "OK", onPress: () => console.log("OK Pressed") }
							  ],
							  { cancelable: false }
						);

		return responseData;
        console.log(responseData);
    }).catch((error) => {
       					  	Alert.alert(
							  "Error!",
							  "There is an errror. Please check",
							  [
								{
								  text: "Cancel",
								  onPress: () => console.log("Cancel Pressed"),
								  style: "cancel"
								},
								{ text: "OK", onPress: () => console.log("OK Pressed") }
							  ],
							  { cancelable: false }
						);
    });
  
  };
  
  //function to console the output
  getValues = () => {
    console.log('Data',this.state.inputData);

						this.state.inputData.map((textvalue) => {
							
							if(textvalue.index==0){
								this.setState({userId : textvalue.text});		
							}else{
								this.setState({prefName : textvalue.text});
								this.setState({prefValue : textvalue.text});	
							}
						});

						this.setState({data: {'prefValue' : this.state.prefValue, 'prefName' : this.state.prefName , 'userId' : this.state.userId }});
						

						this.handleSave();
  }


  render(){
    return(
      <View>
        <View style= {styles.row}>
          <View style={{margin: 50}}>
        <Button title='Add' onPress={() => this.addTextInput(this.state.textInput.length)} />
        </View>
        <View style={{margin: 50}}>
        <Button title='Remove' onPress={() => this.removeTextInput()} />
        </View>
        </View>
        {this.state.textInput.map((value) => {
          return value
        })}
        <Button title='Save Data' onPress={() => this.getValues()} />
	  </View>
    )
  }
}

const styles = StyleSheet.create({
	    inputWrap: {
    flex: 1,
    borderColor: "#00001a",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  metaDataContainer: {
    flex: 1,
    flexDirection: "row"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  buttonView: {
  flexDirection: 'row'
  },
  textInput: {
  height: 40,
  borderColor: 'black', 
  borderWidth: 1,
  margin: 20
},
row:{
  flexDirection: 'row',
  justifyContent: 'center'
  },
});
