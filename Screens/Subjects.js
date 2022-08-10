import AsyncStorage from '@react-native-async-storage/async-storage';

import React from 'react';

import { Dimensions, TextInput } from 'react-native';

import { Alert } from 'react-native';

import {StyleSheet,View,ScrollView} from 'react-native';

import DialogInput from 'react-native-dialog-input';

import { Text } from 'react-native-elements';

import AwesomeButton from 'react-native-really-awesome-button';

import * as Font from 'expo-font';

import { Table,TableWrapper, Cell } from 'react-native-table-component';




class Subjects extends React.Component{

    constructor(props){
        super(props);
        
       

    }

    
    

    
    state={
        Rows_data: [],
        visible:true,
        
        message:[],
        fontsLoaded: false,
        font:"normal",
        width:Dimensions.get('window').width,
        inputDialog:false
    }


  

/**========================================================================
 **                           Load Subject Data
 *?  Gets the subjects array and loads into the state
 *========================================================================**/


    LoadData=async()=>{

      
        var array= await AsyncStorage.getItem(
            'subjects'
        )

        
      if (array!=null){
             this.setState({Rows_data:eval(array)});
            
        }


    }

    //********************************************************************* */

 


    /**========================================================================
     **                           Add Subject
     *?  Checks if the input is already in subject list
     *? 
     
     *========================================================================**/

    AddSubject=(subjectAdd)=>{


       //Removes add new subjects here message


        var Exists=false;


//*  Checking if the input subject is already in array  

        for (var i = 0;i<this.state.Rows_data.length;i++){

            var row = String(this.state.Rows_data[i][0]);

            
            
            

            if ((row.toUpperCase())==subjectAdd.toUpperCase()){
                Exists=true;
            }

        }

//* Checking that its not empty and does not include comma's and speech marks  
        if (subjectAdd.length==0||subjectAdd.includes('"')||Exists==true){

            if (subjectAdd.length==0){
                Alert.alert(
                    "Empty Name",
                    "Subject Name cannot be Blank",
                    [
                      
                      { text: "OK"}
                    ]
                  );
              
            }

            if (subjectAdd.includes('"')){
                Alert.alert(
                    "Quotation Marks",
                    "Subject Name cannot have quotation Marks",
                    [
                      
                      { text: "OK"}
                    ]
                  );
            }

            if(Exists==true){
                Alert.alert(
                    "Already Exists",
                    "Subject already exists",
                    [
                      
                      { text: "OK"}
                    ]
                  );

            }
          


        }

        //* If no errors , add subject into array and activate saveData function 

        else{
            var newarr=this.state.Rows_data
            newarr.push([subjectAdd,''])
           
            this.SaveData();
          
            this.setState({Rows_data:newarr,message:'',inputDialog:false})
            
            
          
           
        }
        

    }

    //********************************************************************************* */




  /**========================================================================
   **                           Save Data (activated from AddSubject)
   *?  Saves/updates subject list
   *? Adds Flashcard array for new subject
   *========================================================================**/  
    SaveData=async()=>{
      
        
       var flashcards=JSON.parse( await AsyncStorage.getItem('flashcards'));
          
   

        var data= this.state.Rows_data
        var newArr1=[];


        for (var i=0;i<this.state.Rows_data.length;i++){
            newArr1.push([data[i][0],[]]);
        }
      
        AsyncStorage.setItem('subjects',JSON.stringify(newArr1)
       );


       for (var j =0 ;j<this.state.Rows_data.length;j++){


            var exists=false;

        


            for (var k=0; k<flashcards.length;k++){
                if (flashcards[k][0]==this.state.Rows_data[j][0]){
                    exists=true;
                }
            }

            if (exists==false){
                
                flashcards.push([this.state.Rows_data[j][0],[]]);
                AsyncStorage.setItem("flashcards",JSON.stringify(flashcards))
            }
       }

    

      
    }

   //********************************************************************************* */

    
   




  


//************************************************************************************************************************** */

   

/**========================================================================
 **                           Remove Subject
 *?  Removes specific subject from list and then updates the asyncstorage
 *? Removes flashcards for that subject
 
 *========================================================================**/

