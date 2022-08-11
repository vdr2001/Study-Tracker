import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
    Text,
    View} from 'react-native';
 
  import { Dimensions } from "react-native";

  import * as Font from 'expo-font';
  import { BarChart, LineChart,PieChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";

import AwesomeButton from "react-native-really-awesome-button";


export default class Progress extends React.Component{
    state={
        studyTimes:[],
        subjects:[],
        totals : [0],
        timePeriods:[0,0,0,0],
        value:"None",
        title:"",
        fontsLoaded:false,
        fontHeader:"normal"

    }

   
/**========================================================================
 * *                                loadData()
 * Determines if the user is stopping or starting the timer
 *   if Start it records the start time 
 *   If stop it determines how long the study session was and gives user the option to save study session
 *   
 *
 *========================================================================**/
  
    loaddata =(value)=>{

      if (value==7){
     
        this.sevenDays()
      
      }

      if (value==14){
        this.fourTeen()
    
      }
     
    }

    fourTeen=async()=>{

      var data = JSON.parse( await AsyncStorage.getItem("studydata"))
    
      var subjects = JSON.parse(await AsyncStorage.getItem('subjects'));
  
   

  
      this.state.studyTimes=data;

      this.state.subjects=subjects
      
      this.calculateData()

    }

    sevenDays=async()=>{
      
        var data = JSON.parse( await AsyncStorage.getItem("studydata"))
        
       

        for (let i=0 ; i<data.length; i++){

          var date = data[i][1];

          var currentDate = new Date();

          var difference = Math.abs(currentDate-date)
          var days1 = difference/(1000 * 3600 * 24)

          if (days1<=7){
             data.splice(i,1)
          }
        }
    
        var subjects = JSON.parse(await AsyncStorage.getItem('subjects'));
    
     

        
       
        this.state.studyTimes=data;

        this.state.subjects=subjects
      
        this.calculateData()
    }
 
    
       /**========================================================================
 * *                                calculateTimePeriods()
 * Time Slots:
 * 6 am to 11 am
 * 12 pm to 7 pm 
 * 7 pm to 12 am
 * 12 am to 5 am 
 *========================================================================**/
   
    calculateTimePeriods=async()=>{

     var sixToEleven = 0
     var twelveToSeven=0
     var sevenToTwelve= 0 
     var oneToFive=0
      var studyTimes =JSON.parse(await AsyncStorage.getItem("studydata"))
     
      for (let i=0; i<studyTimes.length;i++){

     

        var hours=new Date( JSON.parse( studyTimes[i][1])).getHours()

        //6 am to 11 am 
        if (hours>=6 && hours<=11){
          sixToEleven+=studyTimes[i][2]
      
        }
        //12 pm to 7 pm 
        if (hours>=12 && hours<=17){
          twelveToSeven+=studyTimes[i][2]
        }
        //7 pm to 12 am 
        if (hours>=17 && hours<=24){
          sevenToTwelve+=studyTimes[i][2]

        }

        //1 am to 5 am 
        if (hours>=1 && hours<=5){
          oneToFive+=studyTimes[i][2]
        }

      }


      this.setState({timePeriods:[sixToEleven,twelveToSeven,sevenToTwelve,oneToFive]})

    }
    
    
    calculateData=()=>{

   
      var studyTimes2 = this.state.studyTimes;
      var subjects2= this.state.subjects;
      var totals =[];

     
      for (let i=0; i<subjects2.length;i++){

         
        
          var sum =0;


          for (let j=0; j<studyTimes2.length;j++){

              if (subjects2[i][0]==studyTimes2[j][0]){
                 
                  sum=sum+studyTimes2[j][2]; //Add the duration of the specific study session to the sum of the entire subject
                  
              }
          }

          totals.push([sum]); //add the time for the subject into the array 
      

      }
     
    
   this.setState({totals:totals})
  }

  loadFonts=async()=>{

    this.calculateTimePeriods()
    await Font.loadAsync({
        Daniel:require('../assets/fonts/Daniel.ttf'),
        Pacifico:require('../assets/fonts/Pacifico-Regular.ttf'),
        Teko:require('../assets/fonts/Teko-Regular.ttf'),
        Yellowtail: require('../assets/fonts/Yellowtail-Regular.ttf')
    })
    this.setState({fontsLoaded:true,fontHeader:"Yellowtail"})
    
    
}

componentDidMount(){
  this.calculateTimePeriods()
}




    render(){
    
      if (this.state.fontsLoaded==true){
        
      
        return(
            <View style={{flex:4.8,paddingBottom:0}}>


              <View style={{justifyContent:'center',marginTop:30,flexDirection:'row'}}>

              <AwesomeButton onPress={()=>{this.loaddata(7)}} borderWidth={3} borderColor='#C39953' backgroundColor="#00CC99" style={{margin:20}} > 
                
                <Text style={{color: "#fff",fontSize:25,fontFamily:'Teko',textAlign:'center'}}>Data for Last 7 Days</Text>
                
                </AwesomeButton>


                <AwesomeButton onPress={()=>{this.loaddata(14)}} borderWidth={3} borderColor='#C39953' backgroundColor="#00CC99" style={{margin:20}} > 
                
                <Text style={{color: "#fff",fontSize:25,fontFamily:'Teko',textAlign:'center'}}>Data for Last 14 Days</Text>
                
                </AwesomeButton>

                </View>

              
               
               <Text style={{fontFamily:'Teko',fontSize:35,color:'#FF7F50',textAlign:'center'}}>{this.state.title}</Text>
      
               
                

      <ScrollView style={{}}>   
      <Text style={{fontFamily:'Teko',fontSize:35,color:'#FF7F50',textAlign:'center'}}>Total study times(minutes)</Text>
                <BarChart
  style={{
    marginVertical: 9,
    borderRadius: 2,
    paddingLeft:2,
    marginBottom:30
  }}
  data={{
    labels: this.state.subjects,
    datasets: [
      {
        data: this.state.totals
      }
    ]
  }}
  width={Dimensions.get('window').width}
  height={320}
  yAxisLabel=""
  yAxisSuffix=" Min"
  
  chartConfig={{
    backgroundColor: "#00CC99",
    backgroundGradientFrom: "#00CC99",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(14, 15, 15, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 20
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }}
  verticalLabelRotation={30}
/>


<LineChart
    data={{
      labels: this.state.subjects,
      datasets: [
        {
          data: this.state.totals
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={280}
  
    yAxisInterval={1} // optional, defaults to 1
    
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />

<Text style={{fontFamily:'Teko',fontSize:35,color:'#FF7F50',textAlign:'center',marginTop:110}}>Frequent study times(Minutes)</Text>
<PieChart

  data={ [
    {
      name: "6 am to 11 am",
      population: this.state.timePeriods[0],
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "12 pm to 7 pm",
      population: this.state.timePeriods[1],
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "7 pm to 12 am",
      population: this.state.timePeriods[2],
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "1 am to 5 am ",
      population: this.state.timePeriods[3],
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ]}
  width={Dimensions.get("window").width}
  height={260}
  chartConfig={{
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }}}
  accessor={"population"}
  backgroundColor={"transparent"}
  
  paddingLeft={"12"}

  
  center={[10, 20]}
  
  absolute
/>


</ScrollView>     

            </View>
        )
    }


    else{
      this.loadFonts()
      return(
        <View></View>
      )
    }

}
}
