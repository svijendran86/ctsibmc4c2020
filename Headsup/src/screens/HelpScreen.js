import React, { Component } from 'react';
//import react in our code.

import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
//import all the components we are going to use.
import { hospiatlData } from './HospitalData'

export default class HelpScreen extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
		  this.setState(
	  {
		isLoading: false,
		dataSource: hospiatlData.results
	  },
	  function() {
		this.arrayholder = hospiatlData.results;
	  }
	);
    /*return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: hospiatlData.results
          },
          function() {
            this.arrayholder = hospiatlData.results;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });*/
  }
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      text: text,
    });
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 1,
          width: '95%',
          backgroundColor: 'white',
        }}
      />
    );
  };
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={styles.aboutContentContainer}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          renderItem={({ item }) => (
			<View style={styles.textStyle}>
				<View>
					<Text style={styles.textStyle}>{item.title}</Text>
				</View>
				<View>
					<Text style={styles.textStyle}>{item.body}</Text>
				</View>
			</View>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
    padding: 16,
	backgroundColor: '#169be6',
  },
  textStyle: {
    padding: 10,
	color: 'white',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    padding: 10,
	color: 'white',
    borderColor: 'white',
    backgroundColor: '#169be6',
  },
  aboutContentContainer: {
    backgroundColor: '#169be6',
    marginVertical: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
   mainPreventionContainer: {
    backgroundColor: '#169be6',
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 18,
  },
  mainPreventionTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: '',
  },
  preventionContentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 5,
  },
  preventionContent: {
    flex: 2,
    color: 'white',
    fontFamily: '',
    flexWrap: 'wrap',
    textAlign: 'justify',
  },
});