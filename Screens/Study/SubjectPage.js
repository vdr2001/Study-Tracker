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

import { Table,Row,TableWrapper, Cell } from 'react-native-table-component';

import { TextInput } from "react-native-gesture-handler";
import { FlatList } from "react-native-gesture-handler";

import DialogInput from "react-native-dialog-input";

import AwesomeButton from "react-native-really-awesome-button";

export default class Subject extends React.Component{
    

    state={
        name:'',
        ButtonText:'Start Timer',
        startTime:0,
        Duration:0,
        startfull:'  -',
        taskList:[],
       taskList2:[],
       inputDialog:false,
       taskText:'',
        checkbox:[],
        taskArray:["Enter Task "],
        fontsLoaded:false,
        font:"normal",
        pauseBtnText:"Pause",
        pauseTime:0,
        totalPause:0,
        showPause:false,
        headerFont:"normal",
        width:Dimensions.get('screen').width
        
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
      
 
            var minutes= Math.floor(seconds/60)

    
            if (minutes>3){
                Alert.alert('Save Session?','That was ' + String(minutes) + " minutes",[{text:'No'},{text:"Save Session",onPress:()=>{this.saveResult(minutes)}}])
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

     
         this.props.navigation.navigate('Study'); //Navigate back to study page

    }
    
    
   


    addToCheckbox=()=>{
         this.state.checkbox.push(true);

        
    }





    changeCheckbox=(index)=>{
         Alert.alert(String(index))
        
        var value  = Boolean(this.state.checkbox[index]);
       this.state.checkbox[index]=!value
       

        
        
       
    }




 /**========================================================================
 * *                                addTask()
 * Pushes new task into the tasklist array and adds 'incomplete' status to it
 *========================================================================**/
    addTask=(newTask)=>{
       

        var array = this.state.taskList;

        array.push([newTask,'Incomplete']) //push the task name and the status to array

        this.setState({taskList:array,taskList2:array,inputDialog:false}); 

     
        
    
        
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
            var title ="✓"
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






    render(){



        if (this.state.fontsLoaded==false){ //check if the fonts are loaded, if not then load them 
            this.loadFonts()
        }


        this.state.name = this.props.route.params.name;
       
        
        var tasks= this.state.taskList;

    

         

        return(

     <ScrollView>    
        <View style={{alignItems:'center',flex:1}}>
         
            
            <this.dialogView></this.dialogView>
           
            
            <Text style={{
        fontSize:60,
       
        color:"#fb5b5a",fontFamily:'Teko'}}>{this.state.name}</Text>


           


            <View style={styles.timer}>
          
            <Table borderStyle={{}} style={{}}>
                    
                    <Row data={[["Start Time:"],[this.state.startfull]]} textStyle={{fontSize:30,fontFamily:this.state.font,color:'#FF7F50'}}></Row>

                    
                    
                </Table>
               
                
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
                   <Text>🗑️</Text>
                </TouchableOpacity>
            </View>
            
            )}
                
          
            
           

            
           
        </View>
        </ScrollView>   
        )



}
}

const styles=StyleSheet.create({
    task:{ color: '#fff',
    width: '90%',
    fontSize: 16},
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
    logo:{
        fontWeight:"bold",
        fontSize:50,
        left:'35%',
        color:"#fb5b5a"
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
    singleHead: { width: 200, height: 40, backgroundColor: '#c8e1ff' },
    taskText:{
        width:500
    },
    startButton:{
        width:"20%",
        position:'relative',
    
        backgroundColor:"#00CC99",
        borderRadius:170,
        borderWidth:3,
        borderColor:'#C39953',
        height:80,
        alignItems:"center",
        justifyContent:"center",
        marginTop:90
        
        
    },
    pauseButton:{
        width:"20%",
        position:'relative',
    
        backgroundColor:"#00CC99",
        borderRadius:170,
        borderWidth:3,
        borderColor:'#C39953',
        height:80,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
    }
}
)
