/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Animated from 'react-native-reanimated';

import {DrawerContent, Screens} from './src/components/navigation/Drawer.js';

const Drawer = createDrawerNavigator();

const MainApp = () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

  return (
    <NavigationContainer>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{flex: 1, backgroundColor: 'transparent'}}>
        <Drawer.Navigator
          headerMode="none"
          edgeWidth={100}
          initialRouteName="Screens"
          drawerType="slide"
          overlayColor="transparent"
          drawerStyle={{flex: 1, width: '50%', backgroundColor: 'transparent'}}
          contentContainerStyle={{flex: 1}}
          drawerContentOptions={{
            activeBackgroundColor: 'transparent',
            activeTintColor: 'black',
            inactiveTintColor: 'black',
          }}
          sceneContainerStyle={{backgroundColor: 'transparent'}}
          drawerContent={(p) => {
            setProgress(p.progress);
            return <DrawerContent {...p} />;
          }}>
          <Drawer.Screen name="Screens">
            {(p) => <Screens {...p} style={animatedStyle} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </LinearGradient>
    </NavigationContainer>
  );
};

const UserStartingSwitch = createSwitchNavigator(
  {
    MainApp,
  },
  {
    initialRouteName: 'MainApp',
  },
);

export default createAppContainer(UserStartingSwitch);
