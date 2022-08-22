import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View,Text,Button, Alert } from "react-native";
import { BackHandler } from "react-native";
import { TextInput } from "react-native-paper";


export default class AddFlash extends React.Component{

    state={
        term:"",
        definition:"5",
        value:""
    }

    

    /**========================================================================
 * *                                addFlash
 *   Adds the entered flashcard into the flashcards array
 *   
 *   
 *
 *========================================================================**/
    Addflash=async()=>{
        var subject= this.props.route.params.value[0]
     
        var array = JSON.parse(await AsyncStorage.getItem("flashcards")); //get flashcard from asyncStorage

  
   if (this.state.definition.length==0 || this.state.term.length==0){
        Alert.alert("Blank","Do not leave term or definition blank")
    }

   else if (this.state.term.length>150){
        Alert.alert("Term too long","Please ensure that the term is less than 50 characters");
   }

   else if (this.state.definition.length>300){
        Alert.alert("Definition too long","Please ensure that the definition is within 300 characters");
   }
    else{
       
          
        for (let i =0 ;i<array.length;i++){

            if (array[i][0]==subject){ //If the array matches the selected subject name then push the data into the array 
             
                var arr= array[i][1]
                arr.push([[this.state.term,this.state.definition]]);
                array[i][1]=arr;
              
                AsyncStorage.setItem("flashcards",JSON.stringify(array));
            }
        }
        Alert.alert("Flashcard added","Flashcard added for " + subject);
   
    }

    
    
      
    }   


    disableBackButton=()=>{
       this.props.navigation.navigate("Subjects",{name:this.props.route.params.value})
       this.props.navigation.navigate("FlashCards",{name:this.props.route.params.value})
        return true;
    }

    

    componentDidMount(){
        BackHandler.addEventListener("hardwareBackPress",this.disableBackButton)
    }

    componentWillUnmount(){
        BackHandler.removeEventListener("hardwareBackPress",this.disableBackButton)
    }
    // onLoad=()=>{
    //     useEffect(()=>{
    //          BackHandler.addEventListener('hardwareBackPress',()=>{this.props.navigation.navigate('FlashCards',{name:this.props.route.params.value})})
            
    //     },[])  

    //     return(<View></View>)
    // }


 

/**========================================================================
 * *                                setDropDown
 *   Loads subjects into drop down list by fetching from async storage
 *   
 *   
 *
 *========================================================================**/
 

    render(){

        this.state.value = this.props.route.params.value;

        return (
            <View style={{marginTop:30}}>

                
             
                <View style={styles.term}>
                <TextInput placeholder="Enter term" onChangeText={(text)=>{this.setState({term:text})}} ></TextInput>
                </View>
            
                <View style={styles.definition}>
                <TextInput multiline={true} onChangeText={(text)=>{this.setState({definition:text})}}  placeholder="Enter definition/description"></TextInput>
                </View>

                <View style={styles.button}>
                <Button title="Add Flash Card" onPress={this.Addflash}></Button>
                </View>
            </View>
        )
    }

}

const styles={
    term:{
        top:70
    },
    definition:{
        top:140

    },
    button:{
        position:"relative",

        top:190
    }
}