import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
    Text,
    View,
    Picker
    
  } from 'react-native';
 
  import { Dimensions } from "react-native";

  import * as Font from 'expo-font';
  import { BarChart, LineChart,PieChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";


export default class Progress extends React.Component{
    state={
        studyTimes:[],
        subjects:[],
        totals : [0],
        value:"None",
        itemsDrop: [
          {label: "7 Days", value: 'Seven'},
          {label: '14 Days ', value: 'Fourteen'}
        ],
        count:0,
        title:"",
        fontsLoaded:false,
        fontHeader:"normal"

    }


  
    Loaddata =()=>{

      if (this.state.value=="Seven"){
     
        this.sevenDays()
      
      }

      if (this.state.value=="Fourteen"){
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
 
    calculateData=()=>{

  
      var studyTimes2 = this.state.studyTimes;
      var subjects2= this.state.subjects;
      var totals =[];

     
      for (let i=0; i<subjects2.length;i++){

         
        
          var sum =0;


          for (let j=0; j<studyTimes2.length;j++){

              if (subjects2[i][0]==studyTimes2[j][0]){
                 
                  sum=sum+studyTimes2[j][2];
                  
              }
          }

          totals.push([sum]);
      

      }
     
     

    this.state.totals= totals
      
   this.setState({})
  }

  loadFonts=async()=>{
    await Font.loadAsync({
        Daniel:require('../assets/fonts/Daniel.ttf'),
        Pacifico:require('../assets/fonts/Pacifico-Regular.ttf'),
        Teko:require('../assets/fonts/Teko-Regular.ttf'),
        Yellowtail: require('../assets/fonts/Yellowtail-Regular.ttf')
    })
    this.setState({fontsLoaded:true,fontHeader:"Yellowtail"})
    
    
}

    render(){

      if (this.state.fontsLoaded==true){


        this.Loaddata()
        if (this.state.value=="Seven"){
         this.state.title="Data for the last 7 days"
         this.state.value="None"
         this.sevenDays()
         }

      if (this.state.value=="Fourteen"){
        this.state.title="Data for the last 14 days"
        this.state.value="None"
        this.fourTeen()
      }
     
      
        return(
            <View style={{flex:4.8,paddingBottom:0}}>
               
               <Text style={{fontFamily:this.state.fontHeader,fontSize:35,color:'#FF7F50',textAlign:'center'}}>{this.state.title}</Text>
        <Picker 
                
                style={{fontSize:20,marginBottom:40}}
                onValueChange={(itemvalue,itempos)=>{this.setState({value:itemvalue})
                
              }}
                selectedValue={this.state.value}
                
               >
                 <Picker.Item label="Select TimeFrame" value="None"></Picker.Item>
                <Picker.Item label="Last 14 Days" value="Fourteen"></Picker.Item>
                <Picker.Item label="Last 7 Days" value="Seven"></Picker.Item>

                
               </Picker>
               
                

      <ScrollView style={{}}>   
      <Text style={{fontFamily:'Teko',fontSize:35,color:'#FF7F50',textAlign:'center'}}>Total study times(minutes)</Text>
                <BarChart
  style={{
    marginVertical: 9,
    borderRadius: 2,
    paddingLeft:2
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

<Text style={{fontFamily:'Teko',fontSize:35,color:'#FF7F50',textAlign:'center',marginTop:110}}>Frequent study times</Text>
<PieChart
  data={ [
    {
      name: "Seoul",
      population: 68500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ]}
  width={Dimensions.get("window").width}
  height={220}
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
  
  center={[10, 50]}
  
  absolute
/>

<Text style={{position:'relative',top:90}}></Text>

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
