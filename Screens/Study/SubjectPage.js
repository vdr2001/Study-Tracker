import AsyncStorage from "@react-native-async-storage/async-storage";


import React from "react";
import { Alert} from "react-native";

import {
  StyleSheet,
  Text,
  View,
 ScrollView,Button
} from 'react-native';
import { Dimensions } from "react-native";

import { TouchableOpacity } from "react-native";
import * as Font from 'expo-font';



import DialogInput from "react-native-dialog-input";

import AwesomeButton from "react-native-really-awesome-button";
import { Card, Paragraph,Title } from "react-native-paper";

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class Subject extends React.Component{
    

    state={
        name:'',
        ButtonText:'Start Timer',
        startTime:0,
        startfull:'  -',
        taskList:[],
       taskList2:[],
       inputDialog:false,
        fontsLoaded:false,
        font:"normal",
        pauseBtnText:"Pause",
        pauseTime:0,
        totalPause:0,
        showPause:false,
        headerFont:"normal",
        width:Dimensions.get('screen').width,
         side:false,
        value:"Select Subject",
        flashArray:[],
        index:0,
        length:null,
        currval:'',
        subName:"",
        indexofArray:0
        
    }


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
        this.state.value="Select Subject"
        this.state.indexofArray=index
        this.setState({})
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
        <TouchableOpacity onPress={()=>{this.setState({side:!this.state.side})}}>     
          <Card  style={styles.Card}> 
          <Title style={{alignSelf:'center',fontFamily:'Teko',fontSize:25,marginTop:20,color:'#FF7F50'}}> {String(this.state.flashArray[this.state.index]).split(',')[0]}</Title>
          <Card.Content style={styles.cardContent}>
              <Paragraph style={{fontSize:18,color:'#58d5c9',fontFamily:'Teko'}}>{String(this.state.flashArray[this.state.index]).split(',')[1]}</Paragraph>
             
          </Card.Content>
          
      </Card>
      </TouchableOpacity>  

     
      
      </View>  

            )
        }
        else{ //show onlt the term side
            return(

              
         <View style={{}}>    
          
        
     
         <TouchableOpacity onPress={()=>{this.setState({side:!this.state.side})}}>      
            <Card style={styles.Card}> 

              
            <Title style={{alignSelf:'center',fontFamily:'Teko',marginTop:Dimensions.get('window').height/5,color:'#FF7F50'}} >{String(this.state.flashArray[this.state.index][0][0])}</Title>
            
        </Card>
        </TouchableOpacity> 
      
         
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
    
    dialogView=()=>{
        if (this.state.inputDialog==true){
                return(
        <DialogInput isDialogVisible={true}
                    title={"DialogInput 1"}
                    message={"Message for DialogInput #1"}
                
                    submitInput={ (inputText) => {
                       
                        
                        this.AddSubject(inputText)} }
                    closeDialog={ () => {this.setState({inputDialog:false})}}>
        </DialogInput>
                )
            }
            else{
                return(<View></View>)
            }
        }
        
   
/**========================================================================
 * *                                timeRecord()
 * Determines if the user is stopping or starting the timer
 *   if Start it records the start time 
 *   If stop it determines how long the study session was and gives user the option to save study session
 *   
 *
 *========================================================================**/
    timeRecord=()=>{
        var time = new Date()
       


        if (this.state.ButtonText=="Start Timer"){
            var hour=time.getHours()
            var abrev="am";

            if (hour>12){
                hour= hour-12
                abrev="pm"
            }

            var minutes = time.getMinutes()

            if (minutes<10){
                minutes= '0'+time.getMinutes()
            }
           
             this.setState({startTime:time.getTime(),ButtonText:"Stop Timer",startfull:String(hour+':'+ String(minutes)+ ' '+abrev),showPause:true})
             
             
            
        }
        else if (this.state.ButtonText=="Stop Timer"){
            
            this.setState()
          var  duration1=time.getTime()-(this.state.startTime)
        
         
            var seconds=duration1/1000
      
 
            var minutes= Math.floor(seconds/60)- this.state.totalPause

    
            if (minutes>3){
                Alert.alert('Save Session?','That was ' + String(minutes) + " minutes",[{text:'No'},{text:"Save Session",onPress:()=>{this.saveResult(minutes)}}])
            }

            else if (minutes>200){
                Alert.alert("Session too long","Sessions longer than 3 hours will not be accepted",)
            } 
            else{
                Alert.alert('Too Short','A session must be longer than 3 minutes',[{text:'Continue Session'},{text:"End Session",onPress:()=>{this.setState({showPause:false,pauseBtnText:'Pause',ButtonText:"Start Timer",startfull:'  - ',taskList:[],taskList2:[]})}}])
                
            }
            
        }



    
    }



    /**========================================================================
 * *                                saveResult()
 * Determines if the user is stopping or starting the timer
 *   Get studydata array
 * push the subject name, duration and the tasklist into the array
 * save the array 
 *========================================================================**/
   
    //Date format : year-month-day
    saveResult=async(dura)=>{
        var date= new Date() //get current date
      
  

    
        var array =JSON.parse(await AsyncStorage.getItem('studydata')); //get studydata array

        

        
    
        ///Get Subject name
        var name = String(this.state.name);

        var result = name.substring(0,name.length-1) //subject name

        
        //Push into array and async Storage
         array.push([result,JSON.stringify(date),dura,this.state.taskList2]);

         AsyncStorage.setItem('studydata',JSON.stringify(array));

     
         this.props.navigation.navigate('Subjects'); //Navigate back to study page

    }
    
    
   


 






 /**========================================================================
 * *                                addTask()
 * Pushes new task into the tasklist array and adds 'incomplete' status to it
 *========================================================================**/
    addTask=(newTask)=>{
       
        if (this.state.taskList.length==20){
            Alert.alert("Limit Reached","You can only add a maximum of 20 tasks")
        }
        else{
        if (newTask==null||newTask.length==0){
            Alert.alert("Blank","Task name cannot be blank")
        }

        else{
        var array = this.state.taskList;

        array.push([newTask,'Incomplete']) //push the task name and the status to array

        this.setState({taskList:array,taskList2:array,inputDialog:false}); 

        }
        
        }
        
    }

 /**========================================================================
 * *                               completeTask()
 * activated when the user clicks the tick next to the task
 * Makes copy of tasklist array, which will be used to mark the task as complete
 * The task will removed completely from the original tasklist array
 *========================================================================**/

    completeTask(index){
     
        var array = this.state.taskList;
        var array2= [...array] //make copy of original tasklist
        
       if ( array2[index][1]=="Complete"){
        array2[index][1]="Incomplete"
       }
       else{
        array2[index][1]="Complete"
       }
       
       
       //mark the task as complete for the secondary array 

       

        //remove the task from original tasklist array 
     
      
       
          
       
  
        


        this.setState({taskList:array,taskList2:array2})
    }




  /**========================================================================
 * *                               loadFonts()
 *========================================================================**/
  

        loadFonts=async()=>{
           
            await Font.loadAsync({
                Daniel:require('../../assets/fonts/Daniel.ttf'),
                Pacifico:require('../../assets/fonts/Pacifico-Regular.ttf'),
                Teko:require('../../assets/fonts/Teko-Regular.ttf'),
                Yellowtail: require('../../assets/fonts/Yellowtail-Regular.ttf')

            })
            
            this.setState({ fontsLoaded: true,font:"Teko",headerFont:"Yellowtail" });
        }
    

        pauseFunction=()=>{
            if (this.state.pauseBtnText=="Pause"){

                var date = new Date()
                this.setState({pauseTime:date.getTime(),pauseBtnText:"Resume"})



            }

            else if (this.state.pauseBtnText=="Resume"){

                
                var date1= new Date()

                var duration = date1.getTime()-this.state.pauseTime

                var seconds=duration/1000
                var minutes= Math.floor(seconds/60)


                this.setState({totalPause:this.state.totalPause+minutes,pauseBtnText:"Pause"})
              

            }
        }

 /**========================================================================
 * *                               Buttons
 *========================================================================**/
  


        element = (data, index) => {
            var title ="✅"
            return(
              <View style={styles.btn1}>
                    <Button title={title}  onPress={() => {this.completeTask(index)
                    } }></Button>
                  
                </View>
            )
           
            }
           



        pauseButton=()=>{
            if (this.state.showPause){
                return(
                    
  <TouchableOpacity onPress={this.pauseFunction} style={styles.pauseButton}>
                    <Text style={{color:'white',fontFamily:this.state.font,fontSize:22}} >{this.state.pauseBtnText}</Text>

                </TouchableOpacity>
                    
                )
            }

          else{
                    return(<View></View>)
                }
            
        }


        dialogView=()=>{
            if (this.state.inputDialog==true){
                    return(
            <DialogInput isDialogVisible={true}
                        title={"Enter a task"}
                       
                    
                        submitInput={ (inputText) => {
                           
                            
                            this.addTask(inputText)} }
                        closeDialog={ () => {this.setState({inputDialog:false})}}>
            </DialogInput>
                    )
                }
                else{
                    return(<View></View>)
                }
            }



            componentDidMount=()=>{
                this.loadFlashCards()
              }


    render(){


        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 610,
            gestureIsClickThreshold:0.5
          };
        if (this.state.fontsLoaded==false){ //check if the fonts are loaded, if not then load them 
            this.loadFonts()
        }


        this.state.name = this.props.route.params.name;
       
        
        var tasks= this.state.taskList;

    

         

        return(

     <ScrollView style={{marginTop:40}}>    

        <View style={{alignItems:'center',flex:1}}>

        <View style={[styles.taskContainer,{backgroundColor:'#fd5c63',height:150,flexDirection:'column'}]}>

                <Text style={{fontFamily:'Teko',fontSize:40, color:"white"}}>{this.state.name}</Text>
                 <Text style={[styles.task,{fontSize:25}]}>Start time : {this.state.startfull}</Text>
                 <Text style={[styles.task,{fontSize:25}]}>Paused Time: {this.state.totalPause} Mins</Text>
               
                   
                
            </View>

         
            
            <this.dialogView></this.dialogView>
           
            
       


            <View style={styles.timer}>
        
               
                
            </View>

            <View style={{}}>
            <TouchableOpacity  onPress={this.timeRecord} style={styles.startButton}>
                    <Text style={{color:'white',fontFamily:this.state.font,fontSize:22,textAlign:'center'}} >{this.state.ButtonText}</Text>

                </TouchableOpacity>
                


                

            
            
          
                
                </View>
                <this.pauseButton></this.pauseButton>


                <Text style={{

        fontSize:35,
        marginTop:40,
  
        color:"#fb5b5a",fontFamily:'Teko'}}>Your Tasks</Text>



<AwesomeButton onPress={()=>{this.setState({inputDialog:true})}} borderWidth={3} borderColor='#C39953' backgroundColor="#00CC99"  > 
                
                <Text style={{color: "#fff",
    fontFamily:this.state.font,
    fontSize:25
    }}>Add Task</Text>
                
                </AwesomeButton>

            

       
                
                    {tasks.map((val,index)=>

                    <View key={index} style={val[1]=="Incomplete"?[styles.taskContainer,{backgroundColor:"#00CC99"}]:[styles.taskContainer,{backgroundColor:'#fd5c63'}]}>
                 <Text style={styles.task}>{val[0]}</Text>
                <TouchableOpacity  onPress={() => this.completeTask(index)} key={index}>
                   <Text>✔️</Text>
                </TouchableOpacity>
            </View>
            
            )}
                
                <Text style={{

fontSize:35,
marginTop:40,

color:"#fb5b5a",fontFamily:'Teko'}}>Flashcards</Text>

                <GestureRecognizer  config={config} onSwipe={(direction,state)=>{this.onSwipe(direction,state)}}>
   
              <this.card></this.card>
              </GestureRecognizer>
           

            
           
        </View>



        </ScrollView>   
        
       
        )



}
}

