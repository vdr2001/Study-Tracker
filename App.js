import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Screens/Home';


import Subjects from './Screens/Subjects';
import Study from './Screens/Study/Study';
import Subject from './Screens/Study/SubjectPage';
import Progress from './Screens/Progress';
import FlashCards from './Screens/FlashCards';
import AddFlash from './Screens/AddFlash';
import PreviousSes from './Screens/Sessions/PreviousSes';
import ViewTask from './Screens/Sessions/ViewTask';

export default function App() {

  const stack = createStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Home">
    
        <stack.Screen name="Home" component={Home} options={{title:"Select Page"}} />     
        <stack.Screen name="Subjects" component={Subjects}/>
        <stack.Screen name="Study" component={Study} options={{title:"Select Subject"}}/>
        <stack.Screen name="SubjectPage" component={Subject}/>
        <stack.Screen name="FlashCards" component={FlashCards}/>
        <stack.Screen name="AddFlash" component={AddFlash} options={{title:"Add FlashCards"}}/>
        <stack.Screen name="Progress" component={Progress}/>
        <stack.Screen name="Previousses" component={PreviousSes} options={{title:"Previous Sessions"}}/>
        <stack.Screen name="ViewTask" component={ViewTask} options={{title:"View Tasks"}}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}


