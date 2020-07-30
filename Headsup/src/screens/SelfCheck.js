
import React, { useState, Component } from 'react';
import config from '../../config.js';
import qs from 'qs';

import { ScrollView, StatusBar, Dimensions, Text , Alert, StyleSheet,View, Linking} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
import { data, contributionData, pieChartData, progressChartData } from './data'
import 'babel-polyfill'

//import getFitBitAuth from '../hooks/getFitBitAuth.js';



// in Expo - swipe left to see the following styling, or create your own
const chartConfigs = [
  {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16
    }
  },
  {
    backgroundColor: '#022173',
    backgroundGradientFrom: '#022173',
    backgroundGradientTo: '#1b3fa0',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  },
  {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  },
  {
    backgroundColor: '#26872a',
    backgroundGradientFrom: '#43a047',
    backgroundGradientTo: '#66bb6a',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  },
  {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#000000',
    backgroundGradientTo: '#000000',
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
  }, {
    backgroundColor: '#0091EA',
    backgroundGradientFrom: '#0091EA',
    backgroundGradientTo: '#0091EA',
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
  },
  {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  },
  {
    backgroundColor: '#b90602',
    backgroundGradientFrom: '#e53935',
    backgroundGradientTo: '#ef5350',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  },
  {
    backgroundColor: '#ff3e03',
    backgroundGradientFrom: '#ff3e03',
    backgroundGradientTo: '#ff3e03',
    color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`
  }
]





class SelfCheck extends Component {


  componentWillMount() {
	  
	this.OAuth(config.client_id,this.getData);


  }
  
  

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: data,
	  blueThoothData: []
    };

  }
  renderTabBar() {
    return <StatusBar hidden/>
  }

  OAuth = (client_id, cb) => {

   // Listen to redirection
  Linking.addEventListener('url', handleUrl);
  function handleUrl(event){
    console.log(event.url);
    Linking.removeEventListener('url', handleUrl);
    const [, query_string] = event.url.match(/\#(.*)/);
    console.log(query_string);

    const query = qs.parse(query_string);
    console.log(`query: ${JSON.stringify(query)}`);

     return cb(query.access_token);

    /*if (query.state === state) {
      cb(query.code, getProfileData, 'access_token');
    } else {
      console.error('Error authorizing oauth redirection');
    }*/
  }


   // Call OAuth
  const oauthurl = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BMRH&redirect_uri=mppy://fitbit&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=31536000';
  console.log(oauthurl);

  Linking.openURL(oauthurl).catch(err => console.error('Error processing linking', err));
  
}

getData = (access_token) => {
	
  return fetch(
     'https://api.fitbit.com/1/user/-/activities/heart/date/today/1w.json',
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
      //body: `root=auto&path=${Math.random()}`

    }
  ).then((res) => {
    return res.json()
  }).then((res) => {
    console.log(`res: ${JSON.stringify(res)}`);

	
	return fetch('http://crisis-com.us-south.cf.appdomain.cloud/GetHrtMsg/json_data', {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        body: `${JSON.stringify(res)}`
    }).then((response) => response.json())
    .then((responseData) => {
		this.setState({isLoading: false,dataSource: responseData});
		fitBitRes = responseData;
		Alert.alert("Health Status","Good news for you. You are healthy!",[{text: "Cancel",onPress: () => console.log("Cancel Pressed"),style: "cancel"},{ text: "OK", onPress: () => console.log("OK Pressed") }],{ cancelable:false }
						);
		this.setState({blueThoothData: {'userId' : 'a', 'bluetoothId' : '22BMRH' , 'riskStatus' : 'Yes' }});
						
	fetch('http://crisis-com.us-south.cf.appdomain.cloud/fitbit/add', {
		method: 'POST',
		headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
		body: `${JSON.stringify(this.state.blueThoothData)}`
		}).then((response) => response.json()).then((responseData) => {

		Alert.alert("Health Status","data saved",[{text: "Cancel",onPress: () => console.log("Cancel Pressed"),style: "cancel"},{ text: "OK", onPress: () => console.log("OK Pressed") }],{ cancelable: false });						
		return responseData;
		}).catch((error) => {
			console.log("Error");
		});
		return responseData;
        console.log(responseData);
    }).catch((error) => {
        console.log("Error");
    });
  }).catch((err) => {
    console.error('Error: ', err);
  });
}
  render() {
    const width = Dimensions.get('window').width
    const height = 220
    return (
	<View style={styles.countrySection}>
        {chartConfigs.map(chartConfig => {
          const labelStyle = {
            color: chartConfig.color(),
            marginVertical: 10,
            textAlign: 'center',
            fontSize: 16
          }
          const graphStyle = {
            marginVertical: 8,
            ...chartConfig.style
          }
          return (
            <ScrollView
              key={Math.random()}
              style={{
                backgroundColor: chartConfigs[0].backgroundColor
              }}
            >
			<Text>Access Token </Text>
              <Text style={{
            color: chartConfigs[0].color(),
            marginVertical: 10,
            textAlign: 'center',
            fontSize: 16
          }}>Oxygen Saturation Rate</Text>
              <BarChart
                width={width}
                height={height}
                data={data}
                chartConfig={chartConfigs[0]}
                style={{
            marginVertical: 8,
            ...chartConfigs[0].style
          }}
              />
              <Text style={{
            color: chartConfigs[0].color(),
            marginVertical: 10,
            textAlign: 'center',
            fontSize: 16
          }}>Sleep Time</Text>
              <PieChart
                data={pieChartData}
                height={height}
                width={width}
                chartConfig={chartConfigs[0]}
                accessor="population"
                style={{
            marginVertical: 8,
            ...chartConfigs[0].style
          }}
              />
              <Text style={{
            color: chartConfigs[0].color(),
            marginVertical: 10,
            textAlign: 'center',
            fontSize: 16
          }}>Heart Rate</Text>
              <LineChart
                data={data}
                width={width}
                height={height}
                chartConfig={chartConfigs[0]}
                style={{
            marginVertical: 8,
            ...chartConfigs[0].style
          }}
              />
           </ScrollView>
          )
        })}
	  </View>
    )
  }
}
export default SelfCheck;

const styles = StyleSheet.create({
  countrySection: {
    backgroundColor: '#FFC692',
    marginTop: 0,
    marginBottom: 20,
    paddingVertical: 20,
    paddingTop: 10,
    borderRadius: 16,
  },
  countryHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  countrySectionTitle: {
    textAlign: 'justify',
    color: 'black',
    marginTop: 0,
    fontWeight: 'bold',
    fontFamily: '',
  },
  animatedDataDialog: {
    color: 'black',
    padding: 10,
    borderRadius: 16,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    left: 20,
    top: 0,
  },
  graphContainer: {
    backgroundColor: '#FFC692',
    padding: 10,
  },
});