const styles=StyleSheet.create({
    task:{ 
    color: '#fff', width: '90%',
    fontSize: 16
    },
    taskContainer:{
    
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
        marginTop:15
    },

    SubjectName:{
        fontSize:29,
        position:'relative',
        textAlign:'center',
        backgroundColor:'#55B4B0',
        fontWeight:"bold",
        color:'#F0EAD6'
    

    },
    SessionButton:{
        position:'absolute',
        top:400
    },
    text:{
        position:'relative',
        height:330,
        width:'100%'
    },
    singleHead: { width: '20%', height: 40, backgroundColor: '#c8e1ff' },
  

    timer:{

        position:'absolute',
        height:30,
        width:'100%',
        top:60,
        marginTop:20

    },
   
    btn1:{
        width:'100%'
    },
    singleHead: { width: 200, height: 40, backgroundColor: '#c8e1ff' }
    ,
    startButton:{
        width:60,
        position:'relative',
    
        backgroundColor:"#00CC99",
        borderRadius:50,
        borderWidth:3,
        borderColor:'#C39953',
        height:80,
        alignItems:"center",
        justifyContent:"center",
        marginTop:90
        
        
    },
    pauseButton:{
        width:60,
        position:'relative',
    
        backgroundColor:"#00CC99",
        borderRadius:50,
        borderWidth:3,
        borderColor:'#C39953',
        height:80,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
    },
    Card:{
        position:"relative",
        top:60,
        height:450,
        borderWidth:3,
        borderColor:'#60efbc',
        width:Dimensions.get('window').width,
        marginHorizontal:8
        

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
}
)
