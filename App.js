
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Subjects from './Screens/Subjects';

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
      <stack.Navigator initialRouteName="Subjects">
    
          
        
      <stack.Screen name="Subjects" component={Subjects} options={{headerShown:false}}/>
      
      <stack.Screen name="SubjectPage" component={Subject} options={{headerShown:false}}/>
      <stack.Screen name="FlashCards" component={FlashCards} options={{headerShown:false}}/>
      <stack.Screen name="AddFlash" component={AddFlash} options={{title:"Add FlashCards",headerShown:false}}/>
      <stack.Screen name="Progress" component={Progress} options={{headerShown:false}}/>
      <stack.Screen name="Previousses" component={PreviousSes} options={{title:"Previous Sessions",headerShown:false}}/>
      <stack.Screen name="ViewTask" component={ViewTask} options={{title:"View Tasks",headerShown:false}}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}
