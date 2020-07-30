/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';
import {Text, Subheading} from 'react-native-paper';

class PreventionCards extends Component {


  componentWillMount() {
this.animatedValue =  new Animated.Value(0);
  }
  
    componentDidMount() {
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 1500
      }).start()
  }
  
  render() {
	 const interpolateRotation = this.animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],	
                })
	const animatedStyle = {transform: [{ rotate: interpolateRotation}]}
    const title = this.props.title ? this.props.title : 'Precaution';
    const content = this.props.content
      ? this.props.content
      : 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum';
    const src = this.props.src
      ? this.props.src
      : require('../../assets/img/wh.png');
    return (
      <View style={styles.mainPreventionContainer}>
        <Subheading style={styles.mainPreventionTitle}>{title}</Subheading>
        <Animated.View style={[styles.preventionContentContainer,animatedStyle]}>
          <Text style={styles.preventionContent}>{content}</Text>
          <Image
            style={{
              width: 100,
              height: 120,
              marginLeft: 10,
              marginBottom: 0,
              flex: 1.6,
              borderRadius: 16,
            }}
            source={src}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default PreventionCards;
