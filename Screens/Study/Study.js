import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

import { StyleSheet, Text, View,Button,Alert} from 'react-native';

import { Table,Row,Rows,Col,Cols,TableWrapper, Cell } from 'react-native-table-component';

import AwesomeButton from "react-native-really-awesome-button";

import * as Font from 'expo-font';


export default class Study extends React.Component{

    
   

    state={
        Rows:[],
      
        message:"",
        fontsLoaded:false,
        font:"normal"
       
    }


    onStudy=(index)=>{
        
        this.props.navigation.navigate('SubjectPage',{name:this.state.Rows[index][0]})

    }



    



    SubjectsSort=async()=>{



     var array = await AsyncStorage.getItem('subjects');
        
        if (array!=null){
        var newArr=[]
        
        var arr=JSON.parse(array)
        
        
        
     

        var i=0
        var j=true

        while (i>=0 && j==true ){

            if (typeof(arr[i])!='undefined'){
               
                newArr.push([arr[i],''])
            }
            else{
                j=false
            }
            
            i=i+1
            
            
        }
        
        if (newArr.length>0){
            this.setState({Rows:newArr})

        }


        
    }
        
        
        



    }
    loadFonts=async()=>{
        await Font.loadAsync({
            Daniel:require('../../assets/fonts/Daniel.ttf'),
            Pacifico:require('../../assets/fonts/Pacifico-Regular.ttf'),
            Teko:require('../../assets/fonts/Teko-Regular.ttf')
        })
        
     this.setState({fontsLoaded:true,font:'Teko'})
    }

  


    componentDidMount(){
      
        this.SubjectsSort()
       

    }
   





    render(){
        if (this.state.fontsLoaded==false){
            this.loadFonts()
        }
        if (this.state.Rows.length==0){
            this.state.message='Add subjects in the Subjects Page'
        }
        else{
            this.state.message=''
        }
      
      


        const button=(index)=>(
            <View style={{}}>
                <AwesomeButton height={50} width={90}  backgroundColor='#FF7F50' borderWidth={3} borderColor='#C39953'  onPress={()=>{this.onStudy(index)}}>


              
            <Text style={styles.text} >➡</Text>


                </AwesomeButton> 

          
            </View>
        )
   

        return(
            <View style={{marginTop:120}}>

                
        
                <Text style={{fontFamily:this.state.font,fontSize:35,color:'#FF7F50',textAlign:'center'}} >Select a Subject</Text>

                <Table borderStyle={{borderWidth:0.9,borderColor:'#C39953'}} style={{}}>
                    {this.state.Rows.map((value,index)=>

                    <TableWrapper key={index} style={styles2.row}>
                        {
                            value.map((value2,index2)=>
                                <Cell key={index2} data={index2==1?button(index):value2}  textStyle={index2==1?styles2.text:{textAlign:'center',color:'white',fontFamily:this.state.font,fontSize:25}} 
                                
                                style={{width:"77%",backgroundColor:"#00CC99"}}
                                > </Cell>

                            )
                        }

                    </TableWrapper>
                    
                    
                    
                    
                    
                    
                    
                    )
                    }


                </Table>

                <Text style={styles2.messagetable}> {this.state.message}</Text>

               
            </View>
        )

    }





}

const styles2 = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 55, backgroundColor: '#808B97'},
    text: { padding:50,color:'white'},
    row: { flexDirection: 'row',backgroundColor:'#c8e1ff' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    messagetable:{position:'relative',top:250,left:80},
    inputTable:{backgroundColor:"#00CC99"},
    index2:{textAlign:'center',color:'white',fontFamily:'Teko',fontSize:25}
  });
const styles={
    list:{

    }
}