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

    Addflash=async()=>{

        var array = JSON.parse(await AsyncStorage.getItem("flashcards"));

    if (this.state.value==null){
        Alert.alert("No subject selected","No subject has been selected")
       
    }
    else if (this.state.definition.length==0 || this.state.term.length==0){
        Alert.alert("Blank","Do not leave term or definition blank")
    }
    else{
       
          
        for (let i =0 ;i<array.length;i++){
            if (array[i][0]==this.state.value){
                var arr= array[i][1]
                arr.push([[this.state.term,this.state.definition]]);
                array[i][1]=arr;
              
                AsyncStorage.setItem("flashcards",JSON.stringify(array));
            }
        }
        Alert.alert("Flashcard added","Your flashcard has been added")
   
    }

    
      
    }   

    setDropDown=async()=>{

        var subjects = JSON.parse(await AsyncStorage.getItem("subjects"));


        var arrayobject=[];

        for (let i =0 ; i<subjects.length;i++){
            arrayobject.push({label:subjects[i][0],value:subjects[i][0]})
        }
       
        this.setState({itemsDrop:arrayobject})
        
    }

    

    App=()=> {
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);

        this.state.value=value
      
  
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