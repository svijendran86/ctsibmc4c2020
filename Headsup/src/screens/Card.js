import React from 'react';
//Import React
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Animated,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
//Import basic react native components

export default class Card extends React.Component {
  render() {
    const { removeItem, item } = this.props;
 const { prefValue, userId, prefName, key } = item;
    return (
      <Animated.View style={{ flex:1, alignItems: 'center', paddingVertical:10 }}>
        <TouchableOpacity
          onPress={() => removeItem(key)}
          style={styles.container}>
          <View style={styles.metaDataContainer}>
				<View style={styles.inputWrap}>
					<TextInput style={styles.textInputStyle} onChangeText={(userId)=>this.setState({userId})} value={userId} />
				</View>
				<View style={styles.inputWrap}>
					<TextInput  style={styles.textInputStyle} onChangeText={(prefName)=>this.setState({prefName})} value={prefName} />
				</View>
				<View style={styles.inputWrap}>
					<TextInput style={styles.textInputStyle} onChangeText={(prefValue)=>this.setState({prefValue})} value={prefValue} />
				</View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
	textInputStyle: {
	color: 'white',
	 width: 100, 
	 height: 40, 
	 borderColor: 'white', 
	 borderWidth: 1 
    },
  container: {
    height: 80,
    elevation: 3,
    borderColor: 'gray',
    borderRadius: 5,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
    inputWrap: {
    flex: 1,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  metaDataContainer: {
    flex: 1,
    flexDirection: "row"
  },
  metaDataContent: {
    marginTop: 5,
    marginLeft: 15,
	padding: 5,
  },

  description: {
    fontSize: 16,
    color: '#888',
    fontWeight: '700',
  },
});