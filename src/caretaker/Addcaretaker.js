import { FlatList, RefreshControl, View,TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Avatar, Button, ListItem, SearchBar, SpeedDial } from "react-native-elements";
import Dialog from "react-native-dialog";
import { useFocusEffect } from "@react-navigation/native";
import {API_URL} from '@env'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Card} from 'react-native-paper';

const Addcaretaker = ({navigation}) => {


    const [caretakers, caretakerstate] = React.useState([]);
    const [addcaretaker, addcaretakerstate] = React.useState(false);
    const [url, urlstate] = React.useState('');
    const [refresh , refeereshstate] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const fetchcaretakers = async () =>  {
            const user_id = await AsyncStorage.getItem('user_id');
            fetch(`${API_URL}/api/caretaker/myCareTakers(Patient)?patient_id=${user_id}`)
                .then(resp => resp.json())
                .then(res => caretakerstate(res))
            
    }

    useEffect(()=>{
        
        fetchcaretakers()
    }
    ,[])

   const sendreqtouser = () => {

    

   }

    const renderitem = ({ item }) => {

        return (

            <Card  onPress={() => {navigation.navigate('Patientprofile')}} 
            style={{ borderRadius:30,
            margin:6,
            borderColor:'lightgrey',
            elevation:5,
            shadowColor:'#3743ab'}}>
         <View style={{flexDirection:'row',padding:0}}>
         <ListItem style={{ flexDirection: 'row',
                             justifyContent: 'space-between',
                             alignItems: 'center' 
                             ,padding:5}}>
          <Avatar 
             size={64}
             rounded source={
             {uri:'https://lh3.googleusercontent.com/a-/AOh14Gg1r55ukyjleOVcBDEuTUt283ClmJE4ZSeFOSmD=s96-c'}}>

             </Avatar>
             <ListItem.Content>

                 <ListItem.Title style={{fontSize:22,marginLeft:3,fontWeight:'bold'}}
                 >{item.caretaker_username + ' Kumar Soni'}
                 </ListItem.Title>
                 <ListItem.Subtitle>{' Created At :' + item.created_at}</ListItem.Subtitle>

             </ListItem.Content>

             <TouchableOpacity onPress={() => {}} 
             style={{paddingVertical: 15,}}>
                 <View style={{ alignItems: 'center'}}>
                     <FontAwesomeIcon icon={faAngleRight} color={'black'} size={25} />

                 </View>
             </TouchableOpacity>
         </ListItem>
         </View>
     </Card>

            // <ListItem style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            //     <ListItem.Content>
            //        <Avatar rounded size={50} source={{uri:'https://i.stack.imgur.com/l60Hf.png'}}></Avatar>
            //         <ListItem.Title style={{fontSize:18}}>{item.caretaker_username}</ListItem.Title>
            //         <ListItem.Subtitle>{item.created_at}</ListItem.Subtitle>
            //     </ListItem.Content>
            //     <Button title="Delete"></Button>
                
            // </ListItem>
        )

    }

   
   

    return (
        <View style={{ flex: 1 ,backgroundColor:'white',height:'100%'}}>
           
            <FlatList data={caretakers} renderItem={renderitem} refreshControl={

<RefreshControl refreshing={refresh} onRefresh={fetchcaretakers}></RefreshControl>

            }></FlatList>
            <View style={{bottom:0,alignItems:'center'}}>
            <SpeedDial
                    isOpen={open}
                    style={{backgroundColor:'white'}}
                    overlayColor='white'
                    buttonStyle={{backgroundColor:'#3743ab'}}
                    icon={{ name: 'edit', color: 'white' }}

                    openIcon={{ name: 'close', color: 'white' }}
                    onOpen={() => setOpen(!open)}
                    onClose={() => setOpen(!open)}
  >
    <SpeedDial.Action
      icon={{ name: 'add', color: 'white' }}
      title="Add Caretaker"
      style={{height:50,}}
      buttonStyle={{backgroundColor:'#3743ab'}}

      onPress={() => navigation.navigate('Searchcaretaker')}
    />
    <SpeedDial.Action
      icon={{ name: 'delete', color: 'white' }}
      title="Delete"
      buttonStyle={{backgroundColor:'#3743ab'}}

      style={{height:50}}

      onPress={() => console.log('Delete Something')}
    />
  </SpeedDial>
            <Button buttonStyle={{backgroundColor:'white'}} title="A"
            ></Button>
                </View>
        </View>
    )


}

export default Addcaretaker;