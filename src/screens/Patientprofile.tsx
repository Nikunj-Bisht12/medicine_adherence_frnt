import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBell,
  faCaretDown,
  faKitMedical,
  
} from '@fortawesome/free-solid-svg-icons';
import {List} from 'react-native-paper';
import {API_URL} from '@env';
import * as Progress from 'react-native-progress';
import {IconProp} from '@fortawesome/fontawesome-svg-core';


const ViewProfile = ({route}) => {
  
  const {user_id} = route.params;
  const [userdetails , userdetailsstate] = React.useState<any>();
  const [progress , progress_status] = React.useState(true);

  const sendnotificationtouser = async (fcm_token) => {
    let url : any = new URL(`${API_URL}/api/caretaker/notifyuser`);
    url.searchParams.append('fcm_token', fcm_token);
   
      await fetch(url)
      .then(resp=>console.log(resp))

  }

  React.useEffect(()=>{

    async function getuserdetails(){
     // const user_id = await AsyncStorage.getItem('user_id');

    await  fetch(`${API_URL}/api/user/getuser/`+user_id)
      .then(resp=>resp.json())
      .then(res=>{
        console.log(res);
        console.log(res.userEntityList[0].userDetails);
        userdetailsstate(res)
        progress_status(false)
      });
    }
    getuserdetails();
   

  },[])



  return (
    <View style={{height:'100%',backgroundColor:'white'}}>
   {
progress ? 
<View style={{height:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>

<Progress.Circle size={80} indeterminate={true} />
<Text>Fetching User Details</Text>
</View>
 : 
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.top}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{paddingLeft: 5, paddingTop: 9}}>Name</Text>
            <Text style={{color: 'black', padding: 5, fontSize: 17}}>
              {userdetails.userEntityList[0].user_name}
            </Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Image
              style={styles.icon}
              source={{
                uri: userdetails.userEntityList[0].userDetails.pic_path,
              }}
            />
          </View>
          
        </View>
        <View
  style={{
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
  }}
/>
        <View style={styles.items}>
          <Text style={styles.itemleft}>Bio</Text>

          <Text style={styles.itemright}>{userdetails.userEntityList[0].userDetails.bio}</Text>
        </View>
        <View
  style={{
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  }}
/>
        <View style={styles.items}>
          <Text style={styles.itemleft}>Contact Number</Text>

          <Text style={styles.itemright}>{userdetails.userEntityList[0].userDetails.usercontact}</Text>

        </View>
        <View
  style={{
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
  }}
/>
        <View style={styles.items}>
          <Text style={styles.itemleft}>Email Id</Text>
          <Text style={styles.itemright}>{userdetails.userEntityList[0].email}</Text>
        </View>
        <View
  style={{
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  }}
/>
        <View style={styles.items}>
          <Text style={styles.itemleft}>Gender</Text>

          <Text style={styles.itemright}>{userdetails.userEntityList[0].userDetails.gender}</Text>
        </View>
        <View
  style={{
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  }}
/>
        <View style={styles.items}>
          <Text style={styles.itemleft}>Blood Group</Text>

          <Text style={styles.itemright}>{userdetails.userEntityList[0].userDetails.blood_group}</Text>
        </View>
        <View
  style={{
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  }}
/>
        <View style={styles.items}>
          <Text style={styles.itemleft}>Marital Status</Text>
          <Text style={styles.itemright}>{userdetails.userEntityList[0].userDetails.martial_status}</Text>
        </View>
        <View
  style={{
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  }}
/>
        <View style={styles.items}>
          <Text style={styles.itemleft}>Weight(in Kg)</Text>
          <Text style={styles.itemright}>{userdetails.userEntityList[0].userDetails.weight}</Text>
        </View>
        <View style={{}}>
          <View>
            <List.Section style={{backgroundColor: 'white'}}>
              <List.Accordion
                title="Medicines"
                titleStyle={{
                  //   marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '500',
                }}
                left={props => (
                  <FontAwesomeIcon
                    size={16}
                    icon={faKitMedical as IconProp}
                    color="black"
                    style={{marginLeft: 8}}
                  />
                )} 
                right={props=>(
                  <FontAwesomeIcon icon={faCaretDown as IconProp}></FontAwesomeIcon>
                )}>
                <List.Item style={{padding:25}} titleStyle={styles.listitem}s right={()=>(<FontAwesomeIcon size={25} icon={faBell} color='#fdd835'></FontAwesomeIcon>)}
                onPress={()=>sendnotificationtouser(userdetails.userEntityList[0].userDetails.fcm_token)} title="Brufen 400mg" />
               
              </List.Accordion>
            </List.Section>
          </View>
        </View>
      </ScrollView>
    </View>

   }
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100%',
  },
  icon: {
    height: 90,
    width: 90,
    borderRadius: 45,
    borderColor: 'white',
    borderWidth: 2,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: 110,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom:12
    
    
  },
  itemleft: {},
  itemright: {
    color: 'black',
    width:200
  },
  listitem: {
    fontSize: 14,
  
  },
});

export default ViewProfile;