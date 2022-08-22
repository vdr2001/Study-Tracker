import React from "react";
import { View,Text, Alert } from "react-native";

import { Dimensions } from "react-native";
import { Card, Paragraph,Title } from "react-native-paper";
import { StyleSheet } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

import * as Font from 'expo-font';

import AsyncStorage from "@react-native-async-storage/async-storage";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { TouchableOpacity } from "react-native-gesture-handler";

export default class FlashCards extends React.Component{

    
        
        state = {
        
          side:false,
          value:"Select Subject",
          flashArray:[],
          index:0,
          length:null,
          currval:'',
          subjects:[],
          subName:"",
          indexofArray:0,
          font:"normal",
          fontsLoaded:false,
          swipeMessage:""
        };

       

        
       

     
    /**========================================================================
 * *                                Load Flashcards
 *   fetches flashcards from async storage and loads it into the state
 *   
 *   
 *
 *========================================================================**/
   
    loadFlashCards = async()=>{
   
        var index=0;
        var flashcards = JSON.parse(await AsyncStorage.getItem("flashcards"))
        var flashDisplay=[]
        

 
        
        for (let i =0; i<flashcards.length;i++){
            if (flashcards[i][0]==this.props.route.params.name[0]){
              
            
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
        this.state.swipeMessage="Swipe to view next card"
        this.state.value="Select Subject"
        this.state.indexofArray=index
        this.setState({})
    }     



    
   /**========================================================================
 * *                               Deleting card 
 *   Gets the flashcards for the selected subject
 * uses the current index to locate the flashcard the user wants to delete
 *
 *========================================================================**/

    deleteCard=async()=>{
      var flashcards = JSON.parse(await AsyncStorage.getItem("flashcards"))

      var flashcard =flashcards[this.state.indexofArray][1]; //gets flashcard for selected subject


      flashcard.splice(this.state.index,1) //deletes the term/definition using the selected index

    flashcards[this.state.indexofArray][1]=flashcard //assigns the newly deleted/modified card to the index of the whole flashcards array 

    AsyncStorage.setItem('flashcards',JSON.stringify(flashcards)
    )
    
    var newIndex =0 

    if (this.state.index>0){
      newIndex=this.state.index-1;
    
    }
    this.setState({value:flashcards[this.state.indexofArray][0],index:newIndex})
    this.loadFlashCards()
    }



   /**========================================================================
 * *                               card
 *   Determines which side of the card to show by using a boolean variable
 * initially it will be the definition side 
 * true-->show definition side false-->show only the term 
 *
 *========================================================================**/
 
    card=()=>{

               
        var variable=this.state.side; //boolean variable used to indicate the side. 

   
    if (this.state.flashArray.length>0 & this.state.value!=null){ //only shows flashcards if the flashcards array is not empty
        
      if (variable==true){ //show the definition side
            return(
         <View>
        <Text style={{textAlign:'center',marginTop:30,color:'#00CC99'}}>{this.state.swipeMessage}</Text>
        <TouchableOpacity onPress={()=>{this.setState({side:!this.state.side})}}>     
          <Card  style={styles.Card}> 
          <Title style={{alignSelf:'center',fontFamily:'Teko',fontSize:25,marginTop:20,color:'#FF7F50'}}> {String(this.state.flashArray[this.state.index]).split(',')[0]}</Title>
          <Card.Content style={styles.cardContent}>
              <Paragraph style={{fontSize:18,color:'#58d5c9',fontFamily:'Teko'}}>{String(this.state.flashArray[this.state.index][0][1])}</Paragraph>
             
          </Card.Content>
          
      </Card>
      </TouchableOpacity>  

      <AwesomeButton backgroundColor="#00CC99" width={Dimensions.get('window').width} onPress={()=>{this.deleteCard()}} ><Text>🗑️</Text></AwesomeButton>
      
      </View>  

            )
        }
        else{ //show onlt the term side
            return(

              
         <View style={{}}>    
          
          <Text style={{textAlign:'center',marginTop:30,color:'#00CC99'}}>{this.state.swipeMessage}</Text>
     
         <TouchableOpacity onPress={()=>{this.setState({side:!this.state.side})}}>      
            <Card style={styles.Card}> 

              
            <Title style={{alignSelf:'center',fontFamily:'Teko',marginTop:Dimensions.get('window').height/5,color:'#FF7F50'}} >{String(this.state.flashArray[this.state.index][0][0])}</Title>
            
        </Card>
        </TouchableOpacity> 
        <AwesomeButton backgroundColor="#00CC99" width={Dimensions.get('window').width} onPress={()=>{this.deleteCard()}} ><Text>🗑️</Text></AwesomeButton>
         
        </View>   
            )
        }
    }



    else{ //if there are no flashcards for the subjects
        if(this.state.length==0){
           return( <View><Text style={{fontFamily:this.state.font,fontSize:29,textAlign:'center',color:'#FF7F50',top:70}}>No Flashcards for this subject</Text></View>)
        }
        else{
        return(<View><Text style={{fontFamily:this.state.font,fontSize:29,textAlign:'center',color:'#FF7F50',top:70}}>Please select a subject</Text></View>)
        }
    }
    }



 
   /**========================================================================
 * *                                Swiping right (going to previous card)
 *   decrements index and refreses the state to the load the previous flashcard
 *   
 *   
 *
 *========================================================================**/

    onSwipeRight(){
        var index1= this.state.index-1

        this.state.currval=this.state.value //
        
        if (index1>=0){ //Makes sure that the index doesn't go to negative 
      
            this.state.index= index1;
        }
        this.setState({})
       
       
    }
       /**========================================================================
 * *                                Swiping right (going to card in front )
 *   Increments index and refreshes state to load card in front. 
 *   
 *   
 *
 *========================================================================**/
    
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

  componentDidMount=()=>{
    this.loadFlashCards()
  }

    render(){
      
      this.state.value = this.props.route.params.name;
    
      if (this.state.fontsLoaded==false){
        this.loadFonts()
      
      }
     
      
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 610,
            gestureIsClickThreshold:0.5
          };
      
        return(

        <View style={{marginTop:50}}>
             <View style={styles.addButton}>

              
           
          <AwesomeButton  onPress={()=>{this.props.navigation.navigate("AddFlash",{value:this.props.route.params.name})}} borderWidth={3} borderColor='#C39953' backgroundColor={'#00CC99'} width={(Dimensions.get('window').width)/2}>
            
            
            
            <Text style={{fontFamily:this.state.font,fontSize:20, color:'white'}}>Add Flashcards</Text>
          
          
          </AwesomeButton>
             
              </View>
           
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
        borderWidth:3,
        borderColor:'#60efbc',
        width:Dimensions.get('screen').width
        

    }
    , 
    cardContent:{
      alignItems:'center',
      marginTop:110

    },
    addButton:{
       
        marginTop:10,
        marginBottom:10,
        alignItems:'center'
    }
})