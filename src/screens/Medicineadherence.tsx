import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {Divider} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import * as Progress from 'react-native-progress';
import {API_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Medicineadherence = ({navigation}) => {
  const [refresh, refeereshstate] = React.useState(false);
  const [sync, syncstate] = React.useState(false);
  const [totalpercent , totalpercentstate] = React.useState(0);

  const Reminder = ({item}) => {
     
    let currdate = new Date();
    let click  = currdate >= new Date(item.end_date)
    return (
      <>
        {item.status === 1 ? (
          <View style={{}}>
            <TouchableOpacity 
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
              onPress={() => {
                if(click){
                    Alert.alert("Reminder duration over","",[
                      {
                        text:"Ok",
                        onPress:()=>{

                        }
                      }
                    ])
                }else{
                  navigation.navigate('Today Performance', {
                    user_id: item.user_id,
                  });
                }
                
              }}>
              <View style={{flexDirection: 'column', margin: 10}}>
                <Text
                  style={{color: 'black', fontWeight: '600', marginBottom: 7}}>
                  {item.medicine_name}
                </Text>
                <Text style={{marginBottom: 3}}>{item.medicine_des}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text>{item.days}</Text>
                  <Text> | </Text>
                  <Text>{item.time}</Text>
                </View>
                <View style={{marginTop:15}}>
                  <Text>{'End Date : ' +new Date(item.end_date).toDateString()}</Text>
                </View>
              </View>
              <View style={{padding: 30}}>
                <TouchableOpacity onPress={() => {}}>
                  <ProgressCircle
                    percent={
                      (item.current_count / item.total_med_reminders) * 100
                    }
                    radius={26}
                    borderWidth={3}
                    color="#00bcd4"
                    shadowColor="#999"
                    bgColor="#ffff">
                    <Text style={{fontSize: 15, color: '#00bcd4'}}>
                      {Math.round(
                        (item.current_count / item.total_med_reminders) * 100,
                      ) + '%'}
                    </Text>
                  </ProgressCircle>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}

        <Divider style={{marginTop: 15}} />
      </>
    );
  };

  const db = SQLite.openDatabase(
    {
      name: 'MedRemdb',
      location: 'default',
    },
    () => {
      console.log('opened');
    },
    error => {
      console.log(error);
    },
  );

  const [reminderdata, reminderdatastate] = React.useState([]);
  async function fetchallreminders() {
    const reminder_array = [];
    return new Promise((resolve, rej) => {
      db.transaction(async function (txn) {
        await txn.executeSql(
          'CREATE TABLE IF NOT EXISTS User_medicines(user_id INTEGER PRIMARY KEY NOT NULL, medicine_name TEXT, medicine_des TEXT , title TEXT, time TEXT , days TEXT , start_date TEXT , end_date TEXT , status INTEGER , sync INTEGER)',
          [],
        );

        await txn.executeSql(
          'SELECT * FROM `User_medicines`',
          [],
          function (tx, res) {
            let tcurrenttaken = 0;
            let ttotaltaken = 0;

            for (let i = 0; i < res.rows.length; ++i) {
              // meds_array.push(res.rows.item(i));
              console.log(res.rows.item(i));
              tcurrenttaken+=res.rows.item(i).current_count;
              ttotaltaken+=res.rows.item(i).total_med_reminders;
              
              reminder_array.push(res.rows.item(i));
            }
            totalpercentstate(Math.round((tcurrenttaken/ttotaltaken)*100));

            reminderdatastate(reminder_array);
            resolve("");
          },
        );
      });
    });
  }

  async function fetchallremindersandsync() {
    await fetchallreminders();

    console.log('fetchd');
    syncstate(true);
    const filtered_array =  reminderdata
                            .filter(reminder_item => reminder_item.sync === 0)
                            .map(reminder_item => {
                              let obj = {
                                   
                                medicineName : reminder_item.medicine_name,
                                medicineDes  : reminder_item.medicine_des,
                                currentCount  : reminder_item.current_count,
                                totalMedReminders  : reminder_item.total_med_reminders,
                                title  : reminder_item.title,
                                startDate  : reminder_item.start_date,
                                status : reminder_item.status,
                                time:reminder_item.time,
                                days:reminder_item.days,
                                endDate : reminder_item.end_date,
                                userId : reminder_item.user_id

                                
                              }
                              return obj;
                            })

    console.log(filtered_array)
    let user_id = await AsyncStorage.getItem('user_id');
    let url : any = new URL(`${API_URL}/api/usermedicine/syncmedicines`);
    url.searchParams.append('userId', user_id);
    fetch(url,{
     method:'POST',
     body:JSON.stringify(filtered_array),
     headers: {
      "Content-type": "application/json"
  }
   }).then((response)=>{
     if(response.status === 200){
       syncstate(false)
     }else if(response.status === 500){
       syncstate(false)
     }
   }).catch(err=>{
     console.log(err)
     syncstate(false)
   })
  }

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      fetchallreminders();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <View
      style={{
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'white',
      }}>
      {sync ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
            backgroundColor: 'grey',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: '800', color: 'white'}}>Syncing Data</Text>
          <Progress.CircleSnail
            spinDuration={400}
            size={30}
            color={['white']}
          />
        </View>
      ) : (
        <></>
      )}

      <TouchableOpacity 
        onPress={() => {
          navigation.navigate('Adherence History');
        }}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <View style={{paddingTop: 15, paddingLeft: 15, marginLeft: 18}}>
              <ProgressCircle
                percent={totalpercent}
                radius={26}
                borderWidth={3}
                color="#00bcd4"
                shadowColor="#999"
                bgColor="#fff">
                <Text style={{fontSize: 15, color: '#4dd0e1'}}>{totalpercent+'%'}</Text>
              </ProgressCircle>
            </View>
            <View
              style={{
                flexDirection: 'column',
                paddingLeft: 30,
                paddingTop: 15,
              }}>
              <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
               Overall Performance Till Date
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
        <Text style={{fontWeight: '600'}}>Reminders</Text>
      </View>
      <FlatList
        data={reminderdata}
        renderItem={Reminder}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={fetchallremindersandsync}></RefreshControl>
        }></FlatList>
      {/* <Divider width={1} style={{marginTop: 15}} /> */}
      <View
        style={{right: 10, left: 10, position: 'absolute', bottom: 10}}></View>
    </View>
  );
};
export default Medicineadherence;
