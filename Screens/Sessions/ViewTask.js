import React from "react";
import { View,Text, Alert } from "react-native";
import { Card, Paragraph, TextInput } from "react-native-paper";
import { StyleSheet,Button,Picker } from "react-native";
import { Table,Row,Rows,Col,Cols,TableWrapper, Cell } from 'react-native-table-component';
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Font from 'expo-font';


export default class ViewTask extends React.Component{

    state={
        Rows_data:[[]],
        fontsLoaded:false,
        Family:'normal',
        fontHeader:"normal"
    }


    loadFonts=async()=>{
        await Font.loadAsync({
            Daniel:require('../../assets/fonts/Daniel.ttf'),
            Pacifico:require('../../assets/fonts/Pacifico-Regular.ttf'),
            Teko:require('../../assets/fonts/Teko-Regular.ttf'),
            Yellowtail: require('../../assets/fonts/Yellowtail-Regular.ttf')
        })
        
        this.setState({fontsLoaded:true,Family:'Teko',fontHeader:"Yellowtail"})
    }


    render(){
        if(this.state.fontsLoaded==false){
            this.loadFonts()
        }

        this.state.Rows_data= this.props.route.params.taskList
        return(
            <View style={{marginTop:70}}>
                <Text style={{color:'white',fontSize:35,textAlign:'center',fontFamily:this.state.fontHeader,color:'#FF7F50'}}>Your tasks</Text>
                <View style={{
                    backgroundColor:'#00CC99'
                }}>
                        <Table borderStyle={{backgroundColor:'#00CC99',padding:5}}   >

                    
                    
                   <Row data={["Task","Status"]} textStyle={{color:'white',fontSize:25,textAlign:'center',fontFamily:this.state.Family}}></Row>
                   
                <Rows style={styles.singleHead} data={this.state.Rows_data} textStyle={{color:'white',fontSize:25,textAlign:'center',fontFamily:this.state.Family}}></Rows>

</Table>
</View>
            </View>
        )
    }
}

const styles={
    singleHead:{
       
        backgroundColor:'#00CC99'
       
    
    }
}