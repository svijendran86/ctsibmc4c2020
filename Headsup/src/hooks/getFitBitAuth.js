/* eslint-disable react-hooks/rules-of-hooks */
import {useState, useEffect,Component} from 'react';
import config from '../../config.js';
import qs from 'qs';
import fitBitApi from '../apis/fitBitApi';

import {ScrollView, StatusBar, Dimensions, View ,StyleSheet, Alert,Text,Linking } from 'react-native';


//const useMount = func => useEffect(() => func(), []);

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);
		  Alert.alert(
	  'Error',
	  "useInitialURL",
	   [
				{
				  text: "Cancel",
				  onPress: () => console.log("Cancel Pressed"),
				  style: "cancel"
				},
				{ text: "OK", onPress: () => console.log("OK Pressed") }
			  ],
	  {cancelable: false},
	);
  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
	  		  Alert.alert(
	  'Error',
	  "getUrlAsync",
	   [
				{
				  text: "Cancel",
				  onPress: () => console.log("Cancel Pressed"),
				  style: "cancel"
				},
				{ text: "OK", onPress: () => console.log("OK Pressed") }
			  ],
	  {cancelable: false},
	);
	  const [, query_string] = initialUrl.match(/\#(.*)/);
	  console.log(query_string);

    const query = qs.parse(query_string);
    console.log(`query: ${JSON.stringify(query)}`);
	
			  Alert.alert(
	  'Error',
	  "useMount",
	   [
				{
				  text: "Cancel",
				  onPress: () => console.log("Cancel Pressed"),
				  style: "cancel"
				},
				{ text: "OK", onPress: () => console.log("OK Pressed") }
			  ],
	  {cancelable: false},
	);

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  });
  
    useEffect(() => {
    useMount();
  }, []);

  return { url, processing };
};

const getFitBitAuth = () => {

  const [data, setData] = useState();
  const [pieChartData, setPieChartData] = useState('');
  const [errMessage, setErrorMessage] = useState('');
 const { url: initialUrl, processing } = useState('');
  const getFitBitData = async () => {
    try {
	  const oauthurl = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BMRH&redirect_uri=mppy://fitbit&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=31536000';


   // Call OAuth
  console.log(oauthurl);
  Linking.addEventListener('url', useInitialURL());
      const resp = await Linking.openURL(oauthurl).catch(err => {console.error('Error processing linking', err)
	  		  Alert.alert(
	  'Error',
	  "test",
	   [
				{
				  text: "Cancel",
				  onPress: () => console.log("Cancel Pressed"),
				  style: "cancel"
				},
				{ text: "OK", onPress: () => console.log("OK Pressed") }
			  ],
	  {cancelable: false},
	);
	  
	  });
	  console.log(resp);


		  Alert.alert(
	  'Error',
	  "test1",
	   [
				{
				  text: "Cancel",
				  onPress: () => console.log("Cancel Pressed"),
				  style: "cancel"
				},
				{ text: "OK", onPress: () => console.log("OK Pressed") }
			  ],
	  {cancelable: false},
	);
      setData(resp);
	  setPieChartData(
    { name: 'Awake', population: 1.01, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Remember', population: 1.59, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Light', population: 4.12, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Deep', population: 1.0, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 }
	  );
      setErrorMessage('');
    } catch (err) {
      setData({});
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    getFitBitData();
  }, []);

  return [getFitBitData, pieChartData, data, errMessage];
};

export default getFitBitAuth;
