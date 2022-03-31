import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#3743ab',
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height:200
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 83,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  loginContainer: {
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    height: 50,
    width: '98%',
    margin: 8,
    backgroundColor: 'white',
    // borderColor: 'gray',
    // borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
    height: '100%',
    justifyContent: 'space-between',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    height: '100%',
    backgroundColor: 'white',
  },
  pickercontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  picker: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgpicker: {
    flex: 1,
    width: '97%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

export default styles;