    //Removing Subjects 
    Remove_Subject=async(index)=> {

        
       
     var currentarr= this.state.Rows_data //* Current subject array


     var flashcards=JSON.parse( await AsyncStorage.getItem('flashcards'));

     var studydata= JSON.parse(await AsyncStorage.getItem('studydata'))


 
/*========================================================================*/
//* Check if the flashcard subject is the deleting subject
//* Delete it from flashcard array then save into async  

for(let j=0 ;j<studydata.length;j++){

    if (studydata[j][0]==currentarr[index][0]){
        studydata.splice(j,1);
        
    }
}



     for (var i =0 ;i <flashcards.length; i++){


         if (flashcards[i][0]==currentarr[index][0]){

            flashcards.splice(i,1);
             
         }
     }

     AsyncStorage.setItem('flashcards',JSON.stringify(flashcards))
/*========================================================================*/




        currentarr.splice(index,1)
  
      

        
    
          
        AsyncStorage.setItem(
            'subjects',JSON.stringify(currentarr)
        )

      

            AsyncStorage.setItem('studydata',JSON.stringify(studydata))


        this.setState({Rows_data:currentarr});
    
   }
     








    RemoveAlert=(index)=>{

        Alert.alert("Remove Subject","Are you sure you want to remove this subject, all its history will be erased",[{text:'No'},{text:'Yes', onPress:()=>{this.Remove_Subject(index)}}]);

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
      
        this.LoadData();
        
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

//Adding Subject to List
  


   

//********************************************************************************************************** */


   

  
    render(){
      
   

        if (this.state.Rows_data.length==0){
            this.state.message=[
                'Enter New Subject Above'
            ]
        }

        else{
            this.state.message=''
        }

        
       
        const state= this.state
        const element = (data, index) => (

           
              <View>
                  <AwesomeButton height={50} width={0.25*(this.state.width)} backgroundColor={'#FF7F50'} onPress={()=>{this.RemoveAlert(index)}} style={{display:'flex'}}><Text>X</Text></AwesomeButton>
                
              </View>
           
          );

  
        if (this.state.fontsLoaded==false){
            this.loadFonts()
        }
        
         
        
        return(
            
            
            <View >
            

            <this.dialogView></this.dialogView>

                <Table style={styles.messagetable}>

                

                </Table>

               
             


               
            <View style={{alignItems:'center'}}>   
                <AwesomeButton onPress={()=>{this.setState({inputDialog:true})}} borderWidth={3} borderColor='#C39953' backgroundColor="#00CC99" style={styles.buttonContainer} > 
                
                <Text style={{color: "#fff",
    fontFamily:this.state.font,
    fontSize:25
    }}>Add Subject</Text>
                
                </AwesomeButton>
                
                </View>  



               <ScrollView style={{marginTop:30}}>

                   

                
                <Table borderStyle={{borderWidth:0.9,borderColor:'#C39953'}}   >

                    
                    
                   
                   
                    {
                        state.Rows_data.map((val,index)=>

                            <TableWrapper style={{flexDirection:'row'}} key={index}>



                                {
                                    val.map((cellData,cellIndex)=>

                                        <Cell key={cellIndex} style={{width:'75%',backgroundColor:"#00CC99"}} data={cellIndex === 1? element(cellData, index) : cellData} textStyle={{textAlign:'center',color:'#FFF5EE',fontFamily:this.state.font,fontSize:25}}/>
                                    
                                    
                                    
                                    
                                    )



                                }

                            </TableWrapper>
                        
                        
                        
                        
                        
                        
                        )
                        
                    }


                </Table>
                </ScrollView>
                
            </View>
        )
    
}
}




const styles=StyleSheet.create({
  
  
    SingleRow:{
        borderRadius:10,
        marginBottom:12


    },

    TextInput:{
        backgroundColor:'#00e699',
        borderWidth:3,
        borderColor:'#C39953',
        textAlign:'center',
        marginBottom:30,
        marginTop:30,
        height:40,
        color:'white'
        
        

    },
    buttonContainer:{
        position:'relative',
        marginTop:30,
        
        marginBottom:30
        
    },
 

    
})


export default Subjects