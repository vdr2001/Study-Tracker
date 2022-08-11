import React from "react";
import { View,Text, Alert } from "react-native";


import { Table,TableWrapper, Cell } from 'react-native-table-component';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from 'expo-font';

import AwesomeButton from "react-native-really-awesome-button";
export default class PreviousSes extends React.Component{
    state={
        Rows_data:[[]],
        TaskList:[],
        fontsLoaded:false,
        Family:'normal'

    }


    loadTimes=async()=>{
    
        var times =JSON.parse( await  AsyncStorage.getItem('studydata'));
        var array =[];
        var tasks=[]

        for (let i=0; i<times.length;i++){
            var date = new Date(JSON.parse(times[i][1]))

            var fulldate= date.toLocaleDateString()
            let time= new Date(date.getTime()).toLocaleTimeString()
            array.push([times[i][0],fulldate,times[i][2]+" Minutes","Tasks"])
            tasks.push(times[i][3]);
        }

        this.setState({Rows_data:array,TaskList:tasks});
    }
    loadFonts=async()=>{
        await Font.loadAsync({
            Daniel:require('../../assets/fonts/Daniel.ttf'),
            Pacifico:require('../../assets/fonts/Pacifico-Regular.ttf'),
            Teko:require('../../assets/fonts/Teko-Regular.ttf')
        })
        
        this.setState({fontsLoaded:true,Family:'Teko'})
    }




   
    componentDidMount=()=>{
     
        this.loadTimes()
    }



    element = (index) => {

      
        if (this.state.TaskList[index]==0){
            return(<View><Text style={{fontFamily:this.state.Family,color:'white',fontSize:25}}>No Tasks</Text></View>)
        }
        else{
        return(
        <View style={styles.btn}>
           
          <AwesomeButton width={80} backgroundColor='#FF7F50' textColor="white" onPress={()=>{this.props.navigation.navigate("ViewTask",{taskList:this.state.TaskList[index]})}}>

            <Text style={{fontFamily:this.state.Family,color:'white',fontSize:20}}>View Tasks</Text>
          </AwesomeButton>
        </View>
        )
        }
   }

  

   returnData=()=>{

    return(
        <View>
                
        <Text style={{fontFamily:this.state.Family,fontSize:35,color:'#FF7F50',textAlign:'center',marginTop:40}} >Previous Sessions</Text>
          <Table borderStyle={{borderWidth:0.0,borderColor:'#C39953'}} style={{marginTop:60}}  >

            
            
           

{
this.state.Rows_data.map((val,index)=>

<TableWrapper style={{flexDirection:'row',backgroundColor:'#00CC99',padding:5}} key={index}>



    {
        val.map((cellData,cellIndex)=>

            <Cell key={cellIndex}  textStyle={{fontSize:25,fontFamily:this.state.Family,color:'#FFF5EE'}} data={cellIndex === 3? this.element(index) : cellData} />
        
        
        
        
        )



    }

</TableWrapper>






)

}


</Table>

    </View>
    )
   }

    render(){
        if (this.state.fontsLoaded==false){
            this.loadFonts()

        }
    
        
        return(
            <this.returnData></this.returnData>
        )
    
}
}


const styles={
    singleHead:{
        backgroundColor: '#c8e1ff'
    }
}