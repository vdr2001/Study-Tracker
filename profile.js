import React, { Component } from 'react';
import { ImagePickerIOS } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';


import { TextInput } from 'react-native-paper';






export default class Profile extends React.Component {
  state={
    FirstName:"",
    LastName:""
  }
  
  render(){


  

  
  



   return (
      <SafeAreaView>
       <ScrollView>
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            
            <View style={styles.bodyContent}>
              <Text style={styles.name}></Text>
              
              
               <Text style={styles.info}>Setup Profile</Text>
              
              
              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Continue</Text>  
              </TouchableOpacity>    

                
              
            </View>
            
           


        </View>
        

        <TextInput style={styles.input}
                label="First Name"
                placeholder="FirstName"

               />         
                <TextInput label="Last Name" style={styles.input}
                placeholder="LastName"
                />  

<TextInput style={styles.input}
                label="Username"
                placeholder="Username"
                

               />         
                <TextInput label="Password" style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                />  
                <TextInput label="Confirm Password" style={styles.input}
                placeholder="Confirm Password"
                />  



        
    
        
                
      </View>
      </ScrollView> 
      </SafeAreaView>
      
    );
  }
}






const styles = StyleSheet.create({
  
  input:{
    position:'relative',
    top:-100,
    left:90,
    height: 60,
    margin: 1,
    borderWidth: 1,
    marginBottom:30,
    textAlign:'center'
,
width:200
  },
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:23,
    color: "#00BFFF",
    marginTop:2
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    position:'relative',
    top:450,
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    marginTop:40,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});