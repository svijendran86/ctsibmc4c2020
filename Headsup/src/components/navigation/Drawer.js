/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import {Drawer, IconButton, DefaultTheme} from 'react-native-paper';

// // importing Screens
import HomeScreen from '../../screens/HomeScreen';
import AboutScreen from '../../screens/AboutScreen';
import PrecautionScreen from '../../screens/PrecautionScreen';
import HelpScreen from '../../screens/HelpScreen';
import TopHeadlinesScreen from '../../screens/TopHeadlinesScreen';
import SelfCheck from '../../screens/SelfCheck';
import ChatBot from '../../screens/ChatBot';
import SensorsComponent from '../../screens/SensorsComponent';
import Settings from '../../screens/Settings';

import Login from '../../screens/Login';

const Stack = createStackNavigator();

export const Screens = ({navigation, style}) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          animationEnabled: false,
          headerTransparent: true,
          headerTitle: null,
          headerLeft: () => (
            <View
              style={{
                backgroundColor: '#DEF7FF',
                marginLeft: 14,
                borderRadius: 8,
                shadowColor: '#000',
                shadowOpacity: 1,
                shadowRadius: 8,
                elevation: 10,
              }}>
              <IconButton
                style={{margin: 0}}
                icon={({size, color}) => (
                  <Icon name="menu" size={size} color="black" />
                )}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Headline">
          {(props) => <TopHeadlinesScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Precaution">
          {(props) => <PrecautionScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Help">
          {(props) => <HelpScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="About">
          {(props) => <AboutScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {(props) => <Settings {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SelfCheck">
          {(props) => <SelfCheck {...props} />}
        </Stack.Screen>
		 <Stack.Screen name="Chatbot">
          {(props) => <ChatBot {...props} />}
        </Stack.Screen>
		 <Stack.Screen name="SensorsComponent">
          {(props) => <SensorsComponent {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  );
};

export const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={true}
      contentContainerStyle={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Image
          style={{margin: 20, marginTop: -20, alignSelf: 'center'}}
          source={require('../../../assets/headsup.png')}
          size={100}
        />
        <View>
          <Drawer.Item
            label="Home"
			theme={{colors: {placeholder: 'white', text: 'white', primary: 'white',underlineColor: 'transparent', background: '#003489'}}}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Home')}
            icon={({size}) => <Icon name="home" size={size} color="white" />}
          />
          <Drawer.Item
            label="Headline"
			theme={{colors: {placeholder: 'white', text: 'white', primary: 'white',underlineColor: 'transparent', background: '#003489'}}}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Headline')}
            icon={({size}) => <Icon name="columns" size={size} color="white" />}
          />
          <Drawer.Item
            label="Precaution"
			theme={{colors: {placeholder: 'white', text: 'white', primary: 'white',underlineColor: 'transparent', background: '#003489'}}}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Precaution')}
            icon={({size}) => (
              <Icon name="alert-octagon" size={size} color="white" />
            )}
          />
          <Drawer.Item
            label="Help"
			theme={{colors: {placeholder: 'white', text: 'white', primary: 'white',underlineColor: 'transparent', background: '#003489'}}}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Help')}
            icon={({size}) => (
              <Icon name="help-circle" size={size} color="white" />
            )}
          />
          <Drawer.Item
            label="About"
			theme={{colors: {placeholder: 'white', text: 'white', primary: 'white',underlineColor: 'transparent', background: '#003489'}}}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('About')}
            icon={({size}) => <Icon name="github" size={size} color="white" />}
          />
          <Drawer.Item
            label="Settings"
			theme={{colors: {placeholder: 'white', text: 'white', primary: 'white',underlineColor: 'transparent', background: '#003489'}}}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Settings')}
            icon={({size}) => <Icon name="settings" size={size} color="white" />}
          />
          <Drawer.Item
            label="Self Check"
			theme={{colors: {placeholder: 'white', text: 'white', primary: 'white',underlineColor: 'transparent', background: '#003489'}}}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('SelfCheck')}
            icon={({size}) => <Icon name="heart" size={size} color="white" />}
          />
		  <Drawer.Item
            label="Chatbot"
			theme={{colors: {placeholder: 'white', text: 'white', primary: 'white',underlineColor: 'transparent', background: '#003489'}}}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Chatbot')}
            icon={({size}) => <Icon name="speaker" size={size} color="white" />}
          />
		  <Drawer.Item
            label="Alarm"
			theme={{colors: {placeholder: 'white', text: 'white', primary: 'white',underlineColor: 'transparent', background: '#003489'}}}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('SensorsComponent')}
            icon={({size}) => <Icon name="clock" size={size} color="white" />}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1 
},
  stack: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 10,
  },
  drawerItem: {
    alignSelf: 'stretch',
    margin: 0,
    padding: 0,
  },
});
