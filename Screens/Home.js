import AsyncStorage from '@react-native-async-storage/async-storage';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';







class Home extends React.Component{

    

    state={
        user:'',
        Username:''
    }

j


    setArray=async()=>{
        var array =await AsyncStorage.getItem('studydata');
        var arrayFlash= await AsyncStorage.getItem('flashcards')

        if (array==null){
            AsyncStorage.setItem('studydata',JSON.stringify([]));
        }

        if (arrayFlash==null){
            AsyncStorage.setItem('flashcards',JSON.stringify([]));
        }
       
 


    }

    removeOldDates = async() =>{
        
        var array =JSON.parse(await AsyncStorage.getItem('studydata'));

       
        var date = new Date()
        for (let i=0 ; i<array.length;i++){
            var difference = Math.abs(date-array[i][1])
            var days = difference/(1000 * 3600 * 24)

            if (days>14){
                array.splice(i,1)
            }
        }

       AsyncStorage.setItem('studydata',JSON.stringify(array))

    }
    
    
//    resetStudy=()=>{
//     AsyncStorage.setItem('studydata',JSON.stringify([]));

//    }
    render(){

        this.setArray();

      
      
      
      
        
        return(
            <View >

                

            
                
            
               
                  

              <AwesomeButton  height={70} width={150} backgroundColor="#00CC99" borderWidth={3} borderColor='#C39953' style={styles.buttonContainer} onPress={()=>this.props.navigation.navigate('Subjects',{user:this.state.user})}>
                
              
              <Text style={styles.text}>Subjects</Text>
              

             
            
            
               </AwesomeButton> 

               <AwesomeButton height={70} width={150} backgroundColor="#00CC99" borderWidth={3} borderColor='#C39953' style={styles.buttonContainer} onPress={()=>{this.props.navigation.navigate('Progress')}}>

             
                <Text style={styles.text}>View Progress</Text>
                

                </AwesomeButton> 

                <AwesomeButton height={70} width={150} backgroundColor="#00CC99" borderWidth={3} borderColor='#C39953' style={styles.buttoncontainer2} onPress={()=>{this.props.navigation.navigate('Study',{user:this.state.user})}}>


              
                <Text style={styles.text} >Study Now</Text>


                </AwesomeButton> 


        



                <AwesomeButton height={70} width={150} backgroundColor="#00CC99" borderWidth={3} borderColor='#C39953' style={styles.buttoncontainer2} onPress={()=>{this.props.navigation.navigate('FlashCards')}} >

              
                     <Text style={styles.text}>Flash cards</Text>


                </AwesomeButton> 


                <AwesomeButton height={70} width={150} backgroundColor="#00CC99" borderWidth={3} borderColor='#C39953' style={styles.buttoncontainer2} onPress={()=>{this.props.navigation.navigate("Previousses")}} >

              
                     <Text style={styles.text}>View Previous Sessions</Text>


                </AwesomeButton> 
                







              
               
                  
            </View>





            

        )
    }
}


const styles= StyleSheet.create({
   buttonContainer:{
       position:'relative',
       top:180,
       left:20,
       marginBottom:70
       
   },
   buttoncontainer2:{
    position:'relative',
    
    bottom:100,
    left:220,
    marginBottom:70
    
   },
   text:{
    color: "#fff"
    
   }

    
})
export default Home