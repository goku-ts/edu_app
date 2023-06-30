import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/User/Login';
import SignupScreen from '../screens/User/Register';
import {Profile} from '../screens/User/Profile';


type RootStackParamList = {
    Signin: any;
    Signup: undefined;
    Profile: any;
  };
  
  type SigninScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signin'>;
  type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;
  
  type SigninScreenRouteProp = RouteProp<RootStackParamList, 'Signin'>;
  type SignupScreenRouteProp = RouteProp<RootStackParamList, 'Signup'>;
  type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
  
  export type SigninScreenProps = {
    navigation: SigninScreenNavigationProp;
    route: SigninScreenRouteProp;
  };
  
  export type SignupProps = {
    navigation: SignupScreenNavigationProp;
    route: SignupScreenRouteProp;
  };
  
  export type ProfileProps = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
  };
  
  
  
  const Stack = createNativeStackNavigator<RootStackParamList>();
  


  const App: React.FC = () => (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Signin" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Signin" component={SignInScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Profile" component={Profile} options={{headerLeft:undefined}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  
  export default App;