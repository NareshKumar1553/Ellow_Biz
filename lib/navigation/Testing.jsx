import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import your screens
import Home from '../screens/Home';
import Profile from '../screens/Profile';

// Create the Stack Navigator
const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

// Create the Tab Navigator
const Tab = createBottomTabNavigator();
function HomeTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

// Create the Drawer Navigator
const Drawer = createDrawerNavigator();
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeTab} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;