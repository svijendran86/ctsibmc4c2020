/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet,  Animated} from 'react-native';
import {Title} from 'react-native-paper';

// importing components
import RowStackResult from './RowStackResult';

class Country extends Component {

  state = {
    SlideInLeft: new Animated.Value(0),
    slideUpValue: new Animated.Value(0),
    fadeValue: new Animated.Value(0)
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.getCountry();
    }, 5 * 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

    _start = () => {
    return Animated.parallel([
      Animated.timing(this.state.SlideInLeft, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(this.state.slideUpValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();
  };
  
  render() {
    const country = this.props.countryName;
    const data = this.props.data;
	let { slideUpValue, fadeValue, SlideInLeft } = this.state;
	this._start();
    return (

		<Animated.View  style={{
            transform: [
              {
                translateX: SlideInLeft.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0]
                })
              }
            ],
			backgroundColor: '#169be6',
			marginTop: 0,
			marginBottom: 20,
			paddingVertical: 20,
			paddingTop: 10,
			paddingHorizontal: 10,
			borderRadius: 16,
          }} >
        <View style={styles.countryHeader}>
          <Title style={styles.countrySectionTitle}>
            {country ? country : ' Unknown Country '}:{' '}
          </Title>
        </View>
        <RowStackResult data={data} textColor="white" />
		</Animated.View>

    );
  }
}

const styles = StyleSheet.create({
  countrySection: {
    backgroundColor: '#169be6',
    marginTop: 0,
    marginBottom: 20,
    paddingVertical: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  countryHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  countrySectionTitle: {
    textAlign: 'justify',
    color: 'white',
    marginTop: 0,
    fontWeight: 'bold',
    fontFamily: '',
  },
});

export default Country;
