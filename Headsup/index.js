
import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import LoginApp from './src/screens/LoginApp';
import {name as appName} from './app.json';

export default function Main() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <StatusBar
        translucent={false}
        hidden={false}
        animated={true}
        backgroundColor="#DEF7FF"
        barStyle="dark-content"
      />
      <LoginApp theme="light" />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
