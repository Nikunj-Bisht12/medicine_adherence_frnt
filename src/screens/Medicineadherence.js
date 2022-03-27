import * as React from 'react';
import {View, Text, Button, Alert, TouchableOpacity, FlatList, RefreshControl} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {Divider} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { useFocusEffect } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';



const Medicineadherence = ({navigation}) => {
  const [refresh , refeereshstate] = React.useState(false);

  const Reminder = ({item}) => {

   async function fetchadherence(){
      
     
   }

    return (
      <>
      {
        item.status === 1 ?  <View style={{}}>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={()=>{navigation.navigate("Todayperformance",{
                user_id:item.user_id
              })}}>
          <View style={{flexDirection: 'column', margin: 10}}>
            <Text style={{color: 'black', fontWeight: '600',marginBottom:7}}>
              {item.medicine_name}
            </Text>
            <Text style={{marginBottom:7}}>{item.medicine_des}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{item.days}</Text>
              <Text> | </Text>
              <Text>{item.time}</Text>
            </View>
          </View>
          <View style={{padding: 30}}>
            <TouchableOpacity
              onPress={() => {}}>
        <ProgressCircle
                  percent={(item.current_count/item.total_med_reminders)*100}
                  radius={26}
                  borderWidth={3}
                  color="#4dd0e1"
                  shadowColor="#999"
                  bgColor="#fff">
                  <Text style={{fontSize: 15, color: '#4dd0e1'}}>{Math.round((item.current_count/item.total_med_reminders)*100) + '%'}</Text>
                </ProgressCircle>
            </TouchableOpacity>
          </View>
          </TouchableOpacity>
        </View> : <></>
      }
        
        <Divider style={{marginTop: 15}} />
      </>
    );
  };
  

  const db = SQLite.openDatabase({
    name:'MedRemdb',
    location:'default'
  },()=>{
    console.log('opened')
  },error=>{
    console.log(error)
  })

  const [reminderdata , reminderdatastate] = React.useState([]);
  async function fetchallreminders(){
    const reminder_array = [];
  await  db.transaction(async function (txn) {
      txn.executeSql('CREATE TABLE IF NOT EXISTS User_medicines(user_id INTEGER PRIMARY KEY NOT NULL, medicine_name TEXT, medicine_des TEXT , title TEXT, time TEXT , days TEXT , start_date TEXT , end_date TEXT , status INTEGER , sync INTEGER)', []);

      txn.executeSql('SELECT * FROM `User_medicines`', [], function (tx, res) {
        for (let i = 0; i < res.rows.length; ++i) {
         // meds_array.push(res.rows.item(i));
         console.log(res.rows.item(i))
         reminder_array.push(res.rows.item(i));
        }
        reminderdatastate(reminder_array);
      });
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      
      fetchallreminders()
  
      return () => {
        isActive = false;
      };
    },[])
  );


  return (
    <View
      style={{
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <TouchableOpacity onPress={()=>{navigation.navigate('adherencehistory')}}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <View style={{paddingTop: 15, paddingLeft: 15, marginLeft: 18}}>
              <ProgressCircle
                percent={0}
                radius={26}
                borderWidth={3}
                color="#4dd0e1"
                shadowColor="#999"
                bgColor="#fff">
                <Text style={{fontSize: 15, color: '#4dd0e1'}}>{'0%'}</Text>
              </ProgressCircle>
            </View>
            <View
              style={{
                flexDirection: 'column',
                paddingLeft: 30,
                paddingTop: 15,
              }}>
              <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
                Performance for past 7 days
              </Text>
              <Text>You have some active reminders.</Text>
            </View>
          </View>
          <View style={{alignItems: 'center', paddingBottom: 10}}>
            <Text style={{color: '#4dd0e1', fontWeight: '700'}}>
              CHECK PERFORMANCE
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          padding: 12,
          backgroundColor: 'lightgrey',
          marginBottom: 5,
        }}>
        <Text style={{fontWeight: '600'}}>Current</Text>
      </View>
      <FlatList data={reminderdata} renderItem={Reminder} refreshControl={

<RefreshControl refreshing={refresh} onRefresh={fetchallreminders}></RefreshControl>

            }
      ></FlatList>
      {/* <Divider width={1} style={{marginTop: 15}} /> */}
      <View style={{right: 10, left: 10, position: 'absolute', bottom: 10}}>
     
      </View>
    </View>
  );
};
export default Medicineadherence;