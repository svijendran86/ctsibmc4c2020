import base64 from 'react-native-base64'

import config from './config.js';
import {
  Alert,
  Text,
  View
} from 'react-native';


// Watson Assistant API documentation:
// https://console.bluemix.net/apidocs/assistant
MessageRequest = (input, context = {}) => {

	//'https://api.us-south.assistant.watson.cloud.ibm.com/instances/970b8249-a49c-46a6-a2c6-7ac0dd45b7e2/v1/workspaces/0e023eef-102a-4b9d-98c5-880efbec52a9/message?version=2018-09-20'
  let body = {
    alternate_intents: true,
    input: {
      'text': input
    }
  };
  if (context) {
    body.context = context;
  }
  return fetch(config.assistant_url , {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + base64.encode(config.user_name + ":" + config.password),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then((response) => response.json())
  .then((responseJson) => {

    // console.log(responseJson);
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });

}

module.exports = {
  MessageRequest
}