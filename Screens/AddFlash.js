import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View,Text,Button, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-paper";
import { useState } from "react";

export default class AddFlash extends React.Component{

    state={
        term:"",
        definition:"5",
        itemsDrop:[],
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

        var array = JSON.parse(await AsyncStorage.getItem("flashcards")); //get flashcard from asyncStorage

    if (this.state.value==null){
        Alert.alert("No subject selected","No subject has been selected")
       
    }
    else if (this.state.definition.length==0 || this.state.term.length==0){
        Alert.alert("Blank","Do not leave term or definition blank")
    }
    else{
       
          
        for (let i =0 ;i<array.length;i++){

            if (array[i][0]==this.state.value){ //If the array matches the selected subject name then push the data into the array 
                var arr= array[i][1]
                arr.push([[this.state.term,this.state.definition]]);
                array[i][1]=arr;
              
                AsyncStorage.setItem("flashcards",JSON.stringify(array));
            }
        }
        Alert.alert("Flashcard added","Your flashcard has been added");
   
    }

    
      
    }   


/**========================================================================
 * *                                setDropDown
 *   Loads subjects into drop down list by fetching from async storage
 *   
 *   
 *
 *========================================================================**/
    setDropDown=async()=>{

        var subjects = JSON.parse(await AsyncStorage.getItem("subjects"));


        var arrayobject=[];

        for (let i =0 ; i<subjects.length;i++){    // Push subject name as both label and value into dropdown list. 
            arrayobject.push({label:subjects[i][0],value:subjects[i][0]})
        }
       
        this.setState({itemsDrop:arrayobject})
        
    }

    
    /**========================================================================
 * *                                Loaddropdownlist
 *   Adds the entered flashcard into the flashcards array
 *   
 *   
 *
 *========================================================================**/
    App=()=> {
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);

        this.state.value=value //sets value to the subject name 
      
  
        return (

            <DropDownPicker
            open={open}
            value={value}
            items={this.state.itemsDrop}
            setOpen={setOpen}
            setValue={setValue}
         
            ></DropDownPicker>
        
        );
      }

    componentDidMount=()=>{
        this.setDropDown()

        
    }

    render(){

        return (
            <View>
                <this.App></this.App>
               
                <View style={styles.term}>
                <TextInput style={{}} placeholder="Enter term" onChangeText={(text)=>{this.setState({term:text})}} ></TextInput>
                </View>

                <View style={styles.definition}>
                <TextInput style={{}} onChangeText={(text)=>{this.setState({definition:text})}}  placeholder="Enter definition/description"></TextInput>
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