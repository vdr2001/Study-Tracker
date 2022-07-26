import React from "react";
import { View,Text, Alert } from "react-native";

import { Dimensions } from "react-native";
import { Card, Paragraph, TextInput } from "react-native-paper";
import { StyleSheet,Button,Picker } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import DropDownPicker from "react-native-dropdown-picker";
import * as Font from 'expo-font';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { TouchableOpacity } from "react-native-gesture-handler";
export default class FlashCards extends React.Component{

    
        
        state = {
        
          side:false,
          value:"Select Subject",
          flashArray:[],
          itemsDrop:[],
          index:0,
          length:null,
          currval:'',
          subjects:[],
          loaded:0,
          subName:"",
          indexofArray:0,
          font:"normal",
          fontsLoaded:false
        };

       

        
        App=()=> {
            const [open, setOpen] = useState(false);
            const [value, setValue] = useState(null);
            const [items, setItems] = useState([
              {label: 'Apple', value: 'apple'},
              {label: 'Banana', value: 'banana'}
            ]);
            
            
           
          this.state.value=value
            return (
              <DropDownPicker
                open={open}
                value={value}
                items={this.state.itemsDrop}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            );
          }
    
          setDropDown=async()=>{

            var subjects = JSON.parse(await AsyncStorage.getItem("subjects"));
    
    
            var arrayobject=[];
    
            for (let i =0 ; i<subjects.length;i++){
                arrayobject.push({label:subjects[i][0],value:subjects[i][0]})
            }
           
           
         
          this.setState({loaded:1,subjects:subjects,itemsDrop:arrayobject})
        }

     

   
    loadFlashCards = async()=>{
   
        var index=0;
        var flashcards = JSON.parse(await AsyncStorage.getItem("flashcards"))
        var flashDisplay=[]
        

        if (this.state.currval!=this.state.value){
            this.state.index=0
        }
        
        
        for (let i =0; i<flashcards.length;i++){
            if (flashcards[i][0]==this.state.value){
                index=i
               
            }
        }
      
        var arraySect= flashcards[index][1]
    
        for (let j=1;j<arraySect.length;j++){
            flashDisplay.push([arraySect[j]])
        }
       

        this.state.flashArray=arraySect
        this.state.length= flashDisplay.length
        this.state.subName=this.state.value;
        this.state.value="Select Subject"
        this.state.indexofArray=index
        this.setState({})
    }     


    deleteCard=async()=>{
      var flashcards = JSON.parse(await AsyncStorage.getItem("flashcards"))

      var flashcard =flashcards[this.state.indexofArray][1];


      flashcard.splice(this.state.index,1)

    flashcards[this.state.indexofArray][1]=flashcard

    AsyncStorage.setItem('flashcards',JSON.stringify(flashcards)
    )
    this.state.value= flashcards[this.state.indexofArray][0]
    this.setState({})
    }
 
 
    card=()=>{

               
        var variable=this.state.side;

   
    if (this.state.flashArray.length>0 & this.state.value!=null){
        if (variable==true){
            return(
         <View>      
        <TouchableOpacity onPress={()=>{this.setState({side:!this.state.side})}}>     
          <Card  style={styles.Card}> 
          <Card.Title style={{left:'30%'}} title={String(this.state.flashArray[this.state.index]).split(',')[0]}></Card.Title>
          <Card.Content style={styles.cardContent}>
              <Paragraph>{String(this.state.flashArray[this.state.index]).split(',')[1]}</Paragraph>
             
          </Card.Content>
          
      </Card>
      </TouchableOpacity>  
      
      </View>  

            )
        }
        else{
            return(

              
         <View style={{bottom:30}}>    
          
        
     
         <TouchableOpacity onPress={()=>{this.setState({side:!this.state.side})}}>      
            <Card  style={styles.Card}> 
            <Card.Title style={{left:'30%',top:'25%'}} title={String(this.state.flashArray[this.state.index]).split(',')[0]}></Card.Title>
         
        </Card>
        </TouchableOpacity> 
        <AwesomeButton backgroundColor="#00CC99" width={Dimensions.get('window').width} onPress={()=>{this.deleteCard()}} ><Text>🗑️</Text></AwesomeButton>
         
        </View>   
            )
        }
    }
    else{
        if(this.state.length==0){
           return( <View><Text style={{fontFamily:this.state.font,fontSize:29,textAlign:'center',color:'#FF7F50',top:70}}>(No Flashcards for this subject)</Text></View>)
        }
        else{
        return(<View><Text style={{fontFamily:this.state.font,fontSize:29,textAlign:'center',color:'#FF7F50',top:70}}>Please select a subject</Text></View>)
        }
    }
    }

 

    onSwipeRight(){
        var index1= this.state.index-1
        this.state.currval=this.state.value
        
        if (index1>=0){
      
            this.state.index= index1;
        }
        this.setState({})
       
       
    }
    
    onSwipeLeft(){
       
        var index1= this.state.index+1
        this.state.currval=this.state.value
        
        if (index1<this.state.length+1){
            this.state.index= index1;
        }
        this.setState({})
       
    }
     
  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        alert("up");
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        this.onSwipeLeft()
        break;
      case SWIPE_RIGHT:
        this.onSwipeRight()
        break;
    }
  }
 
  loadFonts=async()=>{
    await Font.loadAsync({
        Daniel:require('../assets/fonts/Daniel.ttf'),
        Pacifico:require('../assets/fonts/Pacifico-Regular.ttf'),
        Teko:require('../assets/fonts/Teko-Regular.ttf')
    })
    
    this.setState({ fontsLoaded: true,font:"Teko" });
}



    render(){

      if (this.state.fontsLoaded==false){
        this.loadFonts()
      }

        if (this.state.loaded==0){
        this.setDropDown()
        }
        if (this.state.value!=="Select Subject" ){
            
            this.loadFlashCards()
            
        }
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 610,
            gestureIsClickThreshold:0.5
          };
      
        return(

        <View>
             <View style={styles.addButton}>
           
          <AwesomeButton  onPress={()=>{this.props.navigation.navigate("AddFlash")}} borderWidth={3} borderColor='#C39953' backgroundColor={'#00CC99'} width={(Dimensions.get('window').width)/2}>
            
            
            
            <Text style={{fontFamily:this.state.font,fontSize:20, color:'white'}}>Add Flashcards</Text>
          
          
          </AwesomeButton>
             
              </View>
              <Picker 
               
                onValueChange={(itemvalue,itempos)=>{this.setState({value:itemvalue})
            
              }}
              selectedValue={this.state.value}
                
               >
                <Picker.Item label="Select Subject" value="Select Subject"/>
                {this.state.subjects.map( (val,index)=>
                  <Picker.Item label={val[0]} value={val[0]} key={index}></Picker.Item>
                    
                )}
                
               </Picker>
              <GestureRecognizer  config={config} onSwipe={(direction,state)=>{this.onSwipe(direction,state)}}>
              <Text style={{fontFamily:this.state.font,fontSize:29,textAlign:'center',top:20,color:'#FF7F50'}}>{this.state.subName}</Text>
              <this.card></this.card>
              </GestureRecognizer>
            
             
        </View>
        )
    }

}


const styles = StyleSheet.create({
    Card:{
        position:"relative",
        top:60,
        height:450,
        borderWidth:0,
        borderColor:'#C39953'

    }
    , 
    cardContent:{
        top:50
    },
    addButton:{
       
        marginTop:10,
        marginBottom:10,
        alignItems:'center'
    }
